import { Component, OnInit, ViewChild } from "@angular/core";
import { FormGroup, Validators, FormBuilder } from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import { ActivatedRoute, Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { AlertService } from "../../cust/customer-login/alert.service";
import { CheckoutserviceService } from "../checkoutservice.service";
import { MycartService } from "../../mycart/mycart.service";
import { MessageService } from "src/app/shared/services/message.service";
import { CommonService } from "src/app/shared/services/common.service";
import { RegisterService } from "../../cust/customer-register/register.service";
import { GetCart } from "../../mycart/mycartModel";
import { TrackService } from "../../track-order/track.service";
import { Tracklog } from "src/app/shared/services/Tracklog.service";

@Component({
  selector: "app-checkout-login",
  templateUrl: "./checkout-login.component.html",
  styleUrls: ["./checkout-login.component.css"],
})
export class CheckoutLoginComponent implements OnInit {
  loginForm: FormGroup;
  submitted: boolean = false;
  loading: boolean = false;
  data = {
    username: null,
    password: null,
  };
  uri = new CommonService();
  url = this.uri.getUri();
  Id: any;
  roleId: any;
  UserName: any;
  validUser: number;
  date: any;
  ipAddress: any;
  UserId: any;
  registerDiv: boolean = false;
  checkoutDiv: boolean = true;
  cartItem: GetCart[] = [];
  totoalPrice: number;
  Promotiondiv: boolean = false;
  guestUser: boolean = false;
  description: string;
  Action: string;
  pageUrl: string;
  requestUrl: string;
  Guid: string;
  constructor(
    public registerService: RegisterService,
    private formBuilder: FormBuilder,
    private router: Router,
    private http: HttpClient,
    public alertService: AlertService,
    private toster: ToastrService,
    public _service: CheckoutserviceService,
    public service: MycartService,
    public messageService: MessageService,
    public tracklog: Tracklog
  ) {}

  ngOnInit() {
    this.Guid= this.tracklog.newGuid()
    this.pageUrl=  this.router.url.replace("/","")
    this.UserId = parseInt(window.localStorage.getItem("UserId"));
    this.ipAddress = window.localStorage.getItem("IpAddress");
    this.loginForm = this.formBuilder.group({
      username: ["", [Validators.required, Validators.email]],
      password: ["", Validators.required],
    });
    this.getcart();
  }

  getcart() {
    this.service.getCart(this.UserId, this.ipAddress).subscribe((data) => {
      this.cartItem = data as GetCart[];
      this.totoalPrice = 0;

      this.cartItem.forEach((element) => {
        if (+element.SellingPrice || +element.Quantity) {
          this.totoalPrice += Number(element.PriceAfterDiscount);
        } else {
          this.cartItem.splice(this.cartItem.indexOf(element), 1);
        }
      });
      this._service.checkUserData(this.cartItem[0].Id).subscribe((x) => {
        if (x == true) {
          this.Promotiondiv = true;
        }
      });
    });
  }
  get f() {
    return this.loginForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }
    this.loading = true;
    this.authenticationService(
      this.f.username.value,
      this.f.password.value
    ).subscribe(
      (data: any) => {
        this.Id = JSON.stringify(data["id"]);
        this.roleId = JSON.stringify(data["roleId"]);
        this.UserName = data["username"];
        localStorage.setItem("UserName", this.UserName);
        this.validUser = this.Id as number;
        if (this.validUser == 0) {
          var lang = localStorage.getItem("browseLang");
          if (data.message == "Invalid password!") {
            if (lang == "english") {
              this.toster.warning(data.message);
            } else {
              this.toster.warning("invalido password!");
            }
          } else {
            if (lang == "english") {
              this.toster.warning("Invalid email!");
            } else {
              this.toster.warning("invalido email!");
            }
          }

          ///
        }
        //applydiscount

        this.service.CheckUserData(this.Id).subscribe((x) => {
        //  this.tracklog.handleSuccess1(this.description="Checked spinner data",this.Action="Spinner data checked",JSON.stringify(x),this.requestUrl,this.pageUrl,this.Guid)

          if (x != 1) {
            if (JSON.parse(localStorage.getItem("Prize"))) {
              var item = JSON.parse(localStorage.getItem("Prize"));
              let model = {
                SpinnerPromotionId: 0,
                SpinCount: 1,
                UserId: 0,
                MoodId: 0,
              };
              model.UserId = this.Id;
              model.SpinnerPromotionId = item.Id;
              model.SpinCount = 1;
              model.MoodId = item.MoodId;
              //this.requestUrl="Spinner/SaveSpinUserData"
              //this.tracklog.handleSuccess1(this.description="Saved spinner data if user spinned without login and no spinner data",this.Action="Spinner data saved","Request",this.requestUrl,this.pageUrl,this.Guid)

              this.service.saveSpinnerData(model).subscribe((x) => {
                if (this.validUser == 0) {
                  var lang = localStorage.getItem("browseLang");
                  // if (data.message == "Invalid password!") {
                  //   if (lang == 'english') {
                  //     this.toster.warning(data.message);
                  //   } else {
                  //     this.toster.warning('invalido password!');
                  //   }
                  // } else {

                  //   if (lang == 'english') {
                  //     this.toster.warning("Invalid email!");
                  //   } else {
                  //     this.toster.warning('invalido email!');
                  //   }

                  // }

                  // ///
                } else {
                  //add mycart items to useraccount
                  this.service.updateuser(this.Id, "").subscribe();
                  if ((this.roleId as number) == 1) {
                    localStorage.setItem("UserId", this.Id);
                    localStorage.setItem("UserName", this.UserName);
                    var lang = localStorage.getItem("browseLang");
                    if (lang == "english") {
                      this.toster.success("Successfully logged in.");
                    } else {
                      this.toster.success("Logueado exitosamente.");
                    }

                    this.service.CheckUserData(this.Id).subscribe((x) => {
                      if (x != 1)
                        if (JSON.parse(localStorage.getItem("Prize"))) {
                          var item = JSON.parse(localStorage.getItem("Prize"));
                          let model = {
                            SpinnerPromotionId: 0,
                            SpinCount: 1,
                            UserId: 0,
                            MoodId: 0,
                          };
                          model.UserId = this.Id;
                          model.SpinnerPromotionId = item.Id;
                          model.SpinCount = 1;
                          model.MoodId = item.MoodId;
                          this.service.saveSpinnerData(model).subscribe((x) => {
                            // this.router.navigate(['/']);
                          });
                        }
                    });
                  }
                  localStorage.setItem("UserId", this.Id);
                  this.date = new Date();
                  localStorage.setItem("LogInDate", this.date);
                  this.http
                    .get("https://api.ipify.org/?format=json")
                    .subscribe((data) => {
                      this.ipAddress = data["ip"];
                      localStorage.setItem("IpAddress", this.ipAddress);
                    });
                  this.service
                    .updateuser(this.Id, this.ipAddress)
                    .subscribe((data) => {});

                  this.router.navigate(["/checkout-process/checkout"]);
                }
                //this.router.navigate(['/']);
              });
            }
          } else {
            if (this.validUser == 0) {
              var lang = localStorage.getItem("browseLang");
              if (data.message == "Invalid password!") {
                if (lang == "english") {
                  this.toster.warning(data.message);
                } else {
                  this.toster.warning("invalido password!");
                }
              } else {
                if (lang == "english") {
                  this.toster.warning("Invalid email!");
                } else {
                  this.toster.warning("invalido email!");
                }
              }

              ///
            } else {
              //add mycart items to useraccount
              this.service.updateuser(this.Id, "").subscribe();
              if ((this.roleId as number) == 1) {
                localStorage.setItem("UserId", this.Id);
                localStorage.setItem("UserName", this.UserName);
                var lang = localStorage.getItem("browseLang");
                if (lang == "english") {
                  this.toster.success("Successfully logged in.");
                } else {
                  this.toster.success("Logueado exitosamente.");
                }

                this.service.CheckUserData(this.Id).subscribe((x) => {
                  if (x != 1)
                    if (JSON.parse(localStorage.getItem("Prize"))) {
                      var item = JSON.parse(localStorage.getItem("Prize"));
                      let model = {
                        SpinnerPromotionId: 0,
                        SpinCount: 1,
                        UserId: 0,
                        MoodId: 0,
                      };
                      model.UserId = this.Id;
                      model.SpinnerPromotionId = item.Id;
                      model.SpinCount = 1;
                      model.MoodId = item.MoodId;
                      this.service.saveSpinnerData(model).subscribe((x) => {
                        // this.router.navigate(['/']);
                      });
                    }
                });
              }
              localStorage.setItem("UserId", this.Id);
              this.date = new Date();
              localStorage.setItem("LogInDate", this.date);
              this.http
                .get("https://api.ipify.org/?format=json")
                .subscribe((data) => {
                  this.ipAddress = data["ip"];
                  localStorage.setItem("IpAddress", this.ipAddress);
                });
              this.service
                .updateuser(this.Id, this.ipAddress)
                .subscribe((data) => {});

              this.router.navigate(["/checkout-process/checkout"]);
            }
          }
        });

        //end applydiscount
      },
      (error) => {
        this.alertService.error(error);
        this.loading = false;
      }
    );
  }
  authenticationService(username: string, password: string) {
    this.data.password = password;
    this.data.username = username;
    return this.http.post(this.url + "user/verifyUser", this.data);
  }
  ///forgot pwd start
  passwordCheck: boolean = false;
  confirmPass: boolean = false;
  passlen: boolean = false;
  enterPassAgain: boolean = false;
  Currentpass: any = "";
  display2 = "none";
  Newpass: any = "";
  ConfirmPass: any = "";
  otpValid: boolean = false;
  otpValidity: boolean = false;
  typeOtp: string = "";
  name: boolean = false;
  CurrentEmail: string = "";
  EmailFirst: boolean = false;
  otpFirst: boolean = false;
  FirstPassword: string = "";
  otpbutton: boolean = false;
  takeTheSalt(val: string) {
    this._service.checkTheSalt(val).subscribe((x) => {
      if (x == 0) {
        this.passwordCheck = true;
      } else {
        this.passwordCheck = false;
        this.otpFirst = true;
        this.otpbutton = false;
      }
    });
  }
  saltMixture(salt1: string) {
    if (this.FirstPassword.length > 0) {
      var str1: string = salt1;
      let res = str1.localeCompare(this.FirstPassword);
      if (res != 0) {
        this.confirmPass = true;
      } else {
        this._service.sendNewSalt(this.FirstPassword).subscribe((x) => {
          if (x == 1) {
            var lang = localStorage.getItem("browseLang");

            if (lang == "english") {
              this.toster.info("Password changed successfully!");
            } else {
              this.toster.info("Contraseña cambiada correctamente!");
            }

            this.resetPass();
            localStorage.removeItem("UserName");
            localStorage.removeItem("UserId");
            localStorage.removeItem("RoleId");
            this.display2 = "none";
            (<any>$("#myModal")).modal("hide");
          }
        });
      }
    } else {
      this.enterPassAgain = true;
    }
  }
  resetPass() {
    this.display2 = "block";
    this.Currentpass = "";
    this.CurrentEmail = "";
    this.Newpass = "";
    this.ConfirmPass = "";
    this.name = false;
    this.EmailFirst = false;
    this.otpFirst = false;
    this.otpValid = false;
    this.otpValidity = false;
    this.passwordCheck = false;
    this.confirmPass = false;
    this.passlen = false;
    this.enterPassAgain = false;
    this.typeOtp = "";
  }
  takeEmail(val) {
    var lang = localStorage.getItem("browseLang");

    if (val != "")
      this._service.checkemail1(val).subscribe((x: any) => {
        if (x == 0) {
          //this.toster.info("This email Id not registered");
          this.resetPass();

          if (lang == "english") {
            this.toster.info("This email Id not registered!");
          } else {
            this.toster.info(
              "Este ID de correo electrónico no está registrado!"
            );
          }
          (<any>$("#myModal")).modal("hide");
        } else {
          localStorage.setItem("UserId", x);
          if (lang == "english") {
            this.toster.info("Otp sent to your registered email id!");
          } else {
            this.toster.info(
              "Otp enviado a su ID de correo electrónico registrado!"
            );
          }

          this.otpbutton = true;
          this.EmailFirst = true;
        }
      });
  }
  clickModal() {
    (<any>$("#myModal")).modal("hide");
    localStorage.removeItem("UserId");

    localStorage.removeItem("UserName");
    localStorage.removeItem("RoleId");
    this.resetPass();
  }
  Salt(val: string) {
    this.FirstPassword = val;
    if (val.length > 6) {
      this.passlen = false;
    } else {
      this.passlen = true;
    }
  }

  //forgot pwd end

  ///Registeration
  onRegister() {
    this.registerService.registerForCheckout().subscribe(
      (res: any) => {
        if (res.ReturnCode == 0) {
          localStorage.setItem("UserId", res.Id);
          localStorage.setItem("UserName", res.FirstName);
          this.date = new Date();
          this.service.CheckUserData(res.Id).subscribe((x) => {
            if (x != 1) {
              if (JSON.parse(localStorage.getItem("Prize"))) {
                var item = JSON.parse(localStorage.getItem("Prize"));
                let model = {
                  SpinnerPromotionId: 0,
                  SpinCount: 1,
                  UserId: 0,
                  MoodId: 0,
                };
                model.UserId = res.Id;
                model.SpinnerPromotionId = item.Id;
                model.SpinCount = 1;
                model.MoodId = item.MoodId;
                //this.requestUrl="Spinner/SaveSpinUserData"
                //this.tracklog.handleSuccess1(this.description="Saved spinner data if user spinned without login and no spinner data",this.Action="Spinner data saved","Request",this.requestUrl,this.pageUrl,this.Guid)

                this.service.saveSpinnerData(model).subscribe((x) => {
                  var lang = localStorage.getItem("browseLang");
                  if (lang == "english") {
                    this.toster.success(res.ReturnMessage, "New UserCreated");
                  } else {
                    this.toster.success(
                      res.ReturnMessage,
                      "Nuevo usuario creado"
                    );
                  }

                  localStorage.setItem("LogInDate", this.date);
                  this.http
                    .get("https://api.ipify.org/?format=json")
                    .subscribe((data) => {
                      this.ipAddress = data["ip"];
                      localStorage.setItem("IpAddress", this.ipAddress);
                    });

                  this.router.navigate(["/checkout-process/checkout"]);
                });
              }
            } else {
              var lang = localStorage.getItem("browseLang");
              if (lang == "english") {
                this.toster.success(res.ReturnMessage, "New UserCreated");
              } else {
                this.toster.success(res.ReturnMessage, "Nuevo usuario creado");
              }

              localStorage.setItem("LogInDate", this.date);
              this.http
                .get("https://api.ipify.org/?format=json")
                .subscribe((data) => {
                  this.ipAddress = data["ip"];
                  localStorage.setItem("IpAddress", this.ipAddress);
                });

              this.router.navigate(["/checkout-process/checkout"]);
            }
          });
        } else {
          var lang = localStorage.getItem("browseLang");
          if (lang == "english") {
            this.toster.error(res.ReturnMessage, "Registered User");
          } else {
            this.toster.error(res.ReturnMessage, "Usuario Registrado");
          }
        }
      },
      (error) => {
        //this.error.handleError(error);
      }
    );
  }

  openRegister() {
    this.registerDiv = true;
    this.checkoutDiv = false;
  }
}
