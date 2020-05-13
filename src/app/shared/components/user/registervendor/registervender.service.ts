import { Injectable } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import {HttpClient} from '@angular/common/http';
//import { ToastrService } from 'ngx-toastr/toastr/toastr.service';
import { CommonService } from "../../../services/common.service";

@Injectable({
  providedIn: 'root'
})
export class RegistervenderService {

  constructor(private fb:FormBuilder,private http:HttpClient) { }
  readonly baseuri=new CommonService().getUri();
    formModel=this.fb.group({
      FirstName:['',Validators.required],
      MiddleName:[''],
      LastName:['',Validators.required],
      DisplayName:['',Validators.required],
      UserName:['',Validators.required],
      City:['',Validators.required],
      State:['',Validators.required],
      Country:[''],
      Company:[''],
      Logo:[''],
      Address:['',Validators.required],
      PostalCode:[''],
      Email:['',[Validators.required,Validators.email]],
      Phone:['',Validators.required],
      FacebookId:[''],
      TwitterId:[''],
      Passwords:this.fb.group({
      Password:['',[Validators.required,Validators.minLength(6)]],
      ConfirmPassword:['',Validators.required],
      },{validators:this.ComparePasswords})
    
    })
   
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
    
  registerVendor(){
     
  var body={
    FirstName:this.formModel.value.FirstName,
    MiddleName:this.formModel.value.MiddleName,
    LastName:this.formModel.value.LastName,
    DisplayName:this.formModel.value.DisplayName,
    UserName:this.formModel.value.UserName,
    Address:this.formModel.value.Address,
    City:this.formModel.value.City,
    StateId:this.formModel.value.State,
    CountryId:this.formModel.value.Country,
    PostalCode:this.formModel.value.PostalCode,
    Company:this.formModel.value.Company,
    Logo:this.formModel.value.Logo,
    Email:this.formModel.value.Email,
    Phone:this.formModel.value.Phone,
    Password:this.formModel.value.Passwords.Password,
   
      
  };
  return this.http.post(this.baseuri+'user/registerVendor',body)
  
    }
     GetCountries(){
      return this.http.get(this.baseuri+'country/getAll');
      
      
    }
    GetStates(countryId:number){
      return this.http.get(this.baseuri+'state/getByCountryId?id='+countryId);
    }
}
