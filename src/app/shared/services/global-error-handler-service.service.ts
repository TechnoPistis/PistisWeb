import { Injectable, ErrorHandler, Injector, NgZone } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class GlobalErrorHandlerService implements ErrorHandler {
 
 constructor(private injector: Injector) {    }
 
    handleError(error: any): void{
 
        let routerService = this.injector.get(Router);
        const ngZone = this.injector.get(NgZone);
        ngZone.run(() => {
          routerService.navigate(['/error'], { skipLocationChange: true });
        });
        // console.log('URL: ' + router.url);
        // console.error(error);
       
        // routerService.navigate(['/error'], { skipLocationChange: true });
   }
}
