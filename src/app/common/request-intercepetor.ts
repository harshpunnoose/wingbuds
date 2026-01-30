import { catchError } from 'rxjs/operators';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable()
export class RequestInterceptor implements HttpInterceptor {

  constructor() { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any> | any> {
    let authReq = req;
    const headers = req.headers
      .set('Authorization', 'Bearer 5|1GV4COIcpnt4jPjkvUoNDEaKHb1D5tTyaB3lfVJl128f7405')
      .set('Accept', 'application/json')
    // .set('Content-Type', 'application/json');

    authReq = req.clone({ headers });
    return next.handle(authReq).pipe(
      catchError((err: HttpErrorResponse) => {
        console.error('HTTP ERROR REQUEST : ', req);
        console.error('HTTP ERROR INFO : ', err);
        throw err;
      })
    );
  }
}
