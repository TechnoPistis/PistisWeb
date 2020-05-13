import { Injectable } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import{CommonService} from '../../../services/common.service';
@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private fb:FormBuilder,private http:HttpClient) { }
readonly baseurl=new CommonService().getUri();
  formModel=this.fb.group({
    FirstName:['',Validators.required],
    MiddleName:[''],
    LastName:[''],
    Email:['',[Validators.required,Validators.email]],
    Phone:[''],
    //recaptcha: ['', Validators.required],
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

    register(){
      var body={
        FirstName:this.formModel.value.FirstName,
        MiddleName:this.formModel.value.MiddleName,
        LastName:this.formModel.value.LastName,
        Email:this.formModel.value.Email,
        Phone:this.formModel.value.Phone,
        Password:this.formModel.value.Password,
      };
      return this.http.post(this.baseurl+'user/registerCustomer',body);
        }
        registerForCheckout(){
          var body={
            FirstName:this.formModel.value.FirstName,
            MiddleName:this.formModel.value.MiddleName,
            LastName:this.formModel.value.LastName,
            Email:this.formModel.value.Email,
            Phone:this.formModel.value.Phone,
            Password:this.formModel.value.Password,
          };
          return this.http.post(this.baseurl+'user/registerForCheckout',body);
          
            }


}
