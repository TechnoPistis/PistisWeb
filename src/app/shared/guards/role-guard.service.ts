import { Injectable } from '@angular/core';
import { Router, CanActivate ,ActivatedRouteSnapshot} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RoleGuardService implements CanActivate {

  constructor(public router:Router) { }
  canActivate(route: ActivatedRouteSnapshot):boolean{
   var data=JSON.parse(localStorage.getItem('currentUser'));
    const expectedRoleId = route.data.expectedRoleId;
    if (
      data==null || 
      data.RoleId !== expectedRoleId
    ) {
      this.router.navigate(['login']);
      return false;
    }
    return true;
  }
  }

