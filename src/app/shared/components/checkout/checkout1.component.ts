import { Component, OnInit, ViewChild, AfterViewChecked, AfterViewInit } from "@angular/core";
import {
  FormBuilder,
  Validators,
  FormGroup,
  FormControl,
  AbstractControl
} from "@angular/forms";
import { ActivatedRoute, Router, Data } from "@angular/router";
import { HttpClient, HttpParams } from "@angular/common/http";
import { AlertService } from "../cust/customer-login/alert.service";
import { ToastrService } from "ngx-toastr";
import { CommonService } from "../../services/common.service";
import { shippingervice } from "../manage-address/shipping.service";
import { shippingModel } from "../manage-address/shippingModel";
import { CheckoutserviceService } from "./checkoutservice.service";
import { shipping, LoginCheckout, CardData } from "./checkoutmodel";
import { MycartService } from "../mycart/mycart.service";
import { GetCart } from "../mycart/mycartModel";
import { ShippingGatewayService } from "../CommonServices/ShippingGateService";
import { UserService } from "../../services/user.service";
import { createtoken, getpaymentmethod, createEmiToken, installment } from "src/assets/js/custom";
import { HeaderComponent } from "../header/header.component";
import { MessageService } from "../../services/message.service";
import { JsonPipe, DatePipe } from "@angular/common";
import { NgxSpinnerService } from "ngx-spinner";
import { UserLogService } from '../../services/user-log.service';
declare let paypal: any;
@Component({
  selector: "app-checkout",
  templateUrl: "./checkout1.component.html",
  //styleUrls: ["./checkout.component.css"]
})
export class CheckoutComponent implements OnInit, AfterViewChecked {
  loginForm: FormGroup;
  appliedSpinner: boolean = false
  urlSearchParam = new HttpParams();
  loading = false;
  today = new Date();
  submitted = false;
  returnUrl: string;
  emiForm: FormGroup;
  emiPlans: any[] = [];
  cardData: CardData = new CardData()
  index: any;
  lastStep: boolean = false;
  addScript: boolean = false;
  paypalLoad: boolean = true;
  finalAmount: number = 1;
  enableSticky = true;
  Id: any;
  uri = new CommonService();
  url = this.uri.getUri();
  data = {
    username: null,
    password: null
  };
  date: any;
  currentDate: any;
  validUser: number;
  ipAddress: any;
  roleId: any;
  loggedIn: boolean;
  openLoginDiv: boolean;
  openBillingDiv: boolean = false;
  billingVisited: boolean = false;
  shippingVisited: boolean = false;
  UserId: number;
  IpAddress: any;
  shipping: shipping[] = [];
  Countries: any[];
  selectedAddressId: any;
  addAddressForm: any;
  CurrentYear: any;
  openOrderDiv: boolean;
  orderVisited: boolean = false;
  openPayDiv: boolean;
  newAddress: shippingModel;
  openAddressRegisterDiv: boolean;
  addAddressRegisterForm: boolean;
  SelectedValue: any = "";
  baseuri: string;
  UserName: any;
  paymentForm: FormGroup;
  cardlength: boolean;
  cvvlength: boolean;
  @ViewChild(HeaderComponent, { static: false }) headerData: HeaderComponent;
  method: string;
  openShipChargeDiv: boolean;
  openTcDiv: boolean;
  paymentstatus: string = "";
  billForm: any;
  addBillAddressForm: any;
  openBillingAddDiv: boolean;
  totalFinalAmount: number;
  IsExists: boolean = false;
  dateError: boolean = false;
  selectedDelivery: any = null;
  loading1: boolean = false;
  City: any;
  totoalPrice: any;
  CurrentUser: string;
  openEMIDiv: boolean;
  Url: string;
  env: string;
  promotionProducts: any[];
  Promotiondiv: any = false;
  scroll: boolean = false
  ApplyDiscount: boolean = false;
  checkedbill: boolean = false;
  terms: boolean = false;
  guestUser: boolean = false;
  emailRequired: boolean;
  isSelected: boolean=true;
  constructor(
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private userLog: UserLogService,
    private http: HttpClient,
    public alertService: AlertService,
    private toster: ToastrService,
    public _service: CheckoutserviceService,
    public service: MycartService,
    public _serviceShipping: shippingervice,
    public shipService: ShippingGatewayService,
    public messageService: MessageService,
    private spinner: NgxSpinnerService,
    //private checkLog:CheckoutLog,
    private datepipe: DatePipe
  ) { }

  ngOnInit() {
    localStorage.removeItem("plans");
    this.method = "";
    this.CurrentYear = new Date().getFullYear();
    this.addAddressForm = false;
    this.addBillAddressForm = false;
    this.getCountries();
    this.UserId = parseInt(window.localStorage.getItem("UserId"));
    this.CurrentUser = window.localStorage.getItem("UserName");
    this.IpAddress = window.localStorage.getItem("IpAddress");
    this.getcart();
    this.billForm = this.createBillFormGroup();
    if (this.UserId > 0) {
      this.loggedIn = true;
      this.openBillingDivfn();
    } else {
      this.openLoginDivfn();
    }
    this.loginForm = this.formBuilder.group({
      username: ["", [Validators.required, Validators.email]],
      password: ["", Validators.required]
    });
    this.IsEdit = false;
    this.shippingForm = this.createFormGroup();
    this.billForm = this.createBillFormGroup();
    this.shippingRegisterForm = this.createRegisterFormGroup();
    this.paymentForm = this.createPaymentFormGroup();
    this.emiForm = this.createEmiFormGroup();
    this.checkForUserBillAddress();
    this.Url = this.router.url;
    this.userLog.UserLog(this.productId, 1, this.Url, 1);
  }
  // ngAfterViewInit(){
  //  var log=new checkout()
  //  log.CartId=this.cartItem[0].Id
  //  log.UserId=+localStorage.getItem('UserId')
  //  log.IpAddress=localStorage.getItem('IpAddress')
  //  log.StartTime=new Date(this.datepipe.transform(new Date(),'MM-dd-yyyy HH:mm:ss'))
  //  log.Step="Opend Checkout page"
  //  log.ShippingCharges=0
  //  log.Pass=true
  //  log.Error=""
  // log.Action="Opened"

  //   this.checkLog.checkoutlog(log).subscribe()
  // }

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
      (data:any) => {
        this.Id = JSON.stringify(data["id"]);
        this.roleId = JSON.stringify(data["roleId"]);
        this.UserName = data["username"];
        localStorage.setItem('UserName', this.UserName)
        this.validUser = this.Id as number;
        if (this.validUser == 0) {
          ////
            var lang = localStorage.getItem('browseLang')
            if(data.message=="Invalid password!"){
            if (lang == 'english') {
              this.toster.warning(data.message);
            } else {
              this.toster.warning('invalido password!');
            }
          }else{
            if (lang == 'english') {
              this.toster.warning("Invalid email!");
            } else {
              this.toster.warning('invalido email!');
            }
          }
          
          ///
          
                  }
           
        else {
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

            this.getUserAddress();
            this.openBillingDivfn1();
          }
          localStorage.setItem("UserId", this.Id);
          this.date = new Date();
          localStorage.setItem("LogInDate", this.date);
          this.http
            .get("https://api.ipify.org/?format=json")
            .subscribe(data => {
              this.ipAddress = data["ip"];
              localStorage.setItem("IpAddress", this.ipAddress);
            });
          this.headerData.ngOnInit()
          this.method = "";
          this.service
            .updateuser(this.Id, this.ipAddress)
            .subscribe(data => { });
          this.getcart();
          this.ngOnInit();
        }
      },
      error => {
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
  getValue(data) {
    this.SelectedValue = data;
  }
  setMethod() {
    
    if (this.SelectedValue == "register") {
      this.method = "register";
      localStorage.removeItem("UserName");
      localStorage.removeItem("UserId");
      this.UserId = 0;
      this.headerData.ngOnInit()
      //this.getUserAddress();
      this.openAddAddressRegisterDivfn();
      this.loggedIn = true

    } else if (this.SelectedValue == "guest") {

      localStorage.removeItem("UserName");
      localStorage.removeItem("UserId");
      this.method = "guest";
      this.UserId = 0;
      this.headerData.ngOnInit()
      //this.getUserAddress();
      this.guestUser = true;
      this.openAddAddressguestDivfn();
      this.loggedIn = true
    } else {
      localStorage.removeItem("UserName");
      localStorage.removeItem("UserId");
      this.UserId = 0;
      this.headerData.ngOnInit()
      this.getUserAddress();
      this.getcart();
      this.loading = false;
      this.changeLogin1();
    }

    this.selectedBillAddressData = "";
    this.ShippingAddress = "";
    this.DeliveryDetail = "";
    this.ShippingCharges = [];
    this.oneShipcost = "";
    //     var log=new checkout()
    //  log.CartId=this.cartItem[0].Id
    //  log.UserId=+localStorage.getItem('UserId')
    //  log.IpAddress=localStorage.getItem('IpAddress')
    //  log.StartTime=new Date(this.datepipe.transform(new Date(),'MM-dd-yyyy HH:mm:ss'))
    //  log.Step="1-checkout method"
    //  log.ShippingCharges=0
    //  log.Pass=true
    //  log.Error=""
    // log.Action=this.SelectedValue+"-User"

    //   this.checkLog.checkoutlog(log).subscribe()
  }

  //changeloginbutton
  changeLogin1() {

    this.openLoginDiv = true;
    this.loggedIn = false;
    this.openBillingDiv = false;
    this.addAddressForm = false;
    this.orderVisited = false;
    this.shippingVisited = false;
    this.openOrderDiv = false;
    this.openPayDiv = false;
    this.addAddressRegisterForm = false;
    this.openShipDiv = false;
    this.openTCDiv = false;
  }
  changeLogin() {

    this.openLoginDiv = true;
    this.loggedIn = false;
    this.openBillingDiv = false;
    this.addAddressForm = false;
    this.orderVisited = false;
    this.shippingVisited = false;
    this.openOrderDiv = false;
    this.openPayDiv = false;
    this.addAddressRegisterForm = false;
    this.openShipDiv = false;
    this.openTCDiv = false;
    //     var log=new checkout()
    //  log.CartId=this.cartItem[0].Id
    //  log.UserId=+localStorage.getItem('UserId')
    //  log.IpAddress=localStorage.getItem('IpAddress')
    //  log.StartTime=new Date(this.datepipe.transform(new Date(),'MM-dd-yyyy HH:mm:ss'))
    //  //log.EndTime
    //  log.Step="1-checkout method"
    //  log.ShippingCharges=0
    //  log.Pass=true
    //  log.Error=""
    //   this.checkLog.checkoutlog(log).subscribe()

  }
  changeAddress() {

    if (this.loggedIn == true) {
      this.openBillingDiv = true;
      //this.openBillingDiv = false;
      this.openBillingAddDiv = false;
      this.addAddressForm = false;
      this.addAddressForm = false;
      this.openLoginDiv = false;
      this.loggedIn = true;
      this.orderVisited = false;
      this.shippingVisited = false;
      this.openOrderDiv = false;
      this.openPayDiv = false;
      this.openEMIDiv = false;
      this.addAddressRegisterForm = false;
      this.openShipDiv = false;
      this.openTCDiv = false;
    }
    else {

      this.toster.warning("Kindly choose one option from step 1");
    }
    // var log=new checkout()
    // log.CartId=this.cartItem[0].Id
    // log.UserId=+localStorage.getItem('UserId')
    // log.IpAddress=localStorage.getItem('IpAddress')
    // log.StartTime=new Date(this.datepipe.transform(new Date(),'MM-dd-yyyy HH:mm:ss'))
    // //log.EndTime
    // log.Step="2-delivery address"
    // log.ShippingCharges=0
    // log.Pass=true
    // log.Error=""
    // log.Action="open deliveryaddress"
    //  this.checkLog.checkoutlog(log).subscribe()
  }
  cancel() {

    this.openBillingDiv = true;
    this.addAddressForm = false;
    this.openLoginDiv = false;
    this.loggedIn = true;
    this.orderVisited = false;
    this.openOrderDiv = false;
    this.openPayDiv = false;
    this.openEMIDiv = false;
    this.addAddressRegisterForm = false;
    this.openShipDiv = false;
    this.openTCDiv = false;


  }
  changeOrder() {
    if (this.loggedIn == true) {
      if (this.ShippingCharges && this.ShippingCharges.length > 0) {
        this.openOrderDiv = true;
        this.openBillingDiv = false;
        this.addAddressForm = false;
        this.openLoginDiv = false;
        //this.loggedIn = true;
        this.orderVisited = false;
        this.openPayDiv = false;
        this.openEMIDiv = false;
        this.addAddressRegisterForm = false;
        this.openShipDiv = false;
        this.openTCDiv = false;
      }
    }
    else {

      //this.toster.warning("Kindly complete above step first.")
      var lang = localStorage.getItem("browseLang");
      if (lang == "english") {
        this.toster.warning("Kindly complete above step first.")
      } else {
        this.toster.warning("Por favor complete el paso anterior primero.")
      }
    }
  }
  ChangeDefaultAddress(Id) {
    this._service.changeDefaultAddress(Id).subscribe((result: boolean) => {
      if (result) {
        this.getUserAddress();
      }
    });
  }
  ShippingAddress: any;
  deliverHere(Id, action) {

    this.selectedAddressId = Id;
    this.ShippingAddress = this.shipping.filter(v => v.Id == Id)[0];
    if (action == 'skip')
      this.calculateCharges();
    else
      this.changeBillAddressDiv("")

    //  if(action=='skip')
    //     var log=new checkout()
    //  log.CartId=this.cartItem[0].Id
    //  log.UserId=+localStorage.getItem('UserId')
    //  log.IpAddress=localStorage.getItem('IpAddress')
    //  log.StartTime=new Date(this.datepipe.transform(new Date(),'MM-dd-yyyy HH:mm:ss'))
    //  log.Step="4-shipping charges"
    //  log.ShippingCharges=0
    //  log.Pass=true
    //  log.Error=""
    // log.Action="Use delivery address as billing"

    //   this.checkLog.checkoutlog(log).subscribe()


    //this.openShipDivfn();
    //this.openOrderDivfn();
  }

  setShippAddAsBillAddress() {
    this._service
      .setAsBillAddress(this.ShipAddressAsBillAddress)
      .subscribe((result: any) => {

        if (result) {
          if (this.UserBillAddress && this.UserBillAddress.length > 0) {
            var old = this.UserBillAddress.filter(b => b.Id == result.Id);
            if (!old) this.UserBillAddress.push(result);
          } else {
            this.UserBillAddress = [];
            this.UserBillAddress.push(result);
          }
          this.selectedBillAddressData = result;
          if (!this.UserId)
            window.localStorage.setItem(
              "guestAddress",
              JSON.stringify(this.selectedBillAddressData)
            );
        }
      });
  }

  AddAddress() {
    if (this.loggedIn == true) {
      this.addAddressForm = true;
      this.openLoginDiv = false;
      //this.loggedIn = true;
      this.orderVisited = false;
      this.openBillingDiv = false;
      this.openOrderDiv = false;
      this.openPayDiv = false;
      this.openEMIDiv = false;
      this.addAddressRegisterForm = false;
      this.openShipDiv = false;
      this.openTCDiv = false;
    }
    else {

      var lang = localStorage.getItem("browseLang");
      if (lang == "english") {
        this.toster.warning("Kindly complete above step first.")
      } else {
        this.toster.warning("Por favor complete el paso anterior primero.")
      }
    }
  }
  closeAddressForm() {
    this.addAddressForm = false;
    this.shippingRegisterForm.reset();
  }
  //openlogindiv
  openLoginDivfn() {
    this.openLoginDiv = true;
    this.loggedIn = false;
    this.openBillingDiv = false;
    this.openOrderDiv = false;
    this.openPayDiv = false;
    this.openEMIDiv = false;
    this.addAddressForm = false;
    this.addAddressRegisterForm = false;
    this.openTCDiv = false;
    this.openShipChargeDiv = false;
  }
  //openbillingdiv
  openBillingDivfn() {
    if (this.loggedIn) {
      this.openLoginDiv = false;
      this.billingVisited = true;
      //this.loggedIn = true;
      this.openShipDiv = false;
      this.openBillingDiv = true;
      this.openOrderDiv = false;
      this.openPayDiv = false;
      this.openEMIDiv = false;
      this.addAddressForm = false;
      this.addAddressRegisterForm = false;
      this.openTCDiv = false;
      this.UserId = parseInt(window.localStorage.getItem("UserId"));
      this.getUserAddress();
      this.openShipChargeDiv = false;
    }
    else {

      var lang = localStorage.getItem("browseLang");
      if (lang == "english") {
        this.toster.warning("Kindly complete above step first.")
      } else {
        this.toster.warning("Por favor complete el paso anterior primero.")
      }
    }
  }
  openBillingDivfn1() {
    if (this.loggedIn) {
      this.openLoginDiv = false;
      this.billingVisited = true;
      //this.loggedIn = true;
      this.openBillingDiv = true;
      this.openOrderDiv = false;
      this.openPayDiv = false;
      this.openEMIDiv = false;
      this.addAddressForm = false;
      this.addAddressRegisterForm = false;
      this.openTCDiv = false;
      this.UserId = parseInt(window.localStorage.getItem("UserId"));
      this.getUserAddress();
      this.openShipChargeDiv = false;
    }

  }
  //open newAddress
  openAddAddressDivfn() {
    if (this.loggedIn) {
      this.openLoginDiv = false;
      this.billingVisited = false;
      //this.loggedIn = true;
      this.openBillingDiv = true;
      this.openOrderDiv = false;
      this.openPayDiv = false;
      this.openEMIDiv = false;
      this.addAddressForm = true;
      this.addAddressRegisterForm = false;
      this.openShipChargeDiv = false;
      this.openTCDiv = false;
    }
    else {

      // this.toster.warning("Kindly complete above step first.")
    }
  }
  //open for guest user
  openAddAddressguestDivfn() {
    this.openLoginDiv = false;
    this.billingVisited = false;
    //this.loggedIn = true;
    this.openBillingDiv = true;
    this.openOrderDiv = false;
    this.openPayDiv = false;
    this.openEMIDiv = false;
    this.addAddressForm = true;
    this.CheckEmail(this.shippingForm.value.Email);
    this.addAddressRegisterForm = false;
    this.openShipChargeDiv = false;
    this.openTCDiv = false;

  }
  //open newAddress Register
  openAddAddressRegisterDivfn() {
    // if (this.loggedIn) {
    this.openLoginDiv = false;
    this.billingVisited = false;
    this.addAddressForm = true;
    this.openBillingDiv = true;
    this.openOrderDiv = false;
    this.openPayDiv = false;
    this.openEMIDiv = false;
    this.addAddressForm = false;
    this.addAddressRegisterForm = true;
    this.CheckEmail(this.shippingRegisterForm.value.Email);
    this.openShipChargeDiv = false;
    this.openTCDiv = false;

  }

  //open orderdiv
  openOrderDivfn() {
    if (this.loggedIn) {
      this.openLoginDiv = false;
      //this.loggedIn = true;
      this.orderVisited = true;
      this.openBillingDiv = false;
      this.openOrderDiv = true;
      this.openPayDiv = false;
      this.addAddressForm = false;
      this.addAddressRegisterForm = false;
      this.openShipDiv = false;
      this.openShipChargeDiv = false;
      this.openTCDiv = false;
    }
    else {

      var lang = localStorage.getItem("browseLang");
      if (lang == "english") {
        this.toster.warning("Kindly complete above step first.")
      } else {
        this.toster.warning("Por favor complete el paso anterior primero.")
      }
    }
    //   var log=new checkout()
    //   log.CartId=this.cartItem[0].Id
    //   log.UserId=+localStorage.getItem('UserId')
    //   log.IpAddress=localStorage.getItem('IpAddress')
    //   log.StartTime=new Date(this.datepipe.transform(new Date(),'MM-dd-yyyy HH:mm:ss'))
    //   log.Step="5-order summary"
    //   log.ShippingCharges=this.DeliveryDetail.ShipPrice
    //   log.Pass=true
    //   log.Error=""
    //  log.Action="opened order summary"

    //    this.checkLog.checkoutlog(log).subscribe()


    //this.getcart();
  }
  //openPayment
  openPayDivfn() {
    if (this.loggedIn) {
      this.openLoginDiv = false;
      //this.loggedIn = true;
      this.openBillingDiv = false;
      this.openOrderDiv = false;
      this.openPayDiv = true;
      this.openEMIDiv = false;
      //this.ngAfterViewChecked()
      this.addAddressForm = false;
      this.addAddressRegisterForm = false;
      this.openShipDiv = false;
      this.openShipChargeDiv = false;
      this.openTCDiv = false;
      
    }
    else {

      var lang = localStorage.getItem("browseLang");
      if (lang == "english") {
        this.toster.warning("Kindly complete above step first.")
      } else {
        this.toster.warning("Por favor complete el paso anterior primero.")
      }
    }
  }
  //openEMIPlans
  openEmiDivfn() {

    this.openLoginDiv = false;
    //this.loggedIn = true;
    this.openBillingDiv = false;
    this.openOrderDiv = false;
    this.openPayDiv = false;
    this.openEMIDiv = true;
    //this.ngAfterViewChecked()
    this.addAddressForm = false;
    this.addAddressRegisterForm = false;
    this.openShipDiv = false;
    this.openShipChargeDiv = false;
    this.openTCDiv = false;
  }
  getUserAddress() {
    if (isNaN(this.UserId)) {
      this.UserId = 0;
    }
    this._service
      .getUserAddress(this.UserId, this.IpAddress)
      .subscribe((result: shipping[]) => {

        this.shipping = [];
        if (result) {
          this.shipping = result;
        }
      });
  }
  goToPayment() {
    this.openPayDivfn();
  }
  //Add Shipping Address
  shippingForm: any;
  shippingRegisterForm: any;
  NewAddress: boolean;
  IsEdit: boolean;
  States: any[] = [];
  UserAddress: shippingModel[] = [];

  createFormGroup() {
    return new FormGroup({
      Id: new FormControl(""),
      Name: new FormControl("", [Validators.required]),
      UserId: new FormControl(""),
      IpAddress: new FormControl(""),
      //Address: new FormControl('', [Validators.required]),
      PhoneNo: new FormControl("", [
        Validators.required,
        Validators.pattern("^[0-9]*$")
      ]),
      Pincode: new FormControl("", [Validators.required]),
      City: new FormControl(""),
      State: new FormControl("", [Validators.required]),
      LandMark: new FormControl(""),
      //CountryId: new FormControl('', [Validators.required]),
      AddressType: new FormControl("", [Validators.required]),
      //AlternatePhoneNo: new FormControl('', [Validators.pattern("^[0-9]*$")]),
      Street: new FormControl("", [Validators.required]),
      Street1: new FormControl(""),
      Street2: new FormControl(""),
      InteriorNumber: new FormControl(""),
      OutsideNumber: new FormControl(""),
      Colony: new FormControl(""),
      asBillAddress: new FormControl("")
    });
  }
  onSubmitShipping() {
    
    this.spinner.show();
    if (this.emailRequired && this.guestUser && this.shippingForm.valid) {
      var lang = localStorage.getItem("browseLang");
      if (lang == "english") {
        this.toster.error("Email required.")
      } else {
        this.toster.error("Email requerido!");
      }

    }
    if (!this.shippingForm.valid) {
      var lang = localStorage.getItem("browseLang");
      if (lang == "english") {
        this.toster.error("Fill address correctly!");
      } else {
        this.toster.error("Rellene la dirección correctamente!");
      }
      this.shippingForm.reset();
      return false;
    }
    var model = this.shippingForm.value;
    model.UserId = this.UserId;
    model.IpAddress = this.IpAddress;
    if (this.IsEdit == false) {
      if (!model.Id) model.Id = 0;
      this._serviceShipping.addShipAddress(model).subscribe((data: any) => {

        if (this.shipping.length > 0) {
          this.shipping.push(data);
          this.selectedAddressId = data.Id;
          if (this.ShipAddressAsBillAddress)
            this.changeBillAddressDiv('skip')
          else
            this.changeBillAddressDiv('')
        } else {
          this.shipping = [];
          this.shipping.push(data);
          this.selectedAddressId = data.Id
          if (this.ShipAddressAsBillAddress)
            this.changeBillAddressDiv('skip')
          else
            this.changeBillAddressDiv('')
        }
        if (data.Id > 0) {
          this._service
            .changeDefaultAddress(data.Id)
            .subscribe((result: boolean) => {

              if (result) {
                if (this.ShipAddressAsBillAddress)
                  this.deliverHere(data.Id, 'skip');
                else {
                  this.deliverHere(data.Id, '')
                  this.spinner.hide();
                }
                //this.openBillingDivfn();

                if (model.asBillAddress) {
                  this.checkAsBillAddress(data.Id);
                }

              }
            });
        }
      });
    }
    if (this.IsEdit == true) {
      this._serviceShipping.updateShipAddress(model).subscribe((data: any) => {
        if (data.Id > 0) {
          var lang = localStorage.getItem("browseLang");
          if (lang == "english") {
            this.toster.success("Address updated successfully!");
          } else {
            this.toster.success("Dirección actualizada con éxito!");
          }

          this.checkForUserAddress();
          this.NewAddress = false;
          this.shippingForm.reset();
        }
      });
    }
  }
  //AddressRegister
  createRegisterFormGroup() {
    return new FormGroup(
      {
        Id: new FormControl(""),
        Name: new FormControl("", [Validators.required]),
        UserId: new FormControl(""),
        IpAddress: new FormControl(""),
       // Address: new FormControl("", [Validators.required]),
        PhoneNo: new FormControl("", [
          Validators.required,
          Validators.pattern("^[0-9]*$")
        ]),
        Pincode: new FormControl("", [Validators.required]),
        City: new FormControl(""),
        State: new FormControl("", [Validators.required]),
        LandMark: new FormControl(""),
        //CountryId: new FormControl('', [Validators.required]),
        AddressType: new FormControl("", [Validators.required]),
        AlternatePhoneNo: new FormControl("", [Validators.pattern("^[0-9]*$")]),
        Email: new FormControl("", [Validators.required, Validators.email]),
        Password: new FormControl("", [
          Validators.required,
          Validators.minLength(6)
        ]),
        ConfirmPassword: new FormControl("", Validators.required),
        asBillAddress: new FormControl(""),
        Street: new FormControl("", [Validators.required]),
        Street1: new FormControl(""),
        Street2: new FormControl(""),
        InteriorNumber: new FormControl(""),
        OutsideNumber: new FormControl(""),
        Colony: new FormControl("")
      },
      this.passwordConfirming
    );
  }

  passwordConfirming(c: AbstractControl): { invalid: boolean } {
    if (c.get("Password").value !== c.get("ConfirmPassword").value) {
      return { invalid: true };
    }
  }

  getmail(email) {
    if (email)
      this.emailRequired = false;
    else
      this.emailRequired = true;
  }
  CheckEmail(email) {
    this._service.checkemail(email).subscribe(data => {
      if (data) {
        var lang = localStorage.getItem("browseLang");
        if (lang == "english") {
          this.toster.error("this email already exists");
        } else {
          this.toster.error("Ya existe Este email");
        }

        this.IsExists = true;
        if (this.guestUser == false) {
          this.shippingRegisterForm.valid = false;

        }
      } else {
        this.IsExists = false;
      }
    });
  }

  onSubmitShippingRegister() {

    this.spinner.show();
    var model = this.shippingRegisterForm.value;
    this.CheckEmail(model.Email);
    if (!this.shippingRegisterForm.valid) {
      var lang = localStorage.getItem("browseLang");
      if (lang == "english") {
        this.toster.error("Fill All required Fields!");
      } else {
        this.toster.error("Rellene todos los campos obligatorios!");
      }

      return false;
    }
    var model = this.shippingRegisterForm.value;
    this.CheckEmail(model.Email);
    model.UserId = this.UserId;
    model.IpAddress = this.IpAddress;
    //Register
    var body = {
      FirstName: model.Name.split("")[0],
      //MiddleName:model.Name.split('')[1],
      LastName: model.Name.split("")[1],
      Email: model.Email,
      Phone: model.Phone,
      Password: model.Password
    };
    this._service.registerUser(body).subscribe((data: any) => {
      model.UserId = data.Id;
      if (this.IsEdit == false) {
        if (!model.Id) model.Id = 0;
        this._serviceShipping.addShipAddress(model).subscribe((data: any) => {
          if (this.shipping.length > 0) {
            this.shipping.push(data);
          } else {
            this.shipping = [];
            this.shipping.push(data);
          }
          if (data.Id > 0) {
            this._service
              .changeDefaultAddress(data.Id)
              .subscribe((result: boolean) => {
                if (result) {
                  //this.deliverHere(data.Id);
                  this.openShipDivfn();
                  if (model.asBillAddress.checked) {
                    this.checkAsBillAddress(data.Id);
                  }
                }
              });
          }
        });
      }
    });
    if (this.IsEdit == true) {
      this._serviceShipping.updateShipAddress(model).subscribe((data: any) => {
        if (data.Id > 0) {
          var lang = localStorage.getItem("browseLang");
          if (lang == "english") {
            this.toster.success("Address updated successfully!");
          } else {
            this.toster.success("Address updated successfully!");
          }

          this.checkForUserAddress();
          this.NewAddress = false;
          this.shippingForm.reset();
        }
      });
    }
    this.headerData.ngOnInit()
  }
  //end AddressRegister
  checkForUserAddress() {
    this._service
      .getUserAddress(this.UserId, this.IpAddress)
      .subscribe((result: shippingModel[]) => {
        if (result) {
          this.UserAddress = [];
          this.UserAddress = result;
        }
      });
  }
  getCountries() {
    this._serviceShipping.getCountry().subscribe((data: any[]) => {
      this.Countries = [];
      this.Countries = data;
    });
  }

  getState(value: any) {
    this._serviceShipping.getState(value).subscribe((data: any[]) => {
      this.States = [];
      this.States = data;
    });
  }
  //End of Add shipping Address
  //mycart
  cartItem: GetCart[] = [];
  saveForLater(VariantId: number, CartItemId: any) {
    this.service.getProductDetails1(VariantId).subscribe(data => { });
    this.removeItem(CartItemId);
  }

  removeItem(CartItemId: number) {
    this.service.removeItem(CartItemId).subscribe(data => {
      this.getcart();
      this.ngOnInit();
      this.shippingRegisterForm.reset();
    });
  }
  increment(q, Id) {
    let quantity = q + 1;
    this.service.updateQuantity(quantity, Id).subscribe(data => {
      this.getcart();
    });
  }
  decrement(q, Id) {
    let quantity = q - 1;
    this.service.updateQuantity(quantity, Id).subscribe(data => {
      this.getcart();
    });
  }

  getcart() {
    this.service.getCart(this.UserId, this.IpAddress).subscribe(data => {

      this.cartItem = data as GetCart[];
      this.totoalPrice = 0;

      this.cartItem.forEach(element => {
        if ((+element.SellingPrice || +element.Quantity)) {
          this.totoalPrice += Number(element.PriceAfterDiscount);
        } else {
          this.cartItem.splice(this.cartItem.indexOf(element), 1)
        }
      });
      this._service.checkUserData(this.cartItem[0].Id).subscribe(x => {

        if (x == true) {

          this.Promotiondiv = true
        }
      })
    });
  }
  //end mycart
  //Payment
  loginModel: LoginCheckout = new LoginCheckout();
  pay() {
    //logincheckout


    this.loginModel.Shipping = this.ShippingAddress;

    this.loginModel.CustomerId = this.UserId == null ? 0 : this.UserId;
    this.loginModel.BillingAddressId = this.selectedBillAddressData.Id;
    this.loginModel.IpAddress = this.IpAddress;
    this.loginModel.SelectedShippingId = this.selectedAddressId;
    //  this.loginModel.Shipping = this.newAddress;
    this.loginModel.Cart = this.cartItem;
    this.loginModel.ShippingType = this.DeliveryDetail.DeliveryType;
    this.loginModel.ShippingPrice = this.DeliveryDetail.ShipPrice;
    this.loginModel.DeliveryDate = this.DeliveryDetail.DeliveryDate;
    this.loginModel.PaymentId = localStorage.getItem("PaymentId");
    this.loginModel.TotalPrice = this.totoalPrice

    if (!this.loginModel.PaymentId) {
      this.loginModel.PaymentId = this.PaymentTransaction.paymentID
    }
    //  this.loginModel.OrderId=this.PaymentTransaction.orderID

    localStorage.removeItem("PaymentId");
    this._service.addCheckout(this.loginModel).subscribe(data => {
      this.loginModel.OrderId = data
      this.loginModel.Status = this.paymentstatus;
      if (this.ShippingAddress == null) {
        this._serviceShipping
          .getById(this.selectedAddressId)
          .subscribe(data => {
            this.loginModel.Shipping = data as shippingModel;
          });
      }
      var lang = localStorage.getItem("browseLang");
      if (lang == "english") {
        this.toster.success("Your order placed successfully.");
      } else {
        this.toster.success("Su pedido se realizó con éxito.");
      }

      this.spinner.hide();
      this.sendMessage();
      this._service.SendDetailsToUsers(this.loginModel).subscribe();
      this._service.SendDetailsTopranjal(this.loginModel).subscribe();

      // if(window.location.href.includes("pistis"))
      this._service.SendDetailsToVendor(this.loginModel).subscribe();

    });
  }
  sendMessage(): void {
    // send message to subscribers via observable subject
    this.messageService.sendMessage(this.loginModel);

    this.router.navigate(["/confirmation"]);
  }

  clearMessage(): void {
    // clear message
    this.messageService.clearMessage();
  }

  //endpayment

  openShipDivfn() {
    if (this.loggedIn) {
      this.openLoginDiv = false;
      //this.loggedIn = true;

      this.orderVisited = false;
      this.openBillingDiv = false;
      this.openOrderDiv = false;
      this.openPayDiv = false;
      this.addAddressForm = false;
      this.addAddressRegisterForm = false;
      this.openShipDiv = true;
      this.shippingVisited = true;
      this.openTCDiv = false;
      var index = this.ShippingCharges.indexOf(this.DeliveryDetail);
      $("#ShipCost_" + index).attr('checked', 'checked');


    }
    else {

      var lang = localStorage.getItem("browseLang");
      if (lang == "english") {
        this.toster.warning("Kindly complete above step first.")
      } else {
        this.toster.warning("Por favor complete el paso anterior primero.")
      }
    }
    //     var log=new checkout()
    //  log.CartId=this.cartItem[0].Id
    //  log.UserId=+localStorage.getItem('UserId')
    //  log.IpAddress=localStorage.getItem('IpAddress')
    //  log.StartTime=new Date(this.datepipe.transform(new Date(),'MM-dd-yyyy HH:mm:ss'))
    //  log.Step="4-shipping charges"
    //  log.ShippingCharges=0
    //  log.Pass=true
    //  log.Error=""
    // log.Action="Opened shipping "

    //   this.checkLog.checkoutlog(log).subscribe()
  }

  //--charges shipping
  openShipDiv: any;
  PostalCode: any;
  productId: any;
  VariantDetailId: any;
  ShippingCharges: any;
  isShipError: boolean = false;
  ShippingError: any;
  Quantity: any;
  DeliveryDetail: any;
  shippEmail: any;
  shippedAddress: any;

  calculateCharges() {

    this.openLoginDiv = false;
    //this.loggedIn = true;
    this.orderVisited = false;

    this.openBillingDiv = false;
    this.openBillingAddDiv = false;
    this.openOrderDiv = false;
    this.openPayDiv = false;
    this.addAddressForm = false;
    this.addAddressRegisterForm = false;
    this.openTCDiv = false;
    this.openShipDiv = false;
    if (!this.cartItem || this.cartItem.length <= 0) {
      this.spinner.hide();
      this.toster.clear();
      var lang = localStorage.getItem("browseLang");
      if (lang == "english") {
        this.toster.error("Add some products first!");
      } else {
        this.toster.error("Agregue algunos productos primero!");
      }
      return false;
    }
    this.shippedAddress = this.shipping.filter(
      b => b.Id == this.selectedAddressId
    )[0];
    this.PostalCode = this.shippedAddress.Pincode;
    this.City = this.shippedAddress.City;
    this.openShipDiv = true;
    this.shippingVisited = true;
    this.productId = [];
    this.cartItem.forEach(element => {
      this.productId.push(element.ProductId);
    });

    this.VariantDetailId = [];
    this.cartItem.forEach(element => {
      this.VariantDetailId.push(element.ProductVariantDetailId);
    });

    this.Quantity = [];
    this.cartItem.forEach(element => {
      this.Quantity.push(element.Quantity);
    });

    this.shippEmail = this.shippedAddress.Email;
    if (!this.cartItem[0].ShipmentVendor)
      this.checkCharges();
    else {

      this.currentDate = new Date();
      this.currentDate.setDate(this.currentDate.getDate() + this.cartItem[0].ShipmentTime);

      var data = {
        DeliveryDate: this.currentDate,
        ShipPrice: this.cartItem[0].ShipmentCost,
        DeliveryType: "Shipment by Vendor",
      }
      this.ShippingCharges = [];
      this.ShippingCharges.push(data)
    }

  }

  oneShipcost: any;

  checkCharges() {
    this.spinner.show();
    if (this.PostalCode) {
      var model = {
        CountryCode: "MX",
        Postalcode: this.PostalCode,
        productId: this.productId.join(","),
        variantId: this.VariantDetailId.join(","),
        quantity: this.Quantity.join(","),
        city: this.City
      };
      this.shipService.CalculateCharges(model).subscribe((data: any) => {
        
        this.spinner.hide();
        if (data.length > 0) {
          this.ShippingCharges = data;
          this.isShipError = false;
          this.ShippingError = null;
          this.openBillingDiv = false;
        } else {
          
          var lang = localStorage.getItem("browseLang");
      if (lang == "english") {
        this.toster.warning("! Please enter a valid pincode.")
      } else {
        this.toster.warning("Por favor, introduzca un código PIN válido.")
      }
          this.openBillingDivfn();
          // if (data && data.Note === "Failure" && data.Note.Message)
          //  {
          //   this.ShippingError = data;
          //   this.ShippingError.Message = this.ShippingError.Message.split(".")[0] + ".";
          //   this.isShipError = true;
          //   this.ShippingCharges = [];
          //  }
        }
      });
    }
  }

  // addTaxToPrice(shipIndex: any) {
  //     
  //   this.DeliveryDetail = this.ShippingCharges[shipIndex];
  //   this.totalFinalAmount = +(this.finalAmount + parseFloat(this.DeliveryDetail.ShipPrice)).toFixed(2);
  //   this.DeliveryDetail.DeliveryDate;
  //   this.selectedDelivery=shipIndex;
  //   this.openOrderDivfn();
  // }

  addTaxToPrice() {

    //if (this.oneShipcost != "checked")
    var shipprice = this.DeliveryDetail.ShipPrice
    this.totoalPrice = +((
      +this.cartItem[0].TotalAmount + parseFloat(shipprice)
    ).toFixed(2));
    //this.oneShipcost = "checked";
    //   var log=new checkout()
    //   log.CartId=this.cartItem[0].Id
    //   log.UserId=+localStorage.getItem('UserId')
    //   log.IpAddress=localStorage.getItem('IpAddress')
    //   log.StartTime=new Date(this.datepipe.transform(new Date(),'MM-dd-yyyy HH:mm:ss'))
    //   log.Step="4-shipping charges"
    //   log.ShippingCharges=this.DeliveryDetail.ShipPrice
    //   log.Pass=true
    //   log.Error=""
    //  log.Action="Selected shipprice"

    //    this.checkLog.checkoutlog(log).subscribe()

  }
  Continueship() {
    if(this.isSelected==false)
    this.openOrderDivfn();
    else
    {
    var lang = localStorage.getItem("browseLang");
      if (lang == "english") {
        this.toster.warning("Select one option.")
      } else {
        this.toster.warning("seleccione una opción.")
      }
    }
  }

  setShipAddress(event: any, shipIndex: any) {

    this.DeliveryDetail = this.ShippingCharges[shipIndex];
if(this.DeliveryDetail)
this.isSelected=false;
else
this.isSelected=true;
    this.addTaxToPrice()


  }

  openTCDiv: any = false;
  AcceptTC: any;
  openTc() {
    if (
      this.ShippingCharges &&
      this.ShippingCharges.length > 0 &&
      this.selectedBillAddressData
    ) {
      this.openLoginDiv = false;
      //this.loggedIn = true;
      this.orderVisited = false;
      this.openBillingDiv = false;
      this.openOrderDiv = false;
      this.openPayDiv = false;
      this.addAddressForm = false;
      this.addAddressRegisterForm = false;
      this.openShipDiv = false;
      this.openTCDiv = true;
      this.openTCDiv = true;
      this.openBillingAddDiv = false;
    }
  }

  // acceptTC(ev: any) {
  //   if (ev) {
  //     this.openPayDivfn();
  //     $('#acceptTC').show();
  //   } else this.openTc();
  // }
  fun(e: any) {
    if (e.target.checked)
      this.terms = true;
    else
      this.terms = false;
  }
  acceptTC() {
    if(this.terms)
    this.openPayDivfn();
    else
    {
    var lang = localStorage.getItem("browseLang");
      if (lang == "english") {
        this.toster.warning("Please check the terms and condition box.")
      } else {
        this.toster.warning("Por favor marque los términos y condiciones de la casilla.")
      }
    }
  }
  goTOTermsAndConditions() {
    this.router.navigate(["/terms"]);
  }

  createPaymentFormGroup() {
    return new FormGroup({
      email: new FormControl("", [Validators.required]),
      cardNumber: new FormControl("", [
        Validators.required,
        Validators.minLength(12),
        Validators.maxLength(16)
      ]),
      securityCode: new FormControl("", [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(3)
      ]),
      cardExpirationMonth: new FormControl("", [Validators.required]),
      cardExpirationYear: new FormControl("", [Validators.required]),
      cardholderName: new FormControl("", [Validators.required]),
      paymentMethodId: new FormControl(""),
      token: new FormControl(""),
      Amount: new FormControl(""),
      UserId: new FormControl(""),
      CartId: new FormControl(""),
      cardNumberToshow: new FormControl("")
    });
  }

  onPaymentSubmit(data: any) {

    this.checkDate();
    if (this.dateError) return false;
    // this.loading1 = true
    if (data.cardExpirationYear == "2020") {
      data.cardExpirationYear = new Date();
    }
    this.spinner.show();
    data.cardExpirationYear = data.cardExpirationYear.getFullYear();
    data.UserId = this.UserId;
    data.CartId = this.cartItem[0].Id;
    data.Description = "";
    if (this.cartItem.length > 0) { //data.Amount = this.cartItem[0].TotalAmount;
      data.Amount = this.totoalPrice
      var arr: any[] = [];
      this.cartItem.forEach(e => {

        arr.push(e.Name)

      });
      data.Description = arr.join(',');


    }
    getpaymentmethod(data.cardNumber);
    createtoken(data);
    this.getPaymentStatus();
    //this.pay();
  }
  getPaymentStatus() {
    this.paymentstatus = localStorage.getItem("PaymentStatus");
    localStorage.setItem("PaymentStatus", "");
    if (
      this.paymentstatus == "" ||
      this.paymentstatus == undefined ||
      this.paymentstatus == null
    ) {
      setTimeout(() => {
        this.getPaymentStatus();
      }, 5000);
      this.loading1 = false;
    } else {
      if (this.paymentstatus == "accredited") {
        this.loading1 = true;

        this.pay();
      } else {
        this.loginModel.Status = this.paymentstatus;
        this.sendMessage();
      }
    }
  }

  flag: any = false;
  oldNumber: any;
  callength(cardno: any) {

    if (cardno.length >= 1) {
      if (cardno.length >= 12 && cardno.length < 17) {
        this.cardlength = false;
      } else this.cardlength = true;
    }
  }
  cvvcallength(cvvno: any) {
    if (cvvno.length == 3) this.cvvlength = false;
    else this.cvvlength = true;
  }

  onOpenCalendar(container) {
    container.yearSelectHandler = (event: any): void => {
      container._store.dispatch(container._actions.select(event.date));
    };
    container.setViewMode("year");
  }

  ExpirationMonth: any;
  initial: any = 1;
  checkDate() {
    var yr = this.CurrentYear;
    var mnth = this.ExpirationMonth;
    if (this.initial > 1) {
      yr = this.CurrentYear.getFullYear();
    }
    this.initial = 2;


    let date = new Date();
    let month = date.getMonth();
    let year = date.getFullYear();
    if (+yr < year) {
      this.dateError = true;
    } else {
      this.dateError = false;
    }
    if (+yr >= year) {
      if (+yr == year) {
        if (month > mnth) {
          this.dateError = true;
        } else {
          this.dateError = false;
        }
      } else {
        this.dateError = false;
      }
    }
  }

  checkExpiry() {
    this.dateError = false;
  }
  //////////////////EMI///////////////////////
  createEmiFormGroup() {
    return new FormGroup({
      email: new FormControl('', [Validators.required]),
      cardNumber: new FormControl('', [Validators.required, Validators.minLength(12), Validators.maxLength(16)]),
      securityCode: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(3)]),
      cardExpirationMonth: new FormControl('', [Validators.required]),
      cardExpirationYear: new FormControl('', [Validators.required]),
      cardholderName1: new FormControl('', [Validators.required]),
      //paymentMethodId: new FormControl(''),
      token: new FormControl(''),
      Amount: new FormControl(''),
      UserId: new FormControl(''),
      CartId: new FormControl(''),
      cardNumberToshow: new FormControl(''),
    });
  }
  onEmiSubmit(data: any) {

    this.spinner.show()
    this.lastStep = true;
    this.checkDate();
    if (this.dateError)
      return false;
    if (data.cardExpirationYear == "2020") {
      data.cardExpirationYear = new Date();
    }

    data.cardExpirationYear = data.cardExpirationYear.getFullYear();
    data.UserId = this.UserId;
    data.CartId = this.cartItem[0].Id;
    if (this.cartItem.length > 0)
      data.Amount = this.cartItem[0].TotalAmount;
    this.cardData.Amount = this.totoalPrice;
    this.cardData.cardNumber = data.cardNumber;
    this.cardData.securityCode = data.securityCode;
    this.cardData.email = data.email;
    this.cardData.cardholderName = data.cardholderName;
    this.cardData.cardExpirationMonth = data.cardExpirationMonth;
    this.cardData.cardExpirationYear = data.cardExpirationYear;
    getpaymentmethod(data.cardNumber)
    installment(data.cardNumber, data.Amount)

    this.getEmiPlans();

  }
  getEmiPlans() {

    this.emiPlans = JSON.parse(localStorage.getItem("plans")) as any[];
    if (this.emiPlans == null || this.emiPlans.length == 0) {
      setTimeout(() => {

        this.getEmiPlans();
      }, 5000);
    }
    else {

      //alert(this.emiPlans)
      this.openEmiDivfn();
      this.spinner.hide();
      localStorage.removeItem("plans")
    }
  }
  getSelectedIndex(i: any) {

    this.index = i;
  }
  selectedPlan() {

    if (this.index == null) {
      var lang = localStorage.getItem("browseLang");
      if (lang == "english") {
        this.toster.warning("Select atleast one plan for EMI.")
      } else {
        this.toster.warning("Seleccione al menos un plan para EMI.")
      }

    }
    else {
      const result = this.emiPlans[this.index]

      this.cardData.installmentRate = result.installment_rate;
      this.cardData.IssuerId = localStorage.getItem("IssuerId")
      localStorage.removeItem("IssuerId")
      this.cardData.installmentamount = result.installment_amount;
      this.cardData.installments = result.installments
      this.cardData.userId = this.UserId
      createEmiToken(this.cardData)

      this.getEmiPaymentStatus();
      //this.pay();
    }
  }
  getEmiPaymentStatus() {
    this.paymentstatus = localStorage.getItem("PaymentStatus");
    localStorage.setItem("PaymentStatus", "");
    if (this.paymentstatus == "" || this.paymentstatus == undefined || this.paymentstatus == null) {
      setTimeout(() => {
        this.getPaymentStatus();
      }, 5000);
      // this.loading1 = false
    }
    else {
      if (this.paymentstatus == "accredited") {
        //this.loading1 = true

        this.pay();
      }
      else {
        this.loginModel.Status = this.paymentstatus;
        this.sendMessage();
      }
    }
  }
  //////////////////////////////////paypal//////////////////
  PaymentTransaction: any = {
    Id: 0,
    UserId: 0,
    intent: "",
    orderID: "",
    payerID: "",
    paymentID: "",
    paymentToken: "",
    TransactionAmount: "",
    PaymentMethod: "",
    FeesAmount: 0,
    StatusDetail: ""
  };

  calculcateEnv() {

    if (window.location.href.includes("pistis")) {
      return this.env = "production";
    }
    else {
      return this.env = "sandbox";
    }
  }
  paypalConfig = {
    env: this.calculcateEnv(),
    client: {
      sandbox:
        "AQ2yCzcE_6f0BKE1lgFePe7rj9YYDUA0hxOBsYQkOJjQzZ7ndDRNy-_uJblCs2qM6Fg-8C5O-q0sgEt9",
      production:
        "AVE7S_rVd9LvwDp7Ueop_sMOPFfubA7x0XR7TCAQS34nBlYv2SwjGCZZhq6AuTv_9r6s3oa738LVPwbT"
    },
    commit: true,
    payment: (data, actions) => {
      return actions.payment.create({
        payment: {
          transactions: [
            { amount: { total: this.totoalPrice, currency: "MXN" } }
          ]
        }
      });
    },
    onAuthorize: (data: any, actions) => {
      return actions.payment.execute().then(payment => {

        //Do something when payment is successful.
        console.log(data);

        this.PaymentTransaction.UserId = localStorage.getItem("UserId");
        if (data.intent != undefined)
          this.PaymentTransaction.intent = data.intent;
        if (data.orderID != undefined)
          this.PaymentTransaction.orderID = data.orderID;
        if (data.payerID != undefined)
          this.PaymentTransaction.payerID = data.payerID;
        if (data.paymentID != undefined)
          this.PaymentTransaction.paymentID = data.paymentID;
        if (this.finalAmount != undefined)
          this.PaymentTransaction.TransactionAmount = this.finalAmount;
        if (data.PaymentMethod != undefined)
          this.PaymentTransaction.PaymentMethod = data.PaymentMethod;
        //if(data.transactions[0].amount.details.shipping!=undefined)
        // this.PaymentTransaction.FeesAmount=data.transactions[0].amount.details.shipping
        if (data.state != undefined)
          this.PaymentTransaction.StatusDetail = "accredited";
        this.paymentstatus = "accredited";

        this._service
          .sendPaymentDetails(this.PaymentTransaction)
          .subscribe(x => {
            // alert('done')
          });
        this.pay();

        // this.router.navigate(['/confirmation']);
        // alert("Payment is successful");
      });
    }
  };

  ngAfterViewChecked(): void {
    if (!this.addScript) {
      this.addPaypalScript().then(() => {
        paypal.Button.render(this.paypalConfig, "#paypal-checkout-btn");
        this.paypalLoad = false;
      });
    }
  }

  addPaypalScript() {
    this.addScript = true;
    return new Promise((resolve, reject) => {
      let scripttagElement = document.createElement("script");
      scripttagElement.src = "https://www.paypalobjects.com/api/checkout.js";
      scripttagElement.onload = resolve;
      document.body.appendChild(scripttagElement);
    });
  }

  //---------------------------------billing address
  AddBillingAddress() {
    // if (!this.UserId) {
    //   var address = JSON.parse(window.localStorage.getItem("guestAddress"));
    //   this.billForm.patchValue(address);
    // }
    this.addAddressForm = false;
    this.addBillAddressForm = true;
    this.openLoginDiv = false;
    //this.loggedIn = true;
    this.orderVisited = false;
    this.openBillingDiv = false;
    this.openOrderDiv = false;
    this.openPayDiv = false;
    this.addAddressRegisterForm = false;
    this.openShipDiv = false;
    this.openTCDiv = false;
  }

  CancelBillingAddress() {
    this.addAddressForm = false;
    this.addBillAddressForm = false;
    this.openLoginDiv = false;
    //this.loggedIn = true;
    this.orderVisited = false;
    this.openBillingDiv = false;
    this.openOrderDiv = false;
    this.openPayDiv = false;
    this.addAddressRegisterForm = false;
    this.openShipDiv = false;
    this.openTCDiv = false;
  }

  withoutNumber: any = false;
  WithoutNum(target) {

    if (target.checked) this.withoutNumber = true;
    else this.withoutNumber = false;
  }

  onSubmitBillAddress() {

    if (!this.billForm.valid) {
      var lang = localStorage.getItem("browseLang");
      if (lang == "english") {
        this.toster.error("Fill bill address correctly!");
      } else {
        this.toster.error("Rellene la dirección de la factura correctamente!");
      }

      this.billForm.reset();
      return false;
    }
    var model = this.billForm.value;
    model.UserId = this.UserId;
    model.IpAddress = this.IpAddress;
    if (this.IsEdit == false) {
      if (!model.Id) model.Id = 0;
      this._serviceShipping.addBillAddress(model).subscribe((data: any) => {


        this.checkForUserBillAddress();
        this.changeBillAddressDiv("skip");
      });
    }
    //     var log=new checkout()
    //  log.CartId=this.cartItem[0].Id
    //  log.UserId=+localStorage.getItem('UserId')
    //  log.IpAddress=localStorage.getItem('IpAddress')
    //  log.StartTime=new Date(this.datepipe.transform(new Date(),'MM-dd-yyyy HH:mm:ss'))
    //  log.Step="3-billing address"
    //  log.ShippingCharges=0
    //  log.Pass=true
    //  log.Error=""
    // log.Action="Added billing Address"

    //   this.checkLog.checkoutlog(log).subscribe()
  }

  changeBillAddress() {
    if (this.addBillAddressForm) this.addBillAddressForm = false;
    else this.addBillAddressForm = true;
  }

  changeBillAddressDiv(action) {


    if (this.ShipAddressAsBillAddress || action == "skip") {
      this.calculateCharges();
      //this.openTc();
    } else {
      this.openBillingAddDiv = true;
      this.openBillingDiv = false;
      this.addAddressForm = false;
      this.openLoginDiv = false;
      //this.loggedIn = true;
      this.orderVisited = false;
      this.openOrderDiv = false;
      this.openPayDiv = false;
      this.addAddressRegisterForm = false;
      this.openShipDiv = false;
      this.openTCDiv = false;
      this.addBillAddressForm = false;
    }

    //     var log=new checkout()
    //  log.CartId=this.cartItem[0].Id
    //  log.UserId=+localStorage.getItem('UserId')
    //  log.IpAddress=localStorage.getItem('IpAddress')
    //  log.StartTime=new Date(this.datepipe.transform(new Date(),'MM-dd-yyyy HH:mm:ss'))
    //  log.Step="3-billing address"
    //  log.ShippingCharges=0
    //  log.Pass=true
    //  log.Error=""
    // log.Action="Opened billing "
    //   this.checkLog.checkoutlog(log).subscribe()
  }

  UserBillAddress: any[] = [];
  //end AddressRegister
  checkForUserBillAddress() {

    this._serviceShipping
      .getUserBillAddress(this.UserId, this.IpAddress)
      .subscribe((result: any[]) => {

        if (result) {
          this.UserBillAddress = [];
          this.UserBillAddress = result;
        }
      });
  }

  selectedBillAddressData: any;
  selectBillAddress(target, Id) {

    if (target.checked) {
      this.selectedBillAddressData = this.UserBillAddress.find(b => b.Id == Id);
      this.calculateCharges();

      //this.openTc();
    }
  }

  createBillFormGroup() {
    return new FormGroup({
      Id: new FormControl(""),
      Name: new FormControl("", [Validators.required]),
      UserId: new FormControl(""),
      IpAddress: new FormControl(""),
      PhoneNo: new FormControl("", [
        Validators.required,
        Validators.pattern("^[0-9]*$")
      ]),
      Pincode: new FormControl("", [Validators.required]),
      City: new FormControl(""),
      State: new FormControl("", [Validators.required]),
      LandMark: new FormControl(""),
      Street: new FormControl("", [Validators.required]),
      Street1: new FormControl(""),
      Street2: new FormControl(""),
      InteriorNumber: new FormControl(""),
      OutsideNumber: new FormControl(""),
      Colony: new FormControl("")
    });
  }

  ShipAddressAsBillAddress: any;
  checkAsBill(event, id: any) {

    if (event.target.checked) {
      this.checkedbill = true

      this.ShipAddressAsBillAddress = id;
      if (+this.ShipAddressAsBillAddress) this.setShippAddAsBillAddress();
    } else {
      this.checkedbill = false
      this.UserBillAddress = [];
    }
  }

  checkAsBillAddress(id: any) {
    this.ShipAddressAsBillAddress = id;
    if (+this.ShipAddressAsBillAddress) this.setShippAddAsBillAddress();
  }
  changeBillAdd($event) {

    if ($event.target.checked == true) {
      this.ShipAddressAsBillAddress = true;
    }
    else
      this.ShipAddressAsBillAddress = false;
  }

  bindCard: any;
  showCardNumber() {

    var account = this.bindCard;
    this.bindCard =
      new Array(account - 3).join("x") +
      account.substr(account.value.length - 4, 4);
    this.paymentForm.value.cardNumber = account;
  }

  /////
  handleSelected($event) {


    if ($event.target.checked === true) {
      this.appliedSpinner = true

      this._service.getusedCupon().subscribe();
      this._service.getpromoCart().subscribe(x => {

        if (x) {

          this.scroll = true
          this.promotionProducts = x as []
          this.promotionProducts.forEach(element => {

            let item: any = this.cartItem.filter(x => x.ProductId == element.ProductId)[0]


            if (item) {

              const index = this.cartItem.indexOf(item, 0);
              if (index > -1) {

                this.cartItem.splice(index, 1);
                this.cartItem.push(element)
              }
              this.totoalPrice = 0
              this.cartItem[0].TotalAmount = 0;

              this.cartItem.forEach((element: any) => {

                this.cartItem[0].TotalAmount += Number(element.PriceAfterDiscount);
              });



              this.ApplyDiscount = true
              this.totoalPrice = this.cartItem[0].TotalAmount
              var shipprice1 = this.DeliveryDetail.ShipPrice
              this.totoalPrice = +((
                +this.totoalPrice + parseFloat(shipprice1)
              ).toFixed(2));
            } else {
              this.ApplyDiscount = false;
            }

          });
        }
      })



    } else {
      this.scroll = false
      // this._service.removeusedCupon().subscribe();
    }
  }
  /////forgot password
  passwordCheck: boolean = false
  confirmPass: boolean = false
  passlen: boolean = false
  enterPassAgain: boolean = false
  Currentpass: any = ''
  display2 = 'none';
  Newpass: any = ''
  ConfirmPass: any = ''
  otpValid: boolean = false
  otpValidity: boolean = false
  typeOtp: string = ''
  name: boolean = false
  CurrentEmail: string = ''
  EmailFirst: boolean = false
  otpFirst: boolean = false
  FirstPassword: string = ""
  otpbutton: boolean = false
  takeTheSalt(val: string) {


    
    this._service.checkTheSalt(val).subscribe(x => {
      if (x == 0) {
        this.passwordCheck = true

      } else {
        this.passwordCheck = false
        this.otpFirst = true
        this.otpbutton = false
      }
    })


  }
  saltMixture(salt1:string){
    
    if(this.FirstPassword.length>0){
    var str1:string=salt1;
   let res= str1.localeCompare(this.FirstPassword)
   if(res!=0){
this.confirmPass=true
   }else{
     this._service.sendNewSalt(this.FirstPassword).subscribe(x=>{
       if(x==1){
         
         var lang = localStorage.getItem("browseLang");


         if (lang == "english") {
          this.toster.info("Password changed successfully!");
        } else {
          this.toster.info("Contraseña cambiada correctamente!");
        }
         
         this.resetPass()
this.display2='none';  
(<any>$('#myModal')).modal('hide');
    }
     })
   }
  }else
  {
    this.enterPassAgain=true
  }
}
  resetPass() {
    this.display2 = 'block';
    this.Currentpass = ''
    this.Newpass = ''
    this.ConfirmPass = ''
    this.name = false
    this.EmailFirst = false
    this.otpFirst = false
    this.otpValid = false
    this.otpValidity = false
    this.passwordCheck = false
    this.confirmPass = false
    this.passlen = false
    this.enterPassAgain = false
    this.typeOtp = ''
  }
  takeEmail(val){
    
    var lang = localStorage.getItem("browseLang");
  
    if(val!="")
  this._service.checkemail1(val).subscribe((x:any)=>{
    
    if(x==0){
      //this.toster.info("This email Id not registered");
  
  
      if (lang == "english") {
        this.toster.info("This email Id not registered!");
      } else {
        this.toster.info("Este ID de correo electrónico no está registrado!");
      }
      (<any>$('#myModal')).modal('hide');
    }else{
      localStorage.setItem("UserId", x);
      if (lang == "english") {
        this.toster.info("Otp sent to your registered email id!");
      } else {
        this.toster.info("Otp enviado a su ID de correo electrónico registrado!");
      }
  
  
      
  this.otpbutton=true
      this.EmailFirst=true
    }
  })
  
  }
  Salt(val: string) {
    
    this.FirstPassword = val
    if (val.length > 6) {
      this.passlen = false
    } else {

      this.passlen = true
    }
  }

}
