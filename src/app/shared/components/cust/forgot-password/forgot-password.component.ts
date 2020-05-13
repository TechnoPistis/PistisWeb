import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { CommonService } from "../../../services/common.service";
import { ForgotService } from "./forgot.service";
import { throwMatDialogContentAlreadyAttachedError } from '@angular/material';
import { UserLogService } from 'src/app/shared/services/user-log.service';
import { Tracklog } from 'src/app/shared/services/Tracklog.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  loginForm: FormGroup;
  Email = ''
  Otp = ''
  submitted = false;
  returnUrl: string;
  Id: any;
  uri = new CommonService();
  url = this.uri.getUri();
  firstbutton: boolean = false
  emailValidation: boolean = false
  emailnotreg: boolean = false
  otpcheck: boolean = false
  emailValid: boolean = false
  emptyEmail: boolean = false
  otpEmpty: boolean = false
  otpvalid: boolean = false
  ConfirmPass: any = ''
  Newpass: any = ''
  data = {
    username: null,
    password: null
  }
  date: any
  validUser: number;
  ipAddress: any;
  roleId: any
  UserName: any;
  emailId: any;
  changePassword = {
    userId: 0,
    Password: '',
    EmailId: '',
    Otp: '',
    phoneNo: ''

  }
  description:string
  Action:string
  passlen: boolean;
  confirmPass: boolean;
  service: any;
  display: string;
  enterPassAgain: boolean;
  Url: any;
  productId: any=0;
  PageUrl:string
  RequestUrl:string
  Guid: string;
  constructor(

    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient,
    private toster: ToastrService,
    private Service: ForgotService,
    private userLog:UserLogService,
    public tracklog:Tracklog
  ) {


  }

  ngOnInit() {
    this.Guid=this.tracklog.newGuid()
    this.PageUrl=  this.router.url.replace("/","");

    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]

    });
    this.Url = this.router.url;
      this.userLog.UserLog(this.productId, 1, this.Url, 1);
  }
  getEmail(val: any) {
    this.RequestUrl="login/checkEmail?email="

    this.tracklog.handleSuccess1(this.description="Otp sent to your registered email id",this.Action="Otp sent","Request",this.RequestUrl,this.PageUrl,this.Guid)

    this.submitted = true;

    this.emailId = val
    this.Service.emailcheck(val).subscribe(x => {
      if (x == 1) {
        var lang = localStorage.getItem('browseLang')
        if (lang == 'english') {
    this.RequestUrl="login/checkEmail?email="

          this.tracklog.handleSuccess1(this.description="Otp sent to your registered email id",this.Action="Otp sent","1",this.RequestUrl,this.PageUrl,this.Guid)
  //  this.tracklog.handleSuccess1(this.description="New UserCreated",this.Action="User registered","Request",this.RequestUrl,this.PageUrl,this.Guid)

          this.toster.success("Otp sent to your registered email id.")
        } else {
          this.toster.success("Otp enviado a su ID de correo electrónico registrado.")
        }

        this.emailValidation = true
        this.firstbutton = true
        this.emailnotreg = false
      }
      else {
        this.emailnotreg = true
        this.emailValidation = false
      }
    },
    error =>
   //  this.tracklog.handleError(error,this.Action="Otp sent")
     this.tracklog.handleError1(error,this.Action="Otp sent",this.RequestUrl,this.PageUrl,this.Guid)

    )
  }
  //reset
  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }


  onSubmit(val: string) {

    if (val == "") {
      this.otpEmpty = true
      return false
    }
    this.otpEmpty = false



    this.changePassword.EmailId = this.emailId;
    this.changePassword.Otp = val
    this.Service.otpCheck(this.changePassword).subscribe(x => {
      if (x == 1) {

        this.otpvalid = false
        this.otpcheck = true
        this.emailValidation = false
        this.firstbutton = true
      } else {

        this.otpvalid = true
        this.otpcheck = false

      }
    })


  }
  Salt(val: string) {

    if (val.length >= 6) {
      this.passlen = false
    } else {
      this.passlen = true
    }
  }
  saltMixture(salt1: string, salt2: string) {
    this.RequestUrl='login/changePassword'
    this.tracklog.handleSuccess1(this.description="Password changed successfully",this.Action="Password change","Request",this.RequestUrl,this.PageUrl,this.Guid)

    if (salt2.length > 0) {
      var str1: string = salt1;
      let res = str1.localeCompare(salt2)
      if (res != 0) {
        this.confirmPass = true
      } else {
        this.sendNewSalt(salt2).subscribe(x => {

          if (x == 1) {
            var lang = localStorage.getItem('browseLang')
    this.tracklog.handleSuccess1(this.description="Password changed successfully",this.Action="Password change",JSON.stringify(x),this.RequestUrl,this.PageUrl,this.Guid)

         //   this.tracklog.handleSuccess(this.description="Password changed successfully",this.Action="Password change",JSON.stringify(x))
            if (lang == 'english') {
              this.toster.success("Password changed successfully.")
            } else {
              this.toster.success("Contraseña cambiada con éxito.")
            }

            this.router.navigate(['/customer/UserLogin']);

          }
        },
        error =>
        //this.tracklog.handleError(error,this.Action="Password change")
        this.tracklog.handleError1(error,this.Action="Password change",this.RequestUrl,this.PageUrl,this.Guid)

        )
      }
    } else {
      this.enterPassAgain = true
    }
  }
  sendNewSalt(pass: string) {
    this.changePassword.Password = pass
    this.changePassword.EmailId = this.emailId
    return this.http.post(this.url + 'login/changePassword', this.changePassword)
  }



  getEmail1(email: string) {
    if (email == "") {
      this.emptyEmail = true
      return false;
    }
    this.emptyEmail = false


    let result: boolean
    let UserId: any
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    result = re.test(String(email).toLowerCase());
    if (result) {
      this.emailValid = false
      this.getEmail(email)
    } else {
      this.emailValid = true
      return 0;
    }
  }


}



