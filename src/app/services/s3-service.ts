import {Injectable} from 'angular2/core';
import {BehaviorSubject} from 'rxjs/Rx';

import {BackendService} from '../services/backend-service';

export const Status = {
    STARTED: 'started',
    PROCESSING: 'processing',
    COMPLETED: 'completed',
    CANCELED: 'canceled',
    NONE: undefined
};

const ACTION_SUCCESS_STATUS = 200;
const MAX_FILE_SIZE = 50*1024*1024;
const INITIAL_PERCENTAGE = 10;

export class UploadEvent {
    constructor(public status: string, public percentage: number) {
    }
}

class S3Info {
    bucket: string = '';
    folder: string = '';
    accessKey: string;
    endpoint: string;
    signUrl: string;
   
    constructor(accessKey?: string, bucket?: string, signUrl?:string) {
        bucket = (bucket == undefined) ? '' : bucket;
        if (bucket.indexOf('/') >= 0) {
            let bucketInfo = bucket.split('/');
            bucket = bucketInfo[0]
            if (bucketInfo.length > 1) {
                this.folder = bucketInfo[1];        
            }
        }
        this.accessKey = accessKey;
        this.bucket = bucket;
        this.endpoint = 'https://' + bucket + '.s3.amazonaws.com';
        this.signUrl = signUrl;
    }
}

export class Uploader {
    constructor(public publisher: BehaviorSubject<UploadEvent>, public xhr: XMLHttpRequest, 
        public fileName: string, public fileUrl, public status = 'initialized') {
        xhr.onreadystatechange = () => {
            if (xhr.readyState == 4) {
                if (xhr.status == ACTION_SUCCESS_STATUS) {
                    this.status = 'completed';
                    publisher.next(new UploadEvent(Status.COMPLETED, 100));
                    publisher.complete();
                } else if (this.status != 'canceled') {
                    this.status = 'error';
                    publisher.error(xhr);
                }
            }
        };
        xhr.upload.addEventListener("progress", (event) => {
            if (this.status == 'sending') {
                let percentage = Math.round((event['loaded'] * 90)/event['total']);
                publisher.next(new UploadEvent(Status.PROCESSING, INITIAL_PERCENTAGE + percentage));
            }
        }, false);
    }
    subscribe(observerOrNext?: any | ((value) => void), error?: (error: any) => void, complete?: () => void) {
        this.publisher.subscribe(observerOrNext, error, complete);
        return this;
    }
    cancel() {
        if (this.status != 'completed' && this.status != 'error') {
            if (this.status == 'sending') {
                this.status = 'canceled';
                this.xhr.abort();
            }
            this.publisher.next(new UploadEvent(Status.CANCELED, 0));
            this.publisher.complete();
        }
    }
    error(err) {
        this.status = 'error';
        this.publisher.error(err);
    }
    upload(url: string, formData: FormData) {
        this.status = 'sending';
        this.publisher.next(new UploadEvent(Status.PROCESSING, INITIAL_PERCENTAGE));
        this.xhr.open('POST', url, true);
        this.xhr.send(formData);
    }
}

@Injectable()
export class S3Service {
    private s3Info: S3Info;
    private backendService: BackendService;
    
    constructor(backendService: BackendService) {
        this.backendService = backendService;
        backendService.get('/app/s3/bucket')
            .map(res => res.json())
            .subscribe(res => {
                let signUrl = this.backendService.getApiUrl('/s3/verify');
                this.s3Info = new S3Info(String(res.accessKey), String(res.bucket), signUrl);
            });
    }
    
    upload(file: File, key: string, type: string): Uploader {
        if (this.s3Info.folder != '') {
            key = this.s3Info.folder + '/' + key;
        }
        let publisher = new BehaviorSubject<UploadEvent>(new UploadEvent(Status.STARTED, 0));
        let xhr:XMLHttpRequest = new XMLHttpRequest();
        let uploader = new Uploader(publisher, xhr, file.name, this.s3Info.endpoint + '/' + key);
        this.getSignedPolicy(file.name, type, key)
            .subscribe(res => {
                let formData = this.getUploadForm(file, key, type, res.policy , res.signature);
                uploader.upload(this.s3Info.endpoint, formData);
            }, err => {
                uploader.error(err['_body']['currentTarget']);
            });
        return uploader;
    }
    
    private getUploadForm(file: File, key: string, type: string, policy, signature) {
        let formData = new FormData();
        formData.append("key", key);
        formData.append("AWSAccessKeyId", this.s3Info.accessKey);
        formData.append("Content-Type", type)
        formData.append("success_action_status", ACTION_SUCCESS_STATUS);
        formData.append("acl", "public-read");
        formData.append("x-amz-meta-qqfilename", file.name);
        formData.append("policy", policy);
        formData.append("signature", signature);
        formData.append("file", file, file.name);
        return formData;
    }
    
    private getSignedPolicy(name: string, type: string, key: string) {
        let policy = this.getPolicy(name, type, key);
        return this.backendService.post(this.s3Info.signUrl, policy)
            .map(res => res.json());
    }
    
    private getPolicy(name: string, type: string, key: string) {
        return {
            "expiration": new Date(new Date().getTime() + 5*60000).toISOString(),
            "conditions":[  
                { "acl": "public-read" },
                { "bucket": this.s3Info.bucket },
                { "Content-Type": type },
                { "success_action_status":"200" },
                { "key": key },
                { "x-amz-meta-qqfilename": name },
                [ "content-length-range", "0", String(MAX_FILE_SIZE)]
            ]
        };
    }
}