import { Injectable } from '@angular/core';
//import { Router,CanActivate } from '@angular/router';
import { CanActivate, Router, NavigationEnd } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { CommonService } from '../services/common.service';
import { HttpClient, HttpRequest } from '@angular/common/http';
import { UserLogin } from '../components/user/usermodel';

@Injectable()
export class AuthGuard implements CanActivate {
  data = new CommonService();
  private url = this.data.getUri();

  constructor(private jwtHelper: JwtHelperService, private router: Router, private http: HttpClient,
   ) {
  }
  canActivate() {
      
    var url=localStorage.getItem("reqLink");
    
    var token = sessionStorage.getItem("token");

    if (token && !this.jwtHelper.isTokenExpired(token)) {
      //this.router.navigate([url]);
      return true;
    }
    else if (token && this.jwtHelper.isTokenExpired(token)) {
      var login = new UserLogin();
      login.username = localStorage.getItem('UserName');
      login.Token = sessionStorage.getItem('token');
      login.refreshToken = sessionStorage.getItem('refreshToken')
      login.RoleId=+localStorage.getItem('RoleId')
      this.http.post(this.url + 'user/refresh', login).subscribe((x: UserLogin) => {
          
        if (x) {
          sessionStorage.setItem('token', x.Token)
          sessionStorage.setItem('refreshToken', x.refreshToken)
          this.router.navigate([url]);
          return false;
        }
        else{
        this.router.navigate(["customer/UserLogin"]);
        return false
        }
      })
    }
    else{
    this.router.navigate(["customer/UserLogin"]);
    return false;
    }
  }
}



