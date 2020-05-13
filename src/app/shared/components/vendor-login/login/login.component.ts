
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { CommonService } from "../../../services/common.service";
import { UserLogService } from 'src/app/shared/services/user-log.service';
import { AlertService } from '../../cust/customer-login/alert.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, AfterViewInit {
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
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
  constructor(

    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient,
    private toster: ToastrService,
    private alertService: AlertService,
    private userLog: UserLogService
  ) {

  }

  ngOnInit() {
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
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;

    this.authenticationService(this.f.username.value, this.f.password.value)

      .subscribe(
        (data: any) => {
            
          //sessionStorage.setItem('token', data.Token)
          //sessionStorage.setItem('refreshToken', data.refreshToken)
          //localStorage.setItem('IsSubscribed',data.IsSubscribed)
          this.Id = JSON.stringify(data['id'])
          this.roleId = JSON.stringify(data['roleId'])
          this.UserName = data['username']
          this.validUser = this.Id as number
          if (this.validUser == 0) {
            var lang = localStorage.getItem('browseLang')
            if (lang == 'english') {
              this.toster.warning('invalid User!');
            } else {
              this.toster.warning('usuario invalido!');
            }

            this.loading = false;


          } else {
              

            if (this.roleId as number == 2) {
              this.router.navigate(['/vendor/products']);
            } else {
              //dont care
              //this.router.navigate(['/']);
                

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
        });
  }
  authenticationService(username: string, password: string) {
    //  alert(username+password)
      
    this.data.password = password;
    this.data.username = username;
    return this.http.post(this.url + "vendor/verifyUser", this.data)
  }
  ngAfterViewInit() {
    $('[name="front-style"]').attr('disabled', 'disabled');
    $('[name="admin-style"]').removeAttr('disabled');
  }

}

