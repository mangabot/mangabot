import { Injectable } from '@angular/core';
import { Http, Response, Jsonp, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Site } from './sidebar/site.model';

@Injectable()
export class MangaService {

    constructor(private jsonp: Jsonp, private http: Http) { }

    getList(url: string): Observable<string[]> {
        let params1 = new URLSearchParams();
        params1.set('callback', 'JSONP_CALLBACK');
        params1.set('format', 'text');

        this.jsonp.get(url, { search: params1 })
            
            .subscribe(data => {
                console.log(data);
            },
            error => {
                console.log(error);
            });


        let wikiUrl = 'http://en.wikipedia.org/w/api.php';

        let params = new URLSearchParams();
        params.set('search', "a"); // the user's search value
        params.set('action', 'opensearch');
        params.set('format', 'json');
        params.set('callback', 'JSONP_CALLBACK');

        // TODO: Add error handling
        this.jsonp
            .get(wikiUrl, { search: params })
            .map(response => <string[]>response.json()[1])
            .subscribe(data => {
                console.log(data);
            },
            error => {
                console.log(error);
            });



        return this.http.get(url)
            .map((res: Response) => res.json());
    }
}