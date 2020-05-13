import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpErrorResponse, HttpRequest, HttpHandler, HttpEvent, HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, of, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { CommonService } from './common.service';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {
  data=new CommonService();
  private url=this.data.getUri();
  constructor(private router: Router,private http:HttpClient) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = JSON.parse(sessionStorage.getItem('token'));
    if (token) {
      request = request.clone({
        setHeaders: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      });
    }

    return next.handle(request).pipe( tap(() => {},
      (err: any) => {
      if (err instanceof HttpErrorResponse) {
        if (err.status !== 401) {
         return;
        }
          
        // return this.http.get(this.url+'user/getCustomer?Id='+Id, {headers: new HttpHeaders().set('Authorization', `Bearer ${sessionStorage.getItem('token')}`)});
        this.router.navigate(['login']);
      }
    }));
  }
}
