import {Injectable, Inject} from 'angular2/core';
import {Http, URLSearchParams, Headers, RequestOptionsArgs, Response} from 'angular2/http';
import 'rxjs/Rx';
import {Observable, AsyncSubject} from 'rxjs/Rx';

declare var GLOBAL_SETTING: any;

export class CommandData {
    public item: Object;
    public items: Object[];
    public csvData: {fileName: string, fileUrl: string, indicator: Object}
}

@Injectable()
export class BackendService {
    private params: Object;
    private http: Http;
    
    constructor(http: Http) {
        this.http = http;
        this.params = new Object();   
        let queryString = decodeURIComponent(window.location.search.substring(1));
        let queryParemeters = queryString.split('&');
        for (let i = 0; i < queryParemeters.length; i++) {
            let parameter = queryParemeters[i].split('=');
            this.params[parameter[0]] = parameter[1];
        }
        this.params['api_url'] = GLOBAL_SETTING['api_url'];
        this.params['reload_url'] = GLOBAL_SETTING['api_url'];
        this.params['app_url'] = GLOBAL_SETTING['app_url'];
        
        if (this.params['api_url'] && this.params['reload_url']) {
            sessionStorage.setItem("app_config", JSON.stringify(this.params));
        } else if (localStorage.getItem("app_config")) {
            this.params = JSON.parse(sessionStorage.getItem("app_config"))
        }
    }
    get(url:string, parameters?: URLSearchParams, headers?: Headers, options?: RequestOptionsArgs) {
        let observable = this.http.get(this.getApiUrl(url), {
            headers: this.getHeaders(headers),
            search: parameters
        });
        return this.wrap(observable);
    }
    post(url:string, body:Object, parameters?: URLSearchParams, headers?: Headers, options?: RequestOptionsArgs) {
        let observable = this.http.post(this.getApiUrl(url), JSON.stringify(body), {
            headers: this.getHeaders(headers),
            search: parameters
        });
        return this.wrap(observable);
    }
    put(url:string, body:Object, parameters?: URLSearchParams, headers?: Headers, options?: RequestOptionsArgs) {
        let observable = this.http.put(this.getApiUrl(url), JSON.stringify(body), {
            headers: this.getHeaders(headers),
            search: parameters
        });
        return this.wrap(observable);
    }
    delete(url:string, parameters?: URLSearchParams, headers?: Headers, options?: RequestOptionsArgs) {
        let observable = this.http.delete(this.getApiUrl(url), {
            headers: this.getHeaders(headers),
            search: parameters
        });
        return this.wrap(observable);
    }
    wrap(observable: Observable<Response>) {
        let subject = new AsyncSubject<Response>();
        observable.subscribe(data => subject.next(data), error => {
           if (error.status == 401) {
               window.location = this.getParameter('reload_url');
           } else {
               subject.error(error);
           }
        }, () => subject.complete())
        return subject;
    }
    getOAuthCode() {
        return this.getParameter('code');
    }
    getAppUrl(url: string) {
        if (url.indexOf('/') == 0) {
            url = url.substring(1);
        }
        return this.getParameter('app_url') + url;
    }
    getApiUrl(url: string) {
        if (!(/^https?:\/\/.*/gi.test(url))) {
            if (url.indexOf('/') != 0) {
                url = '/' + url;
            }
            url = this.getParameter('api_url') + url;
        }
        if (url.indexOf("?") > 0) {
            url = url + "&_=" + Date.now();
        } else {
            url = url + "?_=" + Date.now();
        }
        return url;
    }
    getHeaders(headers?: Headers) {
        if (!headers) {
            headers = new Headers();
        }
        if (!headers.get('Content-Type')) {
            headers.set('Content-Type', 'application/json');
        }
        headers.set("X-HOIIO-AUTHCODE", this.getOAuthCode());
        return headers;
    }
    getParameter(name) {
        return this.params[name];
    }
    getParameters() {
        return this.params;
    }
}