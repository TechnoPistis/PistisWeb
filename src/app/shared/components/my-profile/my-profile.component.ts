import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ProfileService } from "./profile.service";
import { Router } from '@angular/router';
import { strictEqual } from 'assert';
import { stringify } from '@angular/compiler/src/util';
import { last } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { async } from '@angular/core/testing';
import { UserLogService } from '../../services/user-log.service';
import { Tracklog } from '../../services/Tracklog.service';
@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css']
})
export class MyProfileComponent implements OnInit {

  modal1: any = 'hide'
  UserId: number = +localStorage.getItem('UserId')
  Name: boolean = true
  Email: boolean = true
  Phone: boolean = true
  FirstName: string
  result: boolean = false
  MiddleName: string
  LastName: string
  EmailId: string
  PhoneNo: any
  EmailValid: boolean = false
  EmailValidLenght: boolean = false
  Password: any
  NewPassword: any
  CurrentPassword: any
  phoneValid: boolean = false
  phonelenght: boolean = false
  phone = /^[0-9]*$/;
  name: boolean = false
  otpValid: boolean = false
  otpValidity: boolean = false
  passwordCheck: boolean = false
  confirmPass: boolean = false
  passlen: boolean = false
  enterPassAgain: boolean = false
  Currentpass: any = ''
  Newpass: any = ''
  ConfirmPass: any = ''
  emailClick: boolean = false
  phoneClick: boolean = false
  re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  display = 'none';
  display2 = 'none';
  display1 = 'none';
  phoneNumber = 'none'
  typeOtp: string = ''
  UserName = localStorage.getItem('UserName')
  hidemainDiv: boolean = false;
  Url: string;
  description: string
  Action: string
  PageUrl:string
  RequestUrl:string
  Guid: string;
  constructor(private service: ProfileService,
    private Router: Router,
    private toster: ToastrService, private userLog: UserLogService,
    public tracklog: Tracklog
  ) { }



  ngOnInit() {
    this.Guid=this.tracklog.newGuid()
    this.Url = this.Router.url.replace("/","");
    this.PageUrl="profile"
   //this.Url = this.Router.url;
    this.userLog.UserLog(0, 1, this.Url, 1);

    this.UserId = +localStorage.getItem('UserId');
    if (this.UserId == undefined || this.UserId == null) {
      this.hidemainDiv = false
    } else {
      this.hidemainDiv = true
    }
    this.RequestUrl='Vendor/getCustomerdetails?Id='+this.UserId
    this.tracklog.handleSuccess1(this.description = "Getting customer details on profile page ", this.Action = "Customer details rendering", "Request",this.RequestUrl,this.PageUrl,this.Guid)

    this.service.getCustomer(this.UserId as number).subscribe((x: any) => {


      this.EmailId = x.EmailId ? x.EmailId : ''
      this.FirstName = x.FirstName ? x.FirstName : ''
      this.MiddleName = x.MiddleName ? x.MiddleName : ''
      this.LastName = x.LastName ? x.LastName : ''
      this.PhoneNo = x.PhoneNo ? x.PhoneNo : ''
      console.table(x)
      this.tracklog.handleSuccess1(this.description = "Getting customer details on profile page ", this.Action = "Customer details rendering", JSON.stringify(x),this.RequestUrl,this.PageUrl,this.Guid)
    },
      error => this.tracklog.handleError1(error, this.Action = "Customer details rendering",this.RequestUrl,this.PageUrl,this.Guid)

    );

  }

  openModal() {

    this.display = 'block';

  }
  onCloseHandled() {

    this.display = 'none';
    // this.PhoneNo=null
    this.UserId = +localStorage.getItem('UserId');
    if (this.UserId == undefined || this.UserId == null) {
      this.hidemainDiv = false
    } else {
      this.hidemainDiv = true
    }
    this.RequestUrl='Vendor/getCustomerdetails?Id='+this.UserId
    this.tracklog.handleSuccess1(this.description = "Getting updated customer details on profile page ", this.Action = "Customer details rendering", "Request",this.RequestUrl,this.PageUrl,this.Guid)

    this.service.getCustomer(this.UserId as number).subscribe((x: any) => {


      this.EmailId = x.EmailId ? x.EmailId : ''
      this.FirstName = x.FirstName ? x.FirstName : ''
      this.MiddleName = x.MiddleName ? x.MiddleName : ''
      this.LastName = x.LastName ? x.LastName : ''
      this.PhoneNo = x.PhoneNo ? x.PhoneNo : ''
      console.table(x)

      this.tracklog.handleSuccess1(this.description = "Getting updated customer details on profile page ", this.Action = "Customer details rendering", JSON.stringify(x),this.RequestUrl,this.PageUrl,this.Guid)
    },
      error => this.tracklog.handleError1(error, this.Action = "Customer details rendering",this.RequestUrl,this.PageUrl,this.Guid)

    );

  }

  onEdit() {

    this.Name = false

  }
  onSave(first: string, middle: string, last: string) {
    this.RequestUrl='user/changeUserName'
    this.tracklog.handleSuccess1(this.description = "User changed name  on profile page ", this.Action = "Name change profile page", "Request",this.RequestUrl=this.PageUrl,this.PageUrl,this.Guid)

    if (first.length > 0) {
      this.service.saveName(first, middle, last).subscribe(x => {
        if (x == 1) {
          this.toster.success("Name saved successfully.")
          this.name = false
          this.Name = true
        }
        this.tracklog.handleSuccess1(this.description = "User changed name  on profile page ", this.Action = "Name change profile page", JSON.stringify(x),this.RequestUrl=this.PageUrl,this.PageUrl,this.Guid)
      },
        error => this.tracklog.handleError1(error, this.Action = "Name change profile page",this.RequestUrl,this.PageUrl,this.Guid)
      )

    } else {
      this.name = true
    }

  }

  SaveModalEmail(Email: string, otp: string) {


  }
  getEmail(email: string) {
    // alert(email)
    let message = 0


    let UserId: any
    this.result = this.phone.test(String(email).toLowerCase());
    if (!this.result) {

      this.EmailValidLenght = true
      this.EmailValid = true
      this.toster.info("Please enter valid Email")
      message = 1
    }
    return message;
  }
  onEdit1() {
    this.Email = false
  }


  saveEmail(email: string) {

    this.display = 'block';
    this.emailClick = true
    this.phoneClick = false
    this.resetPass()
    let Emailenght = email.length
    let message = 0

    let UserId: any
    this.result = this.re.test(String(email).toLowerCase());
    if (!this.result) {
      if (Emailenght == 0) {
        this.EmailValidLenght = true
      }
      else { this.EmailValid = true }

      this.toster.info("Please enter valid Email")

      message = 1
    } else {
      var lang = localStorage.getItem("browseLang");

      if (lang == "english") {
        this.toster.info("Otp sent to your registered email id!");
      } else {
        this.toster.info("Otp enviado a su ID de correo electrónico registrado!");
      }
      let UserId=+localStorage.getItem('UserId');
      if(!UserId)
      UserId=0

      this.RequestUrl='user/generateOtp?userId='+UserId
      this.tracklog.handleSuccess1(this.description = "Otp sent to your email successfully on profile page", this.Action = "Otp sent on profile page ", "Request",this.RequestUrl,this.PageUrl,this.Guid)

      this.service.generateOtp(email).subscribe(
        x => {

          if (x == 1) {
            // this.toster.info("Otp sent to your email successfully")
            this.EmailValidLenght = false
            this.EmailValid = false

            this.Email = true
            this.tracklog.handleSuccess1(this.description = "Otp sent to your email successfully on profile page", this.Action = "Otp sent on profile page ", JSON.stringify(x),this.RequestUrl,this.PageUrl,this.Guid)
          }
        },
        error => this.tracklog.handleError1(error, this.Action = "Otp sent on profile page",this.RequestUrl,this.PageUrl,this.Guid)

      )
      // this.service.saveEmail(email).subscribe(x=>{
      //   this.toster.info("Otp sent to your email successfully")


      // })

    }
    return message;

  }
  changeEmail(email: string, otp: any, number: string) {

    if (otp.length > 0) {
      this.RequestUrl='user/changeEmail'
      this.tracklog.handleSuccess1(this.description = "Email changed by user on profile page ", this.Action = "Email changed on profile page", "Request",this.RequestUrl,this.PageUrl,this.Guid)

      this.service.saveEmail(email, otp, number).subscribe(x => {
        if (x == 1) {
          this.tracklog.handleSuccess1(this.description = "Email changed by user on profile page ", this.Action = "Email changed on profile page", JSON.stringify(x),this.RequestUrl,this.PageUrl,this.Guid)
          this.toster.success("Data updated successfully")

          this.onCloseHandled()
        }

        else {
          this.toster.warning("The OTP entered is incorrect.")
        }
      },
        error => this.tracklog.handleError1(error, this.Action = "Email changed on profile page",this.RequestUrl,this.PageUrl,this.Guid)
      )
    } else {
      this.otpValid = true
    }
  }

  onEdit3() {
    this.Phone = false
  }
  savePhone(phone: string) {

    this.display = 'block';

    this.emailClick = false
    this.phoneClick = true
    this.resetPass()
    let phoneLen = phone.length
    if (phoneLen > 0) {

      this.phonelenght = false
      this.result = this.phone.test(String(phone).toLowerCase());
      if (!this.result) {
        if (phoneLen == 0) {
          this.phonelenght = true
        }
        else { this.phoneValid = true }
      } else {
        var lang = localStorage.getItem("browseLang");
        let UserId=+localStorage.getItem('UserId');
        if(!UserId){
          UserId=0
        }
        this.tracklog.handleSuccess1(this.description = "Otp sent to your email successfully on profile page", this.Action = "Otp sent on profile page ", "Request",this.RequestUrl='user/generateOtp?userId='+UserId,this.PageUrl,this.Guid)

        if (lang == "english") {
          this.toster.info("Otp sent to your registered email id!");
        } else {
          this.toster.info("Otp enviado a su ID de correo electrónico registrado!");
        }
        this.service.generateOtp(phone).subscribe(
          x => {

            if (x == 1) {
              this.phonelenght = false
              this.phoneValid = false
              this.Phone = true
            } else {
              this.PhoneNo = null
            }
          })

      }
    } else {
      this.phonelenght = true
    }
  }
  logout() {
    this.tracklog.handleSuccess1(this.description = "User log out on profile page", this.Action = "User log out ", "Request",this.RequestUrl='/customer/UserLogin',this.PageUrl,this.Guid)

    this.modal1;
    localStorage.removeItem('UserName')
    localStorage.removeItem('UserId')
    this.Router.navigate(['/customer/UserLogin'])
  }
  takeTheSalt(val: string) {



    this.service.checkTheSalt(val).subscribe(x => {
      if (x == 0) {
        this.passwordCheck = true
      } else {
        this.passwordCheck = false
      }
    })


  }
  takeTheSalt1(val: string) {




    this.service.checkTheSalt(val).subscribe(x => {
      if (x == 0) {
        this.passwordCheck = true
      } else {
        this.passwordCheck = false
    let UserId=localStorage.getItem('UserId')

        this.RequestUrl='user/changeSalt1?UserId='+UserId+'&password='+val
        this.tracklog.handleSuccess1(this.description = "User Account deactivated successfully on profile page", this.Action = "User Account deactivated ", "Request",this.RequestUrl,this.PageUrl,this.Guid)

        this.service.checkTheSalt1(val).subscribe(x => {
          this.tracklog.handleSuccess1(this.description = "User Account deactivated successfully on profile page", this.Action = "User Account deactivated ", "deactivated",this.RequestUrl,this.PageUrl,this.Guid)

          this.toster.success("Account deactivated successfully");
          this.modal1
          //this.logout()
          this.Deactivate1()
          this.logout()
        },
          error => this.tracklog.handleError1(error, this.Action = "User Account deactivated",this.RequestUrl,this.PageUrl,this.Guid)
        )
      }
    })


  }
  Salt(val: string) {

    if (val.length > 6) {
      this.passlen = false
    } else {
      this.passlen = true
    }
  }
  saltMixture(salt1: string, salt2: string) {

    if (salt2.length > 0) {
      var str1: string = salt1;
      let res = str1.localeCompare(salt2)
      if (res != 0) {
        this.confirmPass = true
      } else {
    let UserId=localStorage.getItem('UserId')

        this.RequestUrl='user/saveSalt?UserId='+UserId+'&password='+salt2
        this.tracklog.handleSuccess1(this.description = "Password changed successfully on profile page", this.Action = "Password changed on profile page", "Request",this.RequestUrl,this.PageUrl,this.Guid)

        this.service.sendNewSalt(salt2).subscribe(x => {
          if (x == 1) {

            this.toster.success("Password changed successfully.")
            this.tracklog.handleSuccess1(this.description = "Password changed successfully on profile page", this.Action = "Password changed on profile page", JSON.stringify(x),this.RequestUrl,this.PageUrl,this.Guid)
            this.display2 = 'none';
            (<any>$('#myModal')).modal('hide');
          }
        },
          error => this.tracklog.handleError1(error, this.Action = "Password changed on profile page",this.RequestUrl,this.PageUrl,this.Guid)
        )
      }
    } else {
      this.enterPassAgain = true
    }
  }
  resetPass() {
    this.display2 = 'block';
    this.Currentpass = ''
    this.Newpass = ''
    this.ConfirmPass = ''
    this.name = false
    this.otpValid = false
    this.otpValidity = false
    this.passwordCheck = false
    this.confirmPass = false
    this.passlen = false
    this.enterPassAgain = false
    this.typeOtp = ''
  }
  Deactivate() {
    this.display1 = 'block'
  }
  Deactivate1() {
    this.display1 = 'none'
  }
}
