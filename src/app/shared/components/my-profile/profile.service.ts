import { Injectable } from '@angular/core';
import { CommonService } from '../../services/common.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  userData:any={
    firstName:'',
    middleName:'',
    lastName:'',
    UserId:0,
    EmailId:''

  }
  changePassword:any={
    UserId:0,
    EmailId:'',
    otp:0,
    phoneNo:0

  }
  data=new CommonService();
  private url=this.data.getUri();
  constructor(private http:HttpClient) { }
  getCustomer(Id:number){
      
    return this.http.get(this.url+'Vendor/getCustomerdetails?Id='+Id
  );
    
  }
  saveName(firstName:string,middleName:string,lastName:string){
    this.userData.firstName=firstName
    this.userData.middleName=middleName
    this.userData.lastName=lastName
    this.userData.UserId=localStorage.getItem('UserId')
    return  this.http.post(this.url+'user/changeUserName',this.userData)
  }

  saveEmail(email:string,otp:any,number:string){
      
    this.changePassword.EmailId=email
    this.changePassword.otp=otp
    this.changePassword.userId=localStorage.getItem('UserId')
    if(number.length>0)
    this.changePassword.phoneNo=number
    else
    this.changePassword.phoneNo=''
  
    return  this.http.post(this.url+'user/changeEmail',this.changePassword)
  }
  generateOtp(val:string){
      
    let UserId=localStorage.getItem('UserId');
    if(val==null || val==undefined || val=='')
    return  this.http.get(this.url+'user/generateOtp?userId='+UserId)
    else
    return  this.http.get(this.url+'user/generateOtp?userId='+UserId+'&Email='+val)
  }
  checkTheSalt(pass:string){
    let UserId=localStorage.getItem('UserId')
    return this.http.get(this.url+'user/changeSalt?UserId='+UserId+'&password='+pass)
  }
  checkTheSalt1(pass:string){
    let UserId=localStorage.getItem('UserId')
    return this.http.get(this.url+'user/changeSalt1?UserId='+UserId+'&password='+pass)
  }
  sendNewSalt(pass:string){
    let UserId=localStorage.getItem('UserId')
    return this.http.get(this.url+'user/saveSalt?UserId='+UserId+'&password='+pass)
  }
  // sentOtp()
}
