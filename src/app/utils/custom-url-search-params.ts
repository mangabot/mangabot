import {URLSearchParams} from 'angular2/http';

/**
 * name
 */
export class CustomURLSearchParams extends URLSearchParams {
    set(key: string, value: string) {
        super.set(key, encodeURIComponent(value));
    }
}