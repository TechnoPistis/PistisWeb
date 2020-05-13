import { Injectable } from '@angular/core';

import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  constructor() { }
  private handleError(errorResponse: HttpErrorResponse) {
    if (errorResponse.error instanceof ErrorEvent) {
        console.error('Client Side Error :', errorResponse.error.message);
    } else {
        console.error('Server Side Error :', errorResponse);
    }
    // return an observable with a meaningful error message to the end user
    return throwError('There is a problem with the service.We are notified & working on it. Please try again later.');
}

}
