import { Component, OnInit } from "@angular/core";
import { VendorEdit } from "./vendor";
import { Router, ActivatedRoute } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { VendorsService } from "../vendorlist/vendors.service";
import { DatePipe } from "@angular/common";
import { NgForm } from '@angular/forms';
import { Vendor } from '../vendoradd/vendor';

@Component({
  selector: 'app-vendoredit',
  templateUrl: './vendoredit.component.html',
  styleUrls: ['./vendoredit.component.css']
})
export class VendoreditComponent implements OnInit {
  cat: Vendor;
  dataList: any;
  id: number;
  genderList: any;
  stateList: any;
  countryList: any;
  languageList: any;
  data: string;
  password: string;
  CompanyLogo: any;
  Image: any;
  isImageVisible = true;
  isLogoVisible = true;
  isImageUpload = false;
  isLogoUpload = false;
  config: any;
genderValue=0
  Name: any=false;
  companyy: any=false;
  DisName: any=false;
  Emailval: any=false;
  Passval: any=false;
  Genderval: any=false;
  Languageval: any=false;
  Postalval: any=false;
  Countryval: any=false;
  Stateval: any=false;
  passlen: any=false;
  constructor(
    private toastr: ToastrService,
    private Router: Router,
    private route: ActivatedRoute,
    public service: VendorsService,
    private datePipe: DatePipe
  ) { }

  ngOnInit() {
    this.resetForm();

    this.route.queryParams.subscribe(params => {
      this.service
        .getCountry()
        .subscribe(res => (this.countryList = res as []));
      this.service.getState().subscribe(res => (this.stateList = res as []));
      this.service
        .getLanguage()
        .subscribe(res => (this.languageList = res as []));
      this.service.getGender().subscribe(res => (this.genderList = res as []));
      this.id = params["Id"];

      this.service.getVendor(this.id).subscribe(res => {
          
        
        this.cat = res as Vendor;
    
        this.CompanyLogo = this.cat.Logo;
        this.Image = this.cat.Image;
        if(this.Image == null) this.removeImage();
        if(this.CompanyLogo == null) this.removeLogo();
        console.log(this.cat);
        this.populateForm(this.cat);
      });
    });
  }

  populateForm(cat: Vendor) {
    // alert(this.service.formData = Object.assign({}, cat));

    this.service.formData = Object.assign({}, cat);

    this.data = this.datePipe.transform(
      new Date(this.cat.DOB),
      "EEEE, MMMM d, y, h:mm:ss a zzzz"
    );
    //this.service.formData.DOB = new Date(this.data); 
    // this.service.formData.CountryId=cat.CountryId;
    // this.service.formData.
  }
  onSubmit(form: NgForm) {
     
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
  
    if(!form.valid){
      this.toastr.error("Please fill all fields.")
      return false;
    }
    this.updateRecord(form);
  }
  updateRecord(form: NgForm) {
      
    form.value.Image = this.Image;
    form.value.Logo = this.CompanyLogo;
    this.service.updateVendor(form.value).subscribe(res => {
      this.toastr.info("Updated successfully", "Vendor !");
      //this.resetForm(form);

      this.Router.navigate(["/admin/vendorlist"]);
    });
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
  removeImage(){
    this.isImageVisible = false;
    this.Image = null;
    this.isImageUpload = true;
  }
  removeLogo(){
    this.isLogoVisible = false;
    this.CompanyLogo = null;
    this.isLogoUpload = true;

  }

  resetForm(form?: NgForm) {
    if (form != null) form.resetForm();
    this.service.formData = {
      Password: "",
      IdProof: "",
      Id: null,
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
      ConfirmPassword: ""
    };
  }

}
