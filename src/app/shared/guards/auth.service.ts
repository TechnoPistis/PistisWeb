import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { CommonService } from "../../shared/services/common.service";
import { CommonModule } from '@angular/common';


interface myData {
  success: boolean,
  message: string,
  id:number,
  roleId:number
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  data ={
    username:'',
    password:''
  }
  private loggedInStatus = false
  private url=new CommonService().getUri();
  constructor(private http:HttpClient) { }
  setLoggedIn(value: boolean) {
    this.loggedInStatus = value
  }
  get isLoggedIn() {
    return this.loggedInStatus
  }
  getUserDetails(username, password) {
    
    this.data.password = password;
    this.data.username = username;
    return this.http.post<myData>(this.url+'user/verifyUser', this.data
    )
  }
}
