import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, NgForm } from '@angular/forms';
import { AuthService } from '../../../guards/auth.service';
import { GlobalErrorHandlerService } from '../../../services/global-error-handler-service.service';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { AlertService } from "./alert.service";
import { CommonService } from "../../../services/common.service";
import { BsDatepickerInputDirective } from 'ngx-bootstrap/datepicker/public_api';
import { UserLogService } from 'src/app/shared/services/user-log.service';
import { LoginService } from './login.service';
import { Tracklog } from 'src/app/shared/services/Tracklog.service';

@Component({
  selector: 'app-customer-login',
  templateUrl: './customer-login.component.html',
  styleUrls: ['./customer-login.component.css']
})
export class CustomerLoginComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  PageUrl:string
  RequestUrl:string
  Id: any;
  uri = new CommonService();
  url = this.uri.getUri();
  data = {
    username: null,
    password: null
  }
  date: any
  validUser: number;
  ipAddress: any;
  roleId: any
  UserName: any;
  Url: string;
  productId: any = 0;
  description:string
  Action:string
  Guid: string;
  constructor(

    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient,
    public alertService: AlertService,
    private toster: ToastrService,
    private userLog: UserLogService,
    private service: LoginService,
  public tracklog:Tracklog

  ) {
    // redirect to home if already logged in

  }

  ngOnInit() {
    this.Guid=this.tracklog.newGuid()
    this.PageUrl=  this.router.url.replace("/","")
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    this.Url = this.router.url;
    this.userLog.UserLog(this.productId, 1, this.Url, 1);
  }

  //reset

  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  onSubmit() {
    this.RequestUrl="user/verifyUser"
    this.tracklog.handleSuccess1(this.description="User login in the site ",this.Action="Login","Request",this.RequestUrl,this.PageUrl,this.Guid)

    this.submitted = true;
    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }
    this.loading = true;
    this.authenticationService(this.f.username.value, this.f.password.value)

      .subscribe(
        (data: any) => {
 this.tracklog.handleSuccess1(this.description="User login in the site ",this.Action="Login",JSON.stringify(data),this.RequestUrl,this.PageUrl,this.Guid)

          //   alert()
 //this.tracklog.handleSuccess(this.description="User login in the site ",this.Action="Login",JSON.stringify(data))
          // set it in an HTTP Only + Secure Cookie
          //data.cookie("SESSIONID", data.token, {httpOnly:true, secure:true});

          sessionStorage.setItem('token', data.Token)
          sessionStorage.setItem('refreshToken', data.refreshToken)
          localStorage.setItem('IsSubscribed', data.IsSubscribed)
          this.Id = JSON.stringify(data['id'])
          this.roleId = JSON.stringify(data['roleId'])
          this.UserName = data['username']
          this.validUser = this.Id as number
          if (this.validUser == 0) {
            var lang = localStorage.getItem('browseLang')
            if (data.message == "Invalid password!") {
          this.tracklog.handleError2("invalido password",this.Action="Login",this.RequestUrl,this.PageUrl,this.Guid)

              if (lang == 'english') {
                this.toster.warning(data.message);
              } else {
                this.toster.warning('invalido password!');
              }
            } else {
          this.tracklog.handleError2("Invalid email!",this.Action="Login",this.RequestUrl,this.PageUrl,this.Guid)

              if (lang == 'english') {

                this.toster.warning("Invalid email!");
              } else {
                this.toster.warning('invalido email!');
              }
            }

            this.loading = false;


          } else {

            if (this.roleId as number == 1) {
              this.service.CheckUserData(this.Id).subscribe(x => {
              //  this.tracklog.handleSuccess(this.description="Checked spinner data",this.Action="Spinner data checked",JSON.stringify(x))
                if (x != 1) {
                  if (JSON.parse(localStorage.getItem("Prize"))) {
                    var item = JSON.parse(localStorage.getItem("Prize"))
                    let model = {
                      SpinnerPromotionId: 0,
                      SpinCount: 1,
                      UserId: 0, MoodId: 0
                    }
                    model.UserId = this.Id
                    model.SpinnerPromotionId = item.Id
                    model.SpinCount = 1
                    model.MoodId = item.MoodId
                    this.service.saveSpinnerData(model).subscribe(x => {
               // this.tracklog.handleSuccess(this.description="Saved spinner data if user spinned without login and no spinner data",this.Action="Spinner data saved",JSON.stringify(x))

                      this.router.navigate(['/']);
                    })
                  } else {
                    this.router.navigate(['/']);
                  }
                } else {
                  this.router.navigate(['/']);
                }


              })
            } else if (this.roleId as number == 3) {
              this.router.navigate(['/admin/dashboard']);
            }
            else if (this.roleId as number == 2) {
              this.router.navigate(['/vendor/dashboard']);
            }
            else {
              //dont care
              this.router.navigate(['/']);


            }
            localStorage.setItem('UserId', this.Id);
            localStorage.setItem('UserName', this.UserName)
            localStorage.setItem('RoleId', this.roleId)
            this.date = new Date();
            localStorage.setItem('LogInDate', this.date);
            this.http.get('https://api.ipify.org/?format=json').subscribe(data => {

              this.ipAddress = data['ip']
              localStorage.setItem('IpAddress', this.ipAddress);
            })

          }

        },
        error => {
          this.alertService.error(error);
          this.loading = false;
      //    this.tracklog.handleError(error,this.Action="Login")
      this.tracklog.handleError1(error,this.Action="Login",this.RequestUrl,this.PageUrl,this.Guid)

        });
  }
  authenticationService(username: string, password: string) {
    //  alert(username+password)

    this.data.password = password;
    this.data.username = username;
    return this.http.post(this.url + "user/verifyUser", this.data)
  }
}

