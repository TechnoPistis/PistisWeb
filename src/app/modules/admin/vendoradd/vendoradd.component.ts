import {
  DropzoneModule,
  DropzoneConfig,
  DropzoneComponent
} from "ngx-dropzone-wrapper";
import { Vendor } from "./vendor";
import { Router, ActivatedRoute } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { VendorsService } from "../vendorlist/vendors.service";
import { DatePipe } from "@angular/common";
import { NgForm, FormGroup } from "@angular/forms";
import { Component, OnInit, DebugElement, ViewChild, ElementRef, HostListener } from "@angular/core";

@Component({
  selector: "app-vendoradd",
  templateUrl: "./vendoradd.component.html",
  styleUrls: ["./vendoradd.component.css"]
})
export class VendoraddComponent implements OnInit {
  cat: Vendor;
  dataList: any;
  genderList: any;
  stateList: any;
  countryList: any;
  languageList: any;
  data: string;
  CompanyLogo: any;
  Image: any;
  registerForm: FormGroup;
  submitted = false;
  Name:boolean=false
  companyy:boolean=false
  DisName: boolean=false;
  Emailval: boolean=false;
  passlen: boolean=false;
  Passval: boolean=false;
  Countryval: boolean=false;
  Stateval: boolean=false;
  Postalval: boolean=false;
  Genderval: boolean=false;
  Languageval: boolean=false;
DOBVal:boolean=false
  Emaillen: boolean=false;
  constructor(
    private toastr: ToastrService,
    private Router: Router,
    private route: ActivatedRoute,
    public service: VendorsService,
    private datePipe: DatePipe,
    private _el: ElementRef
  ) {}


  config: any;
  ngOnInit() {
    this.resetForm();
    this.service.getCountry().subscribe(res => (this.countryList = res as []));
    this.service.getState().subscribe(res => (this.stateList = res as []));
    this.service
      .getLanguage()
      .subscribe(res => (this.languageList = res as []));
    this.service.getGender().subscribe(res => (this.genderList = res as []));
  }
  @ViewChild(DropzoneComponent,{static:false})
  componentRef?: DropzoneComponent;
  get f() { return this.registerForm.controls; }
  resetForm(form?: NgForm) {
    if (form != null) form.resetForm();
    this.service.formData = {
      Id: 0,
      Password: "",
      Company: "",
      Address: "",
      City: "",
      CountryId: 0,
      DOB: null,
      DisplayName: "",
      Email: "",
      RFC:"",
      FacebookId: "",
      FirstName: "",
      GenderId: null,
      LanguageId: null,
      LastName: "",
      Phone: null,
      PostalCode: null,
      StateId: 0,
      State:"",
      TwitterId: "",
      UserName: "",
      MiddleName: "",
      Image: "",
      Logo: "",
      IdProof: "",
      ConfirmPassword:""
    };
  }

  onProfilePicUpload(event: any) {
    if (event[0].dataURL) {
      this.Image = event[0].dataURL;
       
    }
  }
  onLogoUpload(event: any) {
    if (event[0].dataURL) {
      this.CompanyLogo = event[0].dataURL;
    }
  }
validation(form:NgForm){
  if(form.value.FirstName==""){
    this.Name=true
    return false
  }else{
    this.Name=false
  }


  if(form.value.Company==""){
    this.companyy=true
    return false
  }else{
    this.companyy=false
  }


  if(form.value.DisplayName==""){
    this.DisName=true
    return false
  }else{
    this.DisName=false
  }
  
  if(form.value.Email==""){
    this.Emailval=true
    return false
  }else{
    this.Emailval=false
  }

if(form.value.Password!=""){

  if(form.value.Password.length<6 ){
    this.passlen=true
    this.Passval=false

    return false
  }else{
    this.passlen=false
  }


}

if(form.value.Password==""){
  this.Passval=true
  //return false
}else{
  this.Passval=false
}




if(form.value.CountryId==0){
   
  this.Countryval=true
  //return false
}else{
  this.Countryval=false
}

if(form.value.StateId==0){
  this.Stateval=true
  //return false
}else{
  this.Stateval=false
}

if(!form.value.PostalCode){
  this.Postalval=true
  //return false
}else{
  this.Postalval=false
}

if(!form.value.GenderId){
  this.Genderval=true
  return false
}else{
  this.Genderval=false
}

if(!form.value.LanguageId){
  this.Languageval=true
  return false
}else{
  this.Languageval=false
}


// if(!form.value.DOB){
//   this.DOBVal=true
//   return false
// }else{
//   this.DOBVal=false
// }
if(form.value.Email!=""){
  let result: boolean;
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
result = re.test(String(form.value.Email).toLowerCase());
  if(result){
    
  }else{
    this.Emaillen=true
  this.Emailval=false
  return false
  }
 
}else{
  this.Emaillen=false
}

}
  onSubmit(form: NgForm) {
      
  //  let result1:boolean

    if(form.value.FirstName==""){
      this.Name=true
      //return false
    }else{
      this.Name=false
    }
  
  
    if(form.value.Company==""){
      this.companyy=true
      //return false
    }else{
      this.companyy=false
    }
  
  
    if(form.value.DisplayName==""){
      this.DisName=true
      //return false
    }else{
      this.DisName=false
    }
    
    if(form.value.Email==""){
      this.Emailval=true
      //return false
    }else{
      this.Emailval=false
    }
  
  if(form.value.Password!=""){
  
    if(form.value.Password.length<6 ){
      this.passlen=true
      this.Passval=false
  
      //return false
    }else{
      this.passlen=false
    }
  
  
  }
  
  if(form.value.Password==""){
    this.Passval=true
    //return false
  }else{
    this.Passval=false
  }
  
  
  
  
  if(form.value.CountryId==0){
     
    this.Countryval=true
    //return false
  }else{
     
    this.Countryval=false
  }
  
  if(form.value.StateId==0){
     
    this.Stateval=true
    //return false
  }else{
     
    this.Stateval=false
  }
  
  if(!form.value.PostalCode){
    this.Postalval=true
    //return false
  }else{
    this.Postalval=false
  }
  
  if(!form.value.GenderId){
    this.Genderval=true
    //return false
  }else{
    this.Genderval=false
  }
  
  if(!form.value.LanguageId){
    this.Languageval=true
    //return false
  }else{
    this.Languageval=false
  }
  
  
  // if(!form.value.DOB){
  //   this.DOBVal=true
  //   return false
  // }else{
  //   this.DOBVal=false
  // }
  if(this.Name||this.companyy||this.DisName||this.Emailval||this.Passval||this.Genderval||this.Languageval||this.Postalval||this.Countryval||this.Stateval||this.passlen)
  return false
  if(form.value.Email!=""){
    let result: boolean;
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  result = re.test(String(form.value.Email).toLowerCase());
    if(result){
      
    }else{
      this.Emaillen=true
    this.Emailval=false
    return false
    }
   
  }else{
    this.Emaillen=false
  }
      
    if( !this.CompanyLogo)
    {
      this.CompanyLogo=""
    }
    if( !this.Image)
    {
      this.Image=""
    }
    
if( form.value.IdProof ||  form.value.IdProof==""){
  form.value.IdProof=""
}
  form.value.Logo = this.CompanyLogo;
  form.value.Image = this.Image;

  // if (!form.valid) {
  //   this.toastr.clear();
  //   this.toastr.error('Invalid form!');
  //   return false;
  // }
  // else{
    this.service.saveVendor(form.value).subscribe((res:any) => {
      if(res.ReturnCode==-1){

        this.toastr.info(res.ReturnMessage)
      }else if(res.ReturnCode==0  ){
      this.toastr.info("Submitted", "Vendor");
      //this.resetForm();

      this.Router.navigate(["/admin/vendorlist"]);
      }
    });
 // }
}

}
