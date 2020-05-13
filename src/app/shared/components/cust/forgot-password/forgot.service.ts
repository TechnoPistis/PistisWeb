import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonService } from 'src/app/shared/services/common.service';

@Injectable({
  providedIn: 'root'
})
export class ForgotService {
  data=new CommonService();
  private url=this.data.getUri();
 
  constructor(private http:HttpClient) { }
  forgotEmail(val:string){

return this.http.get(this.url+"CustomerGroup/getOneCustomerGroup?Id="+val)

  }
emailcheck(val:string){ 

return this.http.get(this.url+"login/checkEmail?email="+val)

}
otpCheck(changePassword:any){
  
return this.http.post(this.url+"login/checkotp",changePassword)

}
}
