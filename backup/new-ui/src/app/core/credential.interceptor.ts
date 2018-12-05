import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

declare var X: any;

@Injectable()
export class CredentialInterceptor implements HttpInterceptor {

  constructor() { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let xCtx = X.getContext();

    const authReq = request.clone({
      setHeaders: {
        'x-hoiio-credential-session-token': xCtx.sessionToken,
        'x-hoiio-user-org-uuid': xCtx.orgUuid
      }
    });

    return next.handle(authReq).pipe(
      catchError((err: HttpErrorResponse) => {
        if (err.status >= 200 && err.status < 300) {
          return of(new HttpResponse({
            body: null,
            headers: err.headers,
            status: err.status,
            statusText: err.statusText,
            url: err.url
          }));
        } else {
          return throwError(err.error);
        }
      })
    );
  }
}