import { Injectable } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import { CommonService } from "../../shared/services/common.service";
@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private fb:FormBuilder,private http:HttpClient) { }
readonly baseuri=new CommonService().getUri();
  formModel=this.fb.group({
    FirstName:['',Validators.required],
    MiddleName:[''],
    LastName:[''],
    Email:['',[Validators.required,Validators.email]],
    Phone:[''],
    
      Password:['',[Validators.required,Validators.minLength(6)]],
      ConfirmPassword:['',Validators.required],
    },{validators:this.ComparePasswords})
  
  ComparePasswords(fb:FormGroup)
  {
    let confirmPwdCtrl=fb.get('ConfirmPassword')
    if(confirmPwdCtrl.errors==null||'passwordMismatch' in confirmPwdCtrl.errors)
    {
      if(fb.get('Password').value!=confirmPwdCtrl.value)
        confirmPwdCtrl.setErrors({passwordMismatch:true})
        else
        confirmPwdCtrl.setErrors(null);
    }
  }
//   validateEmail(Email){
//     return this.http.get(this.baseuri + 'user/validate-email/' + Email).map(res => res.json());
// }

  register(){
var body={
  FirstName:this.formModel.value.FirstName,
  MiddleName:this.formModel.value.MiddleName,
  LastName:this.formModel.value.LastName,
  Email:this.formModel.value.Email,
  Phone:this.formModel.value.Phone,
  Password:this.formModel.value.Password,
};
return this.http.post(this.baseuri+'user/register',body);
  }
}
