import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpRequest, HttpErrorResponse, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';



@Injectable()
export class HttpRequestInterceptor implements HttpInterceptor {
  constructor ( private router: Router) {
      debugger
   }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const newReq = req.clone({
      headers: req.headers.set('Content-Type', 'application/json'),
      withCredentials: false
    });
    debugger
    return next.handle(newReq)
      .pipe(
        retry(1),
        catchError((error: HttpErrorResponse) => {
            debugger
          let displayError = '';
          let serverError = '';
          let clientError = '';
          if (error.error instanceof ErrorEvent) {
            // client-side error
            clientError = `Error: ${error.error.message}`;
            alert(clientError)
          } else {
            // server-side error
            displayError = error.error;
            serverError = `Error Code: ${error.status}\n${error.message}\n${error.error}`;
alert(serverError)
            if (error.status === 401) {
                alert(error.status)
             // this.logService.error(serverError);
             // this.router.navigate(['/unauthorized', { message: error.error}]);
            }

            if (error.status >= 500) {
                alert(error.status)
            //  this.logService.error(serverError);
             // this.router.navigate(['/error']);
            }
          }
        // alert(displayError)
          return throwError(displayError);
        })
     );
  }
}