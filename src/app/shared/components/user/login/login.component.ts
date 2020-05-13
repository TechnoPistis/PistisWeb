import { FormBuilder, FormGroup, Validators, NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../../guards/auth.service';
import { GlobalErrorHandlerService } from '../../../services/global-error-handler-service.service';
import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  errorMessage:string;
  constructor(
      private formBuilder: FormBuilder,
      private route: ActivatedRoute,
      private router: Router,
      private Auth : AuthService,
      private error: GlobalErrorHandlerService
  ){}
  
  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required,Validators.email]],
      password: ['', [Validators.required,Validators.minLength(8)]]
  });

  // get return url from route parameters or default to '/'
  this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';

    }
  
  ngAfterViewInit() {
    $('[name="front-style"]').attr('disabled', 'disabled');
    $('[name="admin-style"]').removeAttr('disabled');
    }

    get f() { return this.loginForm.controls; }

    onSubmit() {
        this.submitted = true;
  
        // stop here if form is invalid
        if (this.loginForm.invalid) {
            return;
        }
  
        this.loading = true;
        // this.authenticationService.login(this.f.username.value, this.f.password.value)
        //     .pipe(first())
        //     .subscribe(
        //         data => {
        //             this.router.navigate([this.returnUrl]);
        //         },
        //         error => {
        //             this.alertService.error(error);
        //             this.loading = false;
        //         });
        this.Auth.getUserDetails(this.f.email.value, this.f.password.value).subscribe(data => {
          if(data.success) {
            this.router.navigate(['admin'])
            this.Auth.setLoggedIn(true)
          }
           else {
            window.alert(data.message)
          }
        }),
        (error) => {
          
          this.error.handleError(error);
         
            }
        console.log(this.f.email.value, this.f.password.value)
  
    }
}
