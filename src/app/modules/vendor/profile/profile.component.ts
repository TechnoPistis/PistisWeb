import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ProfileService } from 'src/app/shared/components/my-profile/profile.service';
import { UserLogService } from 'src/app/shared/services/user-log.service';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/shared/services/common.service';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  DisplayName:any=""
  modal1:any='hide'
 UserId:any=localStorage.getItem('UserId')
 Name:boolean=true
 Email:boolean=true
 Phone:boolean=true
 FirstName:string
 result: boolean=false
 MiddleName:string
 LastName:string
 EmailId:string
 PhoneNo:any
 EmailValid:boolean=false
 EmailValidLenght:boolean=false
 Password:any
 NewPassword:any
 CurrentPassword:any
 phoneValid:boolean=false
 phonelenght:boolean=false
 phone=/^[0-9]*$/;
 name:boolean=false
 otpValid:boolean=false
 otpValidity:boolean=false
 passwordCheck:boolean=false
 confirmPass:boolean=false
 passlen:boolean=false
 enterPassAgain:boolean=false
 Currentpass:any=''
 Newpass:any=''
 ConfirmPass:any=''
 emailClick:boolean=false
 phoneClick:boolean=false
  re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
 display='none';
 display2='none';
 display1='none';
 phoneNumber='none'
 typeOtp:string=''
 UserName=localStorage.getItem('UserName')
   hidemainDiv: boolean=false;
   Url: string;
  VenderId: any="";
  State: any="";
  City: any="";
  CompanyName: any="";
  data=new CommonService();
  private url=this.data.getUri();
  countries: any;
  CountryId: any;
  CompanyLogo: any="";
  vendorDocument:any[]=[]
  Cityy: boolean=false;
  Statee: boolean=false;
  Displayy: boolean=false;
  Companyyy: boolean=false;
   constructor(private service :ProfileService,
     private Router: Router,
     private toster: ToastrService,private userLog:UserLogService,private http:HttpClient) { }
 
 
 
   ngOnInit() {
  this.getcountry().subscribe(x=>{
    this.countries=x as []
  })
     this.service.getCustomer(this.UserId as number).subscribe((x:any)=>
       {
           
       this.EmailId= x.EmailId?x.EmailId:''
       this.FirstName=x.FirstName?x.FirstName:''
       this.MiddleName=x.MiddleName?x.MiddleName:''
       this.LastName=x.LastName?x.LastName:''
       this.PhoneNo=x.PhoneNo?x.PhoneNo:''
       this.VenderId=x.vendorId
       this.State=x.State
       this.City=x.City
       this.CompanyName=x.CompanyName
       this.DisplayName=x.DisplayName
       this.CountryId=x.CountryId
 console.table(x)
       });
   
   }
  //  onLogoUpload(event: any) {
  //   if (event[0].dataURL) {
  //     this.CompanyLogo = event[0].dataURL;
  //   }
    
  // }
    
  onIDUpload3(event: any) {
    const file = event.target.files[0];
    const typeFile = file.type.split('/');
    if(typeFile[1] === 'png' || typeFile[1] === 'jpg' || typeFile[1] === 'jpeg' || typeFile[1] === 'gif'){ 
    if (event[0].dataURL) {
      this.CompanyLogo = event[0].dataURL;
       
    }
  
}else{
  this.toster.info("Kindly upload  the valid file eg. .jpg .png ...")
}
  }
  onIDUpload(event: any) {
    const file = event.target.files[0];
    const typeFile = file.type.split('/');
    if(typeFile[1] === 'png' || typeFile[1] === 'jpg' || typeFile[1] === 'jpeg' || typeFile[1] === 'gif'){ 

    if (event[0].dataURL) {
      this.VenderId = event[0].dataURL;
       
    }
  }else{
    this.toster.info("Kindly upload  the valid file eg. .jpg .png ...")
  }
  }
  onIDUpload1(event: any) {
    const file = event.target.files[0];
    const typeFile = file.type.split('/');
    if(typeFile[1] === 'png' || typeFile[1] === 'jpg' || typeFile[1] === 'jpeg' || typeFile[1] === 'gif'){ 

    if (event[0].dataURL) {
      this.vendorDocument.push(event[0].dataURL);
       
    }
  }else{
    this.toster.info("Kindly upload  the valid file eg. .jpg .png ...")

  }

  }
 getcountry(){
  return  this.http.get(this.url+'Vendor/getcountry')

 }
   openModal(){
  
     this.display='block';
 
  }
  onCloseHandled(){
  
   this.display='none';
 
 }
  
   onEdit(){
     
 this.Name=false
 
   }
   onSave(first:string,middle:string,last:string){
     
 if(first.length>0){
     this.service.saveName(first,middle,last).subscribe(x=>{
       if(x==1){
 this.toster.success("Name saved successfully.")
 this.name=false
 this.Name=true
       }
     })
 
   }else{
     this.name=true
   }
    
   }
 
   SaveModalEmail(Email:string,otp:string){
     
 
   }
   getEmail(email: string) {
     // alert(email)
 let message=0
     
  
     let UserId: any
     this.result = this.phone.test(String(email).toLowerCase());
     if(!this.result){
 
       this.EmailValidLenght=true
       this.EmailValid=true
       this.toster.info("Please enter valid Email")
       message=1
     }
     return message;
   }
   onEdit1(){
 this.Email=false
   }
 
 
   saveEmail(email: string){
       
     this.emailClick=true
     this.phoneClick=false
 this.resetPass()
     let Emailenght= email.length
     let message=0
     
     let UserId: any
     this.result = this.re.test(String(email).toLowerCase());
     if(!this.result){
       if(Emailenght==0){
   this.EmailValidLenght=true
       }
       else{this.EmailValid=true}
       
       this.toster.info("Please enter valid Email")
      
       message=1
     }else{
       this.service.generateOtp(email).subscribe(
         x=>{
 
     if(x==1){
       this.toster.info("Otp sent to your email successfully")
       this.EmailValidLenght=false
       this.EmailValid=false
       this.display='block';
       this.Email=true
     }
       }  )
       // this.service.saveEmail(email).subscribe(x=>{
       //   this.toster.info("Otp sent to your email successfully")
         
 
       // })
     
     }
     return message;
    
   }
   changeEmail(email: string,otp:any,number:string){
     
 if(otp.length>0){
    this.service.saveEmail(email,otp,number).subscribe(x=>{
      if(x==1){ this.toster.success("Email changed successfully")
     this.onCloseHandled()
     }
        
         else{
         this.toster.warning("The OTP entered is incorrect.")
       }
     })
 }else{
   this.otpValid=true
 }
   }
 
   onEdit3(){
     this.Phone=false
   }
   savePhone(phone:string){
       
     this.emailClick=false
     this.phoneClick=true
     this.resetPass()
     let phoneLen=phone.length
     if(phoneLen>0){
       
       this.phonelenght=false
     this.result = this.phone.test(String(phone).toLowerCase());
     if(!this.result){
       if(phoneLen==0){
         this.phonelenght=true
             }
             else{this.phoneValid=true}
     }else{
       this.service.generateOtp(phone).subscribe(
         x=>{
 
     if(x==1){
       this.toster.info("Otp sent  successfully")
       this.phonelenght=false
       this.phoneValid=false
       this.display='block';
       this.Phone=true
     }
       }  )
      
     }
   }else{
     this.phonelenght=true
   }
   }
   logout(){
     this.modal1;
     localStorage.removeItem('UserName')
     localStorage.removeItem('UserId')
     this.Router.navigate(['/customer/UserLogin'])
   }
   takeTheSalt(val:string){
     
   
     
     this.service.checkTheSalt(val).subscribe(x=>{
       if(x==0){
 this.passwordCheck=true
       }else{
         this.passwordCheck=false
       }
     })
  
 
   }
    takeTheSalt1(val:string){
     
   
     
    
     this.service.checkTheSalt(val).subscribe( x=>{
       if(x==0){
 this.passwordCheck=true
       }else{
         this.passwordCheck=false
  
       this.service.checkTheSalt1(val).subscribe( x=>{
          
         this.toster.success("Account deactivated successfully");
       this.modal1
         //this.logout()
         this.Deactivate1()
        this.logout()
         })
       }
     })
  
 
   }
   Salt(val:string){
     
     if(val.length>6){
       this.passlen=false
      }else{
       this.passlen=true
     }
   }
   saltMixture(salt1:string,salt2:string){
     
     if(salt2.length>0){
     var str1:string=salt1;
    let res= str1.localeCompare(salt2)
    if(res!=0){
 this.confirmPass=true
    }else{
      this.service.sendNewSalt(salt2).subscribe(x=>{
        if(x==1){
          
          this.toster.success("Password changed successfully.")
 this.display2='none'       }
      })
    }
   }else
   {
     this.enterPassAgain=true
   }
 }
 resetPass(){
   this.display2='block';
   this.Currentpass=''
   this.Newpass=''
 this.ConfirmPass=''
 this.name=false
 this.otpValid=false
 this.otpValidity=false
 this.passwordCheck=false
 this.confirmPass=false
 this.passlen=false
 this.enterPassAgain=false
 this.typeOtp=''
 }
 Deactivate(){
   this.display1='block'
 }
 Deactivate1(){
   this.display1='none'
 }
 Savedata(){
     
   if(this.FirstName=="" || !this.FirstName){
this.name=true
return false;
   }
   if(this.EmailId=="" || !this.EmailId){
    this.EmailValidLenght=true
    return false;
       }
       if(this.City=="" || !this.City){
        this.Cityy=true
        return false;
           }
           if(this.State=="" || !this.State){
            this.Statee=true
            return false;
               }
               if(this.DisplayName=="" || !this.DisplayName){
                this.Displayy=true
                return false;
                   }
                   if(this.CompanyName=="" || !this.CompanyName){
                    this.Companyyy=true
                    return false;
                       }
                       if(this.VenderId=="" || !this.VenderId){
                        this.toster.info("Kindly upload the Id")
                        return false;
                           }
                           if(this.CompanyLogo=="" || !this.CompanyLogo){
                            this.toster.info("Kindly upload the logo")
                            return false;
                               }

   var model:any={
   EmailId:"",
    FirstName:"",
   MiddleName:"",
   LastName:"",
    PhoneNo:"",

    State:"",
    City:"",
    CompanyName:"",
    DisplayName:"",
    CountryId:0,
    vendorDocument:[],
    VenderId:"",
    CompanyLogo:"",
    UserId:0

   }
model.EmailId=this.EmailId
model.FirstName=this.FirstName
model.MiddleName=this.MiddleName
model.LastName=this.LastName
model.PhoneNo=this.PhoneNo
model.State=this.State
model.City=this.City
model.CompanyName=this.CompanyName
model.DisplayName=this.DisplayName
model.CountryId=this.CountryId
model.vendorDocument=this.vendorDocument
model.VenderId=this.VenderId
model.CompanyLogo=this.CompanyLogo
model.UserId=this.UserId
return  this.http.post(this.url+'Vendor/saveVendorDetails',model).subscribe(x=>{
  this.toster.success("Data saved Successfully.")
})

 }
 }
 