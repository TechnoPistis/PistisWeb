import { Component, OnInit, AfterViewInit } from '@angular/core';
import { shipping, LoginCheckout, CardData } from '../checkoutmodel';
import { CheckoutserviceService } from '../checkoutservice.service';
import { shippingervice } from '../../manage-address/shipping.service';
import { MycartService } from '../../mycart/mycart.service';
import { GetCart } from '../../mycart/mycartModel';
import { NgxSpinnerService } from 'ngx-spinner';
import { FormGroup, FormControl, Validators, NgModel } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { shippingModel } from '../../manage-address/shippingModel';
import { ActivatedRoute, Router } from '@angular/router';
import { ShippingGatewayService } from '../../CommonServices/ShippingGateService';
import { createtoken, getpaymentmethod, createEmiToken, installment } from "src/assets/js/custom";
import { MessageService } from 'src/app/shared/services/message.service';
import { Tracklog } from 'src/app/shared/services/Tracklog.service';
declare let paypal: any;

@Component({
  selector: 'app-checkout-steps',
  templateUrl: './checkout-steps.component.html',
  styleUrls: ['./checkout-steps.component.css']
})
export class CheckoutStepsComponent implements OnInit {
  lodingTime:Date=new Date()
  TimeTaken:any
  totaltime:any
  UserId: number;
  SpanLang:boolean=false
  modifydate:any[]=[]
  enableSticky = true;
  IpAddress: any;
  today=new Date();
  shipping: shipping[] = [];
  CurrentUser: string;
  Countries: any[];
  cartItem: GetCart[] = [];
  totoalPrice: number;
  Promotiondiv: boolean=false;
  addAddressForm:boolean=false;
  emailRequired: boolean;
  termsAndCon=false
  guestUser: boolean = false;
  IsExists: boolean=false;
  ShippingAddress: shipping;
  DefaultAddress: shipping;
  isStep1Visited:boolean=false;
  open2ndStep:boolean=false;
  Email: any;
  isStep2Visited: boolean=false;
  City: any;
  open3rdStep: boolean=false;
  isSelected: boolean=true;
  selectFedex=false
  terms: boolean=false;
  selectedIndex: any;
  appliedSpinner: boolean=false;
  scroll: boolean=false;
  ApplyDiscount: boolean=false;
  emiForm: FormGroup;
  lastStep: boolean=false;
  index: any;
  sameAddress: boolean=true;
  openEMIDiv: boolean=false;
  isCardFilled: boolean=false;
  PageUrl:string
  RequestUrl:string
  description: string;
  Action: string;
  Guid:any
  constructor( public _service: CheckoutserviceService,
    public _serviceShipping: shippingervice,
    public service: MycartService,
    private router: Router,
    private spinner: NgxSpinnerService,
    private toster: ToastrService,
    private route:ActivatedRoute,
    public shipService: ShippingGatewayService,
    public messageService: MessageService,
    public tracklog:Tracklog) { }

  ngOnInit() {
    this.Guid=this.tracklog.newGuid()
    this.PageUrl=  this.router.url
    this.UserId = +window.localStorage.getItem("UserId");
    this.CurrentUser = window.localStorage.getItem("UserName");
    this.IpAddress = window.localStorage.getItem("IpAddress");
    this.route.queryParams.subscribe(params => {
      this.guestUser = params['guestUser'];})
      if(this.guestUser)
      this.addAddressForm=true
      else
      this.getUserAddress()
    this.getCountries();
    this.getcart();
    this.shippingForm = this.createFormGroup();
    this.paymentForm = this.createPaymentFormGroup();
    this.emiForm = this.createEmiFormGroup();
    this.billForm = this.createBillFormGroup();
    this.checkForUserBillAddress();
  }
  millisToMinutesAndSeconds(millis) {
    var minutes = Math.floor(millis / 60000);
    var seconds = +((millis % 60000) / 1000).toFixed(0);
    return minutes + ":"  + seconds;
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
  getcart() {
    this.RequestUrl='cart/getCartByCustomer?CustomerId='+this.UserId
    this.tracklog.handleSuccess1(this.description="STEP-1-Cart items  rendering on ",this.Action="STEP-1-Cart items","Request",this.RequestUrl,this.PageUrl, this.Guid)

    this.service.getCart(this.UserId, this.IpAddress).subscribe(data => {
      debugger
      this.cartItem = data as GetCart[];
      this.totoalPrice = 0;

      this.cartItem.forEach(element => {
        if ((+element.SellingPrice || +element.Quantity)) {
          this.totoalPrice = Number(element.TotalAmount);
        } else {
          this.cartItem.splice(this.cartItem.indexOf(element), 1)
        }
      });
      this._service.checkUserData(this.cartItem[0].Id).subscribe(x => {

        if (x == true) {

          this.Promotiondiv = true
        }
      })
      this.tracklog.handleSuccess1(this.description="STEP-1-Cart items  rendering on my cart",this.Action="STEP-1-Cart items",JSON.stringify(data),this.RequestUrl,this.PageUrl, this.Guid)
    }
    ,
    error => this.tracklog.handleError1(error,this.Action="STEP-1-Cart items",this.RequestUrl,this.PageUrl, this.Guid)

    );
  }


  //Step1
  shippingForm: any;
  shippingRegisterForm: any;
  NewAddress: boolean=false;
  IsEdit: boolean=false;
  States: any[] = [];
  UserAddress: shippingModel[] = [];
  selectedAddressId: any;
  getCountries() {
    this.RequestUrl='country/getAll'
    this.tracklog.handleSuccess1(this.description="STEP-1-Getting countries",this.Action="STEP-1-Get Countries","Request",this.RequestUrl,this.PageUrl,this.Guid)

    this._serviceShipping.getCountry().subscribe((data: any[]) => {
      this.Countries = [];
      this.Countries = data;
      this.tracklog.handleSuccess1(this.description="STEP-1-Getting countries",this.Action="STEP-1-Get Countries",JSON.stringify(data),this.RequestUrl,this.PageUrl,this.Guid)
    }
    ,
    error => this.tracklog.handleError1(error,this.Action="STEP-1-Get Countries",this.RequestUrl,this.PageUrl,this.Guid)


    );
  }
  getUserAddress() {
    if (isNaN(this.UserId)) {
      this.UserId = 0;
    }
    this.RequestUrl='checkout/getAdressByUser?id=' + this.UserId
    this.tracklog.handleSuccess1(this.description="STEP-1-Getting user address",this.Action="STEP-1-Get User Address",JSON.stringify("Request"),this.RequestUrl,this.PageUrl,this.Guid)

    this._service
      .getUserAddress(this.UserId, this.IpAddress)
      .subscribe((result: shipping[]) => {
        this.shipping = [];
        if (result) {
          this.shipping = result;
          this.shipping.forEach(element => {
            if(element.IsDefault==true)

            this.DefaultAddress=element;
            this.selectedBillAddressData=this.DefaultAddress
          });
        }
        if(this.shipping.length==0)
        {
          this.addAddressForm=true
        }
        this.tracklog.handleSuccess1(this.description="STEP-1-Change Shipping Address on checkout",this.Action="STEP-1-Change Shipping Address",JSON.stringify(this.DefaultAddress),this.RequestUrl,this.PageUrl,this.Guid)

        this.tracklog.handleSuccess1(this.description="STEP-1-Getting user address",this.Action="STEP-1-Get User Address",JSON.stringify(this.DefaultAddress),this.RequestUrl,this.PageUrl,this.Guid)
      }
      ,
      error => this.tracklog.handleError1(error,this.Action="STEP-1-Get User Address",this.RequestUrl,this.PageUrl,this.Guid)


      );
  }
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
      StateName: new FormControl("", [Validators.required]),
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
      asBillAddress: new FormControl(""),
      Email:new FormControl("")
    });
  }
  editStep1(){
    this.isStep1Visited=false;
    this.isStep2Visited=false;
    this.open2ndStep=false;
    this.open3rdStep=false
    this.IsEdit=true;

  }
  shippingName:boolean=false
  ShippingPhone:boolean=false
  shippingPincode:boolean=false
  shippingStateName:boolean=false
  shippingStreet:boolean=false
  focusOutStreet(){

    if(this.shippingForm.value.Street==""){
      this.shippingStreet=true
    }else{
      this.shippingStreet=false
    }
  }
  focusOutStreet1(){

    if(this.billForm.value.Street=="" || !this.billForm.value.Street ){
      this.shippingStreet=true
    }else{
      this.shippingStreet=false
    }
  }
  focusOutStateName(){

    if(this.shippingForm.value.StateName==""){
      this.shippingStateName=true
    }else{
      this.shippingStateName=false
    }
  }
  focusOutStateName1(){

    if(this.billForm.value.StateName=="" || !this.billForm.value.StateName){
      this.shippingStateName=true
    }else{
      this.shippingStateName=false
    }
  }
  focusOutPincode(){

    if(this.shippingForm.value.Pincode==""){
      this.shippingPincode=true
    }else{
      this.shippingPincode=false
    }
  }
  focusOutPincode1(){

    if(this.billForm.value.Pincode=="" || !this.billForm.value.Pincode){
      this.shippingPincode=true
    }else{
      this.shippingPincode=false
    }
  }
  focusOutName(){

    if(this.shippingForm.value.Name==""){
      this.shippingName=true
    }else{
      this.shippingName=false
    }
  }
  focusOutPhone(){

    if(!this.shippingForm.value.PhoneNo || this.shippingForm.value.PhoneNo=="" || this.shippingForm.value.PhoneNo==0 ||this.shippingForm.value.PhoneNo==undefined)
{
  this.ShippingPhoneNo=true
  return false;
}else{
  this.ShippingPhoneNo=false
}
    var mobile:any=+this.shippingForm.value.PhoneNo
    if(mobile.toString().length<10){
      this.ShippingPhone=true
    }else{
      this.ShippingPhone=false
    }
  }
  checkValidation(){

    this.shippingForm.value
  }
  shippingFormName(){

    if(!this.shippingForm.value.Name || this.shippingForm.value.Name=="" || this.shippingForm.value.Name==undefined )
{
  this.shippingName=true
  return false;
}else{
  this.shippingName=false
}
  }
  shippingFormPhone(){
    if(!this.shippingForm.value.PhoneNo || this.shippingForm.value.PhoneNo=="" || this.shippingForm.value.PhoneNo==0 ||this.shippingForm.value.PhoneNo==undefined)
{
  this.ShippingPhoneNo=true
  return false;
}else{
  this.ShippingPhoneNo=false
}
  }
  focusOutstate(){
    if(!this.shippingForm.value.StateName || this.shippingForm.value.StateName=="" ||this.shippingForm.value.StateName==undefined )
{
  this.shippingStateName=true
  return false;
}else{
  this.shippingStateName=false
}

  }
  focusOutstreet(){
    if(!this.shippingForm.value.Street || this.shippingForm.value.Street=="" ||this.shippingForm.value.Street==undefined)
{
  this.ShippingStreet=true
  return false;
}else{
  this.ShippingStreet=false
}
  }
  shippingpincode(){

    if(!this.shippingForm.value.Pincode || this.shippingForm.value.Pincode=="" ||this.shippingForm.value.Pincode==undefined)
{
  this.ShippingPincode=true
  return false;
}else{
  this.ShippingPincode=false
}
  }
  handleChange(evt) {

    var target = evt.target;
    if (target.checked) {
      this.Addresstype=false
    } else {
      this.Addresstype=true

    }
  }
ShippingName=false
ShippingPhoneNo=false
ShippingPincode=false
ShippingStateName=false
ShippingStreet=false
Addresstype=false
  onSubmitShipping() {


if(!this.shippingForm.value.Name || this.shippingForm.value.Name=="" || this.shippingForm.value.Name==undefined )
{
  this.shippingName=true
  return false;
}else{
  this.shippingName=false
}
if(!this.shippingForm.value.Street || this.shippingForm.value.Street=="" ||this.shippingForm.value.Street==undefined)
{
  this.ShippingStreet=true
  return false;
}else{
  this.ShippingStreet=false
}
if(!this.shippingForm.value.StateName || this.shippingForm.value.StateName=="" ||this.shippingForm.value.StateName==undefined )
{
  this.shippingStateName=true
  return false;
}else{
  this.shippingStateName=false
}
if(!this.shippingForm.value.Pincode || this.shippingForm.value.Pincode=="" ||this.shippingForm.value.Pincode==undefined)
{
  this.ShippingPincode=true
  return false;
}else{
  this.ShippingPincode=false
}
if(!this.shippingForm.value.PhoneNo || this.shippingForm.value.PhoneNo=="" || this.shippingForm.value.PhoneNo==0 ||this.shippingForm.value.PhoneNo==undefined)
{
  this.ShippingPhoneNo=true
  return false;
}else{
  this.ShippingPhoneNo=false
}
if(!this.shippingForm.value.AddressType || this.shippingForm.value.AddressType=="" ||this.shippingForm.value.AddressType==undefined)
{
  this.Addresstype=true
  return false;
}else{
  this.Addresstype=false
}
if(this.UserId==0){
  if(!this.Email || this.Email==undefined || this.Email==""){
  this.emailRequired=true
  return false
}
  else{
    this.emailRequired=false
  }
}


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
    model.Email=this.Email
    model.UserId = this.UserId;
    model.IpAddress = this.IpAddress;
    if (this.IsEdit == false) {
      if (!model.Id) model.Id = 0;
      this._serviceShipping.addShipAddressGuest(model).subscribe((data: any) => {
        this._service.changeDefaultAddress(data.Id).subscribe((changed: boolean) => {


          if (changed) {
            if (this.shipping.length > 0) {
              this._service
      .getUserAddress(this.UserId, this.IpAddress)
      .subscribe((result: shipping[]) => {
        this.shipping = [];
        if (result) {
          this.shipping = result;
          this.shipping.forEach(element => {
            if(element.IsDefault==true)
            this.DefaultAddress=element;
            this.selectedBillAddressData=this.DefaultAddress
            this.selectedAddressId = data.Id;
        this.deliverHere(data.Id)


          });
        }
      })
            } else {
              this.shipping = [];
              this.shipping.push(data);
              this.selectedAddressId = data.Id
              this.DefaultAddress=data;
              this.selectedBillAddressData=this.DefaultAddress
        this.deliverHere(data.Id)

            }
          }

        })
      });

      this.isStep1Visited=true;
      this.open2ndStep=true;

    }
    if (this.IsEdit == true) {
      model.Id=this.DefaultAddress.Id;
      this.RequestUrl='shipping/updateUserAddress'
      this.tracklog.handleSuccess1(this.description="STEP-1-Update user shipping address ",this.Action="STEP-1-Update User shipping  address","Request",this.RequestUrl,this.PageUrl,this.Guid)

      this._serviceShipping.updateShipAddress(model).subscribe((data: any) => {

        if (data.Id > 0) {
          var lang = localStorage.getItem("browseLang");
      this.tracklog.handleSuccess1(this.description="STEP-1-Updated user shipping address ",this.Action="STEP-1-Update User shipping  address",JSON.stringify(data),this.RequestUrl,this.PageUrl,this.Guid)

          if (lang == "english") {
            this.toster.success("Address updated successfully!");
          } else {
            this.toster.success("Dirección actualizada con éxito!");
          }
          this._service.changeDefaultAddress(data.Id).subscribe((result: boolean) => {

            if (result) {
              this.shipping = [];
          this.shipping.push(data);
          this.selectedAddressId = data.Id
          this.DefaultAddress=data;
          this.selectedBillAddressData=this.DefaultAddress
          this.checkForUserAddress();
          this.NewAddress = false;
          this.isStep1Visited=true;
      this.open2ndStep=true;
            }
            this.deliverHere(data.Id)
          })

        }

      });

    }
  }
  checkForUserAddress() {
    this.RequestUrl='checkout/getAdressByUser?id=' + this.UserId
this.tracklog.handleSuccess(this.description="check For User Address on checkout page",this.Action="checkForUserAddress","Request",this.RequestUrl,this.PageUrl)

    this._service
      .getUserAddress(this.UserId, this.IpAddress)
      .subscribe((result: shippingModel[]) => {
        if (result) {
          this.UserAddress = [];
          this.UserAddress = result;
        }
        this.tracklog.handleSuccess(this.description=" User Address on checkout page",this.Action="check For User Address",JSON.stringify(result),this.RequestUrl,this.PageUrl)
      },
      error => this.tracklog.handleError(error,this.Action="check For User Address",this.RequestUrl,this.PageUrl)


      );
  }
  withoutNumber: any = false;
  WithoutNum(target) {
    if (target.checked) this.withoutNumber = true;
    else this.withoutNumber = false;
  }
  getmail(email) {
    if (email)
      this.emailRequired = false;
    else
      this.emailRequired = true;
  }
  CheckEmail(email) {
    this._service.checkemail(email).subscribe(data => {
      this.Email=email;
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
  ChangeDefaultAddress(Id) {
    this.RequestUrl='checkout/changeDefaultAddress?id=' + this.UserId

    this.tracklog.handleSuccess1(this.description="STEP-1-Change Shipping Address on checkout",this.Action="STEP-1-Change Shipping Address","Request",this.RequestUrl,this.PageUrl,this.Guid)

    this._service.changeDefaultAddress(Id).subscribe((result: boolean) => {
      if (result) {
        if(this.guestUser)
        {
          this.shipping=[];
        }
        else
        this.getUserAddress();
      }
    },
    error => this.tracklog.handleError(error,this.Action="STEP-1-Change Shipping Address",this.RequestUrl,this.PageUrl)


    );
  }
  deliverHere(Id) {
    this.selectedAddressId = Id;
    this.ShippingAddress = this.shipping.filter(v => v.Id == Id)[0];
    this.tracklog.handleSuccess1(this.description="STEP-1-Shipping Address of user on checkout",this.Action="STEP-1-Shipping Address","Request",this.RequestUrl,this.PageUrl,this.Guid)

    this.isStep1Visited=true;
    this.open2ndStep=true;
    this.calculateCharges();
  }
  AddAddress() {

      this.addAddressForm = true;

    }
  //step1 end
  //step2 start
  PostalCode: any;
  productId: any;
  promotionProducts: any[];
  VariantDetailId: any;
  ShippingCharges: any;
  isShipError: boolean = false;
  ShippingError: any;
  Quantity: any;
  currentDate: any;
  DeliveryDetail: any;
  shippEmail: any;
  shippedAddress: any;
  AcceptTC: any;
  calculateCharges() {
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
    //this.City = this.shippedAddress.City;
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
      this.RequestUrl='shippingGateway/GetQuotesCapabilities?countryCode='

      this.tracklog.handleSuccess1(this.description="STEP-1-check Charges for shipping ",this.Action="STEP-1-Check shipping charges","Request",this.RequestUrl,this.PageUrl,this.Guid)

      this.shipService.CalculateCharges(model).subscribe((data: any) => {
        this.spinner.hide();
        this.lodingTime= new Date()
        this.totaltime=this.lodingTime.getTime()
        var time=this.totaltime-this.TimeTaken
        var tome=this.millisToMinutesAndSeconds(time)
    this.tracklog.handleSuccess1(this.description="STEP-1-Time for check Charges for shipping ="+tome+"minutes",this.Action="STEP-1-Time taken by shipping charges","Time for check Charges for shipping ="+tome+"minutes",this.RequestUrl,this.PageUrl,this.Guid)

        if (data.length > 0) {
          var lang = localStorage.getItem("browseLang");
      if (lang == "english") {
        this.SpanLang=false

      } else {
        this.SpanLang=true

      }

          this.ShippingCharges = data;

//           var Engdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
//           var Engmonths = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September','October', 'November', 'December' ];
//           var Spandays = ['lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado', 'domingo'];
//           var Spanmonths = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre','diciembre' ];
//           this.modifydate=[]
//           this.ShippingCharges.forEach(element => {
//
//            var d= new Date(element.DeliveryDate);
//            var lang = localStorage.getItem("browseLang");
//            if (lang == "english") {
// var dayName = Engdays[d.getDay()];
// var monthName=Engmonths[d.getMonth()]
// var data:any={
//   dayName:dayName,
//   monthName:monthName,
//   ShipPrice:element.ShipPrice,
//   DeliveryType:element.DeliveryType,
//   Year:d.getFullYear(),
//   Monthnumber:d.getMonth()
// }
//            }else{
//             var dayName = Spandays[d.getDay()];
//             var monthName=Spanmonths[d.getMonth()]
//             var data:any={
//               dayName:dayName,
//               monthName:monthName,
//               ShipPrice:element.ShipPrice,
//               DeliveryType:element.DeliveryType,
//               Year:d.getFullYear(),
//               Monthnumber:d.getMonth()
//             }
//            }

// this.modifydate.push(data)
//           });
          this.isShipError = false;
          this.ShippingError = null;
        } else {
          this.editStep1();
          var lang = localStorage.getItem("browseLang");
      if (lang == "english") {
        this.toster.warning("! Please enter a valid pincode.")
      } else {
        this.toster.warning("Por favor, introduzca un Codigo Postal válido.")
      }
        }
        this.tracklog.handleSuccess1(this.description="STEP-1-checked Charges for shipping ",this.Action="STEP-1-Check shipping charges",JSON.stringify(data),this.RequestUrl,this.PageUrl,this.Guid)

      }
      ,
    error => this.tracklog.handleError1(error,this.Action="STEP-1-Check shipping charges",this.RequestUrl,this.PageUrl,this.Guid)
      );
    }
  }
  setShipAddress(event: any, shipIndex: any) {

    this.selectFedex=false
    this.DeliveryDetail = this.ShippingCharges[shipIndex];
if(this.DeliveryDetail)
this.isSelected=false;
else
this.isSelected=true;
    this.addTaxToPrice()
  }
  addTaxToPrice() {
    var shipprice = this.DeliveryDetail.ShipPrice
    this.totoalPrice = +((
      +this.cartItem[0].TotalAmount + parseFloat(shipprice)
    ).toFixed(2));
    this.tracklog.handleSuccess1(this.description="STEP-2 Selected delivery charges total price="+this.totoalPrice+"and shipment price="+shipprice,this.Action="STEP-2 select  shipping charges",JSON.stringify(this.cartItem),this.RequestUrl,this.PageUrl,this.Guid)

  }
  fun(e: any) {

    if (e.target.checked){
    this.tracklog.handleSuccess1(this.description="STEP-2-checked the terms and condition",this.Action="STEP-2-checked the terms and condition","x",this.RequestUrl=this.PageUrl,this.RequestUrl,this.Guid)

      this.termsAndCon=false
      this.terms = true;
    }
    else{
    this.tracklog.handleSuccess1(this.description="STEP-2- Un-checked the terms and condition",this.Action="STEP-2- Un-checked the terms and condition","x",this.RequestUrl=this.PageUrl,this.RequestUrl,this.Guid)

      this.terms = false;
      this.termsAndCon=true

    }

  }
  goTOTermsAndConditions() {
    this.router.navigate(["/terms"]);
  }
  Continueship() {
    this.tracklog.handleSuccess(this.description="STEP-2-clicked on countinue",this.Action="STEP-2-Continue button",JSON.stringify(this.cartItem),this.RequestUrl=this.PageUrl,this.RequestUrl)

    if(this.isSelected==false && this.terms)
    {
      this.selectFedex=false

    this.open2ndStep=false;
    this.open3rdStep=true;
    $("#yr").attr("autocomplete", "off");
    $("#cvv").attr("autocomplete", "off");

    this.isCardFilled=false;
    this.openEMIDiv=false
    this.isStep2Visited=true;
    this.paymentForm.reset();
    this.emiForm.reset();
  this.selectedIndex = this.ShippingCharges.indexOf(this.DeliveryDetail);
     $("#ShipCost_" + this.selectedIndex).attr('checked', 'checked');
    }
    else if(this.isSelected==true )
    {

      this.selectFedex=true
    // var lang = localStorage.getItem("browseLang");
    //   if (lang == "english") {
    //     this.toster.warning("Select one option.")
    //   } else {
    //     this.toster.warning("seleccione una opción.")
    //   }
    }
    else
    {
      this.selectFedex=false
this.termsAndCon=true
    // var lang = localStorage.getItem("browseLang");
    //   if (lang == "english")
    //     this.toster.warning("Please check the terms and condition box.")
    //   else         this.toster.warning("Por favor marque los términos y condiciones de la casilla.")

    }
  }
  editStep2(){
    this.open2ndStep=true;
    this.open3rdStep=false;
    this.isStep2Visited=false;
    this.selectedIndex = this.ShippingCharges.indexOf(this.DeliveryDetail);
     $("#ShipCost_" + this.selectedIndex).attr('checked', 'checked');
  }
  handleSelected($event) {


    if ($event.target.checked === true) {
      this.appliedSpinner = true

      this._service.getusedCupon().subscribe();
      this.RequestUrl= 'cart/getCartByCustomerpromo?CustomerId=' + this.UserId
      this.tracklog.handleSuccess1(this.description="Step-2-get spinner discount",this.Action="Step-2-Spinner discount","Request",this.RequestUrl,this.PageUrl,this.Guid)

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
             // this.cartItem[0].TotalAmount = 0;

              // this.cartItem.forEach((element: any) => {

              //   this.cartItem[0].TotalAmount += Number(element.PriceAfterDiscount);
              // });



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
        this.tracklog.handleSuccess(this.description="get spinner discount",this.Action="Step-2-Spinner discount",JSON.stringify(x),this.RequestUrl,this.PageUrl)

      },
      error => this.tracklog.handleError(error,this.Action="Step-2-Spinner discount",this.RequestUrl,this.PageUrl)
      )



    } else {
      this.scroll = false
    }
  }
  //step2 end

  //Step3 start
  //Billing Address
  billForm: any;
  UserBillAddress: any[] = [];
  openBillingAddForm=false;
  selectedBillAddressData: any;
  mercadoForm: boolean=false;
  paypalForm: boolean=false;
  phoneLength:boolean=false
  billingName(){
    if(!this.billForm.value.Name || this.billForm.value.Name=="" || this.billForm.value.Name==undefined )
    {
      this.shippingName=true
      return false;
    }else{
      this.shippingName=false
    }
  }
  billingPhone(){

    if(!this.billForm.value.PhoneNo || this.billForm.value.PhoneNo=="" || this.billForm.value.PhoneNo==undefined )
{
  this.ShippingPhone=true
  return false;
}else{
  this.ShippingPhone=false
}
var mobile:any=+this.billForm.value.PhoneNo
    if(mobile.toString().length<10){
      this.phoneLength=true
    }else{
      this.phoneLength=false
    }
  }
  billingStreet(){
    if(!this.billForm.value.Street || this.billForm.value.Street=="" || this.billForm.value.Street==undefined )
{
  this.shippingStreet=true
  return false;
}else{
  this.shippingStreet=false
}
  }
  billingstate(){
    if(!this.billForm.value.State || this.billForm.value.State=="" || this.billForm.value.State==undefined )
{
  this.shippingStateName=true
  return false;
}else{
  this.shippingStateName=false
}
  }
  billingPincode(){
    if(!this.billForm.value.Pincode || this.billForm.value.Pincode=="" || this.billForm.value.Pincode==undefined )
{
  this.shippingPincode=true
  return false;
}else{
  this.shippingPincode=false
}
  }

  onSubmitBillAddress() {
    if(!this.billForm.value.Name || this.billForm.value.Name=="" || this.billForm.value.Name==undefined )
{
  this.shippingName=true
  return false;
}else{
  this.shippingName=false
}
if(!this.billForm.value.PhoneNo || this.billForm.value.PhoneNo=="" || this.billForm.value.PhoneNo==undefined )
{
  this.ShippingPhone=true
  return false;
}else{
  this.ShippingPhone=false
}
if(!this.billForm.value.Street || this.billForm.value.Street=="" || this.billForm.value.Street==undefined )
{
  this.shippingStreet=true
  return false;
}else{
  this.shippingStreet=false
}
if(!this.billForm.value.State || this.billForm.value.State=="" || this.billForm.value.State==undefined )
{
  this.shippingStateName=true
  return false;
}else{
  this.shippingStateName=false
}
if(!this.billForm.value.Pincode || this.billForm.value.Pincode=="" || this.billForm.value.Pincode==undefined )
{
  this.shippingPincode=true
  return false;
}else{
  this.shippingPincode=false
}


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
   // if (this.IsEdit == false) {
      if (!model.Id) model.Id = 0;
      this.RequestUrl='shipping/addUsersBillAddress'
      this.tracklog.handleSuccess1(this.description="Step-3-user adding billing address",this.Action="Step-3-Add billing address","Request",this.RequestUrl,this.PageUrl,this.Guid)

      this._serviceShipping.addBillAddress(model).subscribe((data: any) => {

        this.selectedBillAddressData=data
        this.selectedBillAddressData.StateName=data.State
        this.openBillingAddForm=false;
       // this.checkForUserBillAddress();
       this.tracklog.handleSuccess1(this.description="user adding billing address",this.Action="Step-3-Add billing address",JSON.stringify(data),this.RequestUrl,this.PageUrl,this.Guid)

      },
      error => this.tracklog.handleError(error,this.Action="Step-3-Add billing address",this.RequestUrl,this.PageUrl)
      );
   // }
  }
  checkForUserBillAddress() {
    this.RequestUrl='shipping/getBillAdressByUser?id=' + this.UserId
    this.tracklog.handleSuccess1(this.description="STEP-1-check For User Bill Address",this.Action="STEP-1-Get User billing address","Request",this.RequestUrl,this.PageUrl,this.Guid)

    this._serviceShipping
      .getUserBillAddress(this.UserId, this.IpAddress)
      .subscribe((result: any[]) => {
        if (result) {

          this.UserBillAddress = [];
          this.UserBillAddress = result;
        }
        this.tracklog.handleSuccess1(this.description="STEP-1-check For User Bill Address",this.Action="STEP-1-Get User billing address",JSON.stringify(result),this.RequestUrl,this.PageUrl,this.Guid)
      }
      ,
      error => this.tracklog.handleError1(error,this.Action="STEP-1-Get User billing address",this.RequestUrl,this.PageUrl,this.Guid)

      );
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
  selectBillAddress(target, Id) {
    if (target.checked) {
      this.selectedBillAddressData = this.UserBillAddress.find(b => b.Id == Id);
    this.tracklog.handleSuccess1(this.description="STEP-3 Billing address selected",this.Action="STEP-3-Billing address",this.selectedBillAddressData,this.RequestUrl=this.PageUrl,this.RequestUrl,this.Guid)

      this.sameAddress=false;
    }
  }
  openAddBillingAddForm(event){

    if(event.checked==false)
    {
    this.tracklog.handleSuccess1(this.description="STEP-3 open Add Billing Address Form",this.Action="STEP-3-Billing address","Request",this.RequestUrl=this.PageUrl,this.RequestUrl,this.Guid)

    this.openBillingAddForm=true;
    this.sameAddress=false
    }
    else
    {
    this.tracklog.handleSuccess1(this.description="STEP-3 Billing address Same as shipping address",this.Action="STEP-3-Billing address",this.selectedBillAddressData,this.RequestUrl=this.PageUrl,this.RequestUrl,this.Guid)

    this.openBillingAddForm=false;
    this.sameAddress=true;
    this.checkForUserBillAddress()
    }
  }
  openBillingForm(){
    this.openBillingAddForm=true;
    this.sameAddress=false
  }
  openMercado()
  {
    this.tracklog.handleSuccess1(this.description="STEP-3 clicked mercado pay button",this.Action="STEP-3 clicked on Emi pay button","Request",this.RequestUrl=this.PageUrl,this.PageUrl,this.Guid)

    this.mercadoForm=true;
    this.isCardFilled=false;
    this.paymentForm.reset();
    this.emiForm.reset();
    this.openEMIDiv=false;
    this.paypalForm=false;
  }
  openPaypal(){
    this.RequestUrl="https://www.paypal.com/checkoutnow?"
  this.tracklog.handleSuccess1(this.description="STEP-3 Open Paypal option",this.Action="STEP-3-Paypal option","Request",this.RequestUrl,this.PageUrl,this.Guid)

    this.mercadoForm=false;
    this.isCardFilled=false;
    this.paymentForm.reset();
    this.emiForm.reset();
    this.openEMIDiv=false;
    this.paypalForm=true;
  var abc=  this.route.url
  }
  //payment
   //Payment
   loginModel: LoginCheckout = new LoginCheckout();
   pay() {
    this.loginModel.Shipping = this.ShippingAddress;
    this.loginModel.CustomerId = this.UserId == null ? 0 : this.UserId;
    this.loginModel.BillingAddressId = this.selectedBillAddressData.Id;
    this.loginModel.IpAddress = this.IpAddress;
    this.loginModel.SelectedShippingId = this.selectedAddressId;
    this.loginModel.Cart = this.cartItem;
    this.loginModel.ShippingType = this.DeliveryDetail.DeliveryType;
    this.loginModel.ShippingPrice = this.DeliveryDetail.ShipPrice;
    this.loginModel.DeliveryDate = this.DeliveryDetail.DeliveryDate;
    this.loginModel.PaymentId = localStorage.getItem("PaymentId");
    this.loginModel.TotalPrice = this.totoalPrice
    if (!this.loginModel.PaymentId) {
      this.loginModel.PaymentId = this.PaymentTransaction.paymentID
    }
    localStorage.removeItem("PaymentId");
    this.RequestUrl='checkout/loginCheckout'
   this.tracklog.handleSuccess1(this.description="Step-3-Payment by customer",this.Action="Step-3-User Payment","Request",this.RequestUrl,this.PageUrl,this.Guid)
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
 //   this.tracklog.handleSuccess1(this.description="STEP-3 Email Send Details ToUsers",this.Action="Email Send Details ToUsers",JSON.stringify(this.loginModel),this.RequestUrl,this.PageUrl,this.Guid)

      this._service.SendDetailsToUsers(this.loginModel).subscribe();
      this._service.SendDetailsTopranjal(this.loginModel).subscribe();
      //if(window.location.href.includes("pistis"))
  //  this.tracklog.handleSuccess1(this.description="STEP-3 Email Send Details To Vendor",this.Action="Email Send Details ToUsers",JSON.stringify(this.loginModel),this.RequestUrl,this.PageUrl,this.Guid)

      this._service.SendDetailsToVendor(this.loginModel).subscribe();

    this.tracklog.handleSuccess1(this.description="Payment by customer",this.Action="Step-3-User Payment",JSON.stringify(data),this.RequestUrl,this.PageUrl,this.Guid)
   }
   ,
   error => this.tracklog.handleError(error,this.Action="Step-3-User Payment",this.RequestUrl,this.PageUrl)
    );
  }
  sendMessage(): void {
    this.RequestUrl="/confirmation"
    this.tracklog.handleSuccess1(this.description="going to confirmation page",this.Action="Confirmation page","Request",this.RequestUrl,this.PageUrl,this.Guid)
    this.messageService.sendMessage(this.loginModel);
    this.router.navigate(["/confirmation"]);
  }
  clearMessage(): void {
    this.messageService.clearMessage();
  }
  //Mercado PAgo
  dateError: boolean = false;
  paymentstatus: string = "";
  paymentForm: FormGroup;
  cardlength: boolean;
  cvvlength: boolean;
  onPaymentSubmit(data: any) {
    this.RequestUrl='checkout/loginCheckout'

    this.checkDate();
    if (this.dateError) return false;
    if (data.cardExpirationYear == new Date().getFullYear.toString()) {
      data.cardExpirationYear = new Date();
    }
    this.spinner.show();
    data.cardExpirationYear = data.cardExpirationYear.getFullYear();
    data.UserId = this.UserId;
    data.CartId = this.cartItem[0].Id;
    data.Description = "";
    if (this.cartItem.length > 0) {
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
    if(window.location.href.includes("pistis")){
      this.RequestUrl="https://psapsolutions.com/api/payment/mercadoInstallment";

          }
          else if(window.location.href.includes("localhost")){

            this.RequestUrl= "https://localhost:44343/api/payment/mercadoInstallment";
          }
          else
          this.RequestUrl="http://api.sathfere.com/api/payment/mercadoInstallment";

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
      //this.loading1 = false;
    } else {
      if (this.paymentstatus == "accredited") {
        this.RequestUrl='checkout/loginCheckout'
        this.tracklog.handleSuccess1(this.description="STEP-3 Payment accepted",this.Action="STEP-3 clicked mercado pay button","Payment accepted",this.RequestUrl,this.RequestUrl,this.Guid)

        //this.loading1 = true;
        this.pay();
      } else {
        var lang = localStorage.getItem("browseLang");

      if (this.paymentstatus == "rejected") {
        this.tracklog.handleError2("Payment was rejected. The user may retry payment.",this.Action="STEP-3 clicked mercado pay button",this.RequestUrl,this.PageUrl,this.Guid)

        if (lang == "english") {
          this.toster.error("Payment was rejected. The user may retry payment.")
        } else {
          this.toster.error("pago fue rechazado. El usuario puede volver a intentar el pago.")
        }
      }
      else if (this.paymentstatus == "cancelled") {
      this.tracklog.handleError2("Payment was cancelled by user.",this.Action="STEP-3 clicked mercado pay button",this.RequestUrl,this.PageUrl,this.Guid)

        if (lang == "english") {
          this.toster.error("Payment was cancelled by one of the parties or because time for payment has expired")
        } else {
          this.toster.error("pago fue cancelado por una de las partes o porque el tiempo de pago ha expirado")
        }
      }
      else
      this.toster.error(this.paymentstatus)
      this.tracklog.handleError2("Payment was cancelled. Due to invalid parameters entered by user",this.Action="STEP-3 clicked mercado pay button",this.RequestUrl,this.PageUrl,this.Guid)

        this.spinner.hide();
        this.paymentForm.patchValue({
          cardNumber: '',
          securityCode: '',
          cardExpirationMonth:'',
          cardExpirationYear:'',
        });
        this.emiForm.patchValue({
          cardNumber: '',
          securityCode: '',
          cardExpirationMonth:'',
          cardExpirationYear:'',
        });
        //this.toster.error(this.paymentstatus)
        //this.loginModel.Status = this.paymentstatus;
        //this.sendMessage();
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
  CurrentYear: any;
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
cardData: CardData = new CardData()
emiPlans: any[] = [];
createEmiFormGroup() {
  return new FormGroup({
    email: new FormControl('', [Validators.required]),
    cardNumber: new FormControl('', [Validators.required, Validators.minLength(12), Validators.maxLength(16)]),
    securityCode: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(3)]),
    cardExpirationMonth: new FormControl('', [Validators.required]),
    cardExpirationYear: new FormControl('', [Validators.required]),
    cardholderName1: new FormControl('', [Validators.required]),
    token: new FormControl(''),
    Amount: new FormControl(''),
    UserId: new FormControl(''),
    CartId: new FormControl(''),
    cardNumberToshow: new FormControl(''),
  });
}
onEmiSubmit(data: any) {
  this.RequestUrl="getting/Emi"
    this.tracklog.handleSuccess1(this.description="STEP-3 Getting emi on checkout",this.Action="STEP-3 clicked on Emi pay button","Request",this.RequestUrl,this.PageUrl,this.Guid)

  this.spinner.show()
  this.lastStep = true;
  this.checkDate();
  if (this.dateError)
    return false;
  if (data.cardExpirationYear == new Date().getFullYear.toString()) {
    data.cardExpirationYear = new Date();
  }
  data.cardExpirationYear = data.cardExpirationYear.getFullYear();
  data.UserId = this.UserId;
  data.CartId = this.cartItem[0].Id;
  data.Description = "";
  if (this.cartItem.length > 0) {
    data.Amount = this.totoalPrice
    var arr: any[] = [];
    this.cartItem.forEach(e => {
      arr.push(e.Name)
    });
    data.Description = arr.join(',');
  }
  ///createEmiToken(data)
  if (this.cartItem.length > 0)
    data.Amount = this.cartItem[0].TotalAmount;
  this.cardData.Amount = this.totoalPrice;
  this.cardData.cardNumber = data.cardNumber;
  this.cardData.securityCode = data.securityCode;
  this.cardData.email = data.email;
  this.cardData.cardholderName = data.cardholderName;
  this.cardData.cardExpirationMonth = data.cardExpirationMonth;
  this.cardData.cardExpirationYear = data.cardExpirationYear;
  this.cardData.Description=data.Description;
  this.cardData.CartId=data.CartId;
  //getpaymentmethod(data.cardNumber)

  installment(data.cardNumber, this.totoalPrice)

  this.getEmiPlans();
}
openCardForm(){

  this.openEMIDiv=false;
  this.isCardFilled=false;
  this.paymentForm.patchValue({
    cardNumber: '',
    securityCode: '',
    cardExpirationMonth:'',
    cardExpirationYear:'',
  });
  this.emiForm.patchValue({
    cardNumber: '',
    securityCode: '',
    cardExpirationMonth:'',
    cardExpirationYear:'',
  });
}
getEmiPlans() {

  this.emiPlans=[];
  this.emiPlans = JSON.parse(localStorage.getItem("plans")) as any[];
  this.tracklog.handleSuccess1(this.description="STEP-3 Getting emi on checkout",this.Action="STEP-3 clicked on Emi pay button",JSON.stringify(this.emiPlans),this.RequestUrl,this.PageUrl,this.Guid)

  if (this.emiPlans == null || this.emiPlans.length == 0) {
    setTimeout(() => {
      this.getEmiPlans();
    }, 5000);
  }
  else {
    this.spinner.hide();
    this.openEMIDiv=true;
    this.isCardFilled=true;
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
    this.RequestUrl="checkout/loginCheckout"
    this.tracklog.handleSuccess1(this.description="STEP-3 select emi plan",this.Action="STEP-3 clicked on Emi pay button",JSON.stringify(result),this.RequestUrl=this.PageUrl,this.RequestUrl,this.Guid)

    this.cardData.installmentRate = result.installment_rate;
    this.cardData.IssuerId = localStorage.getItem("IssuerId")
    localStorage.removeItem("IssuerId")
    this.cardData.installmentamount = result.installment_amount;
    this.cardData.installments = result.installments
    this.cardData.userId = this.UserId
    installment(this.cardData.cardNumber,this.cardData.Amount)
    createEmiToken(this.cardData)
    this.getEmiPaymentStatus();
  }
}
getEmiPaymentStatus() {
  if(window.location.href.includes("pistis")){
    this.RequestUrl="https://psapsolutions.com/api/payment/mercadoInstallment";

        }
        else if(window.location.href.includes("localhost")){

          this.RequestUrl= "https://localhost:44343/api/payment/mercadoInstallment";
        }
        else
        this.RequestUrl="http://api.sathfere.com/api/payment/mercadoInstallment";

  this.paymentstatus = localStorage.getItem("PaymentStatus");
  localStorage.setItem("PaymentStatus", "");
  if (this.paymentstatus == "" || this.paymentstatus == undefined || this.paymentstatus == null) {
    setTimeout(() => {
      this.getPaymentStatus();
    }, 5000);
  }
  else {
    if (this.paymentstatus == "accredited") {
      this.RequestUrl="checkout/loginCheckout"
      this.tracklog.handleSuccess1(this.description="STEP-3 emi payment accredited",this.Action="STEP-3 clicked on Emi pay button",JSON.stringify(this.cardData.installmentamount+"Emi Payment successful."),this.RequestUrl=this.PageUrl,this.RequestUrl,this.Guid)

      this.pay();
    }
    else {

      var lang = localStorage.getItem("browseLang");

      if (this.paymentstatus == "rejected") {
        this.RequestUrl="checkout/loginCheckout"
        //  this.tracklog.handleSuccess1(this.description="STEP-3 emi payment rejected",this.Action="STEP-3 Clicked on Emi pay button","Emi payment rejected",this.RequestUrl=this.PageUrl,this.RequestUrl,this.Guid)
          this.tracklog.handleError2("Payment was rejected. The user may retry payment.",this.Action="STEP-3 Clicked on Emi pay button",this.RequestUrl,this.PageUrl,this.Guid)

        if (lang == "english") {
          this.toster.error("Payment was rejected. The user may retry payment.")
        } else {
          this.toster.error("pago fue rechazado. El usuario puede volver a intentar el pago.")
        }
      }
      else if (this.paymentstatus == "cancelled") {
        this.RequestUrl="checkout/loginCheckout"
        //  this.tracklog.handleSuccess1(this.description="STEP-3 emi payment cancelled",this.Action="STEP-3 Clicked on Emi pay button","Emi payment cancelled",this.RequestUrl=this.PageUrl,this.RequestUrl,this.Guid)
        this.tracklog.handleError2("Payment was cancelled by the user.",this.Action="STEP-3 clicked mercado pay button",this.RequestUrl,this.PageUrl,this.Guid)

        if (lang == "english") {
          this.toster.error("Payment was cancelled by one of the parties or because time for payment has expired")
        } else {
          this.toster.error("pago fue cancelado por una de las partes o porque el tiempo de pago ha expirado")
        }
      }
      else
      this.toster.error(this.paymentstatus)
      this.tracklog.handleError2("Payment was cancelled. Due to invalid parameters entered by user",this.Action="STEP-3 clicked mercado pay button",this.RequestUrl,this.PageUrl,this.Guid)

      this.spinner.hide();
      this.paymentForm.patchValue({
        cardNumber: '',
        securityCode: '',
        cardExpirationMonth:'',
        cardExpirationYear:'',
      });
      this.emiForm.patchValue({
        cardNumber: '',
        securityCode: '',
        cardExpirationMonth:'',
        cardExpirationYear:'',
      });
      this.emiPlans=[];
      //this.loginModel.Status = this.paymentstatus;
      //this.sendMessage();
    }
  }
}
//////////////////////////////////paypal//////////////////
env: string;
addScript: boolean = false;
paypalLoad: boolean = true;
finalAmount: number = 1;
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
  if (window.location.href.includes("pistis"))
    return this.env = "production";
  else
    return this.env = "sandbox";
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
  var abc=  this.route.url

    return actions.payment.execute().then(payment => {
      this.PaymentTransaction.UserId =+ localStorage.getItem("UserId");
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
      //if (data.state != undefined)
        this.PaymentTransaction.StatusDetail = "accredited";
      this.paymentstatus = "accredited";
      this._service.sendPaymentDetails(this.PaymentTransaction).subscribe(x => {

        this.RequestUrl=this.env
        this.tracklog.handleSuccess1(this.description="STEP-3 Payment successfull",this.Action="STEP-3-Paypal option",JSON.stringify(this.PaymentTransaction),this.RequestUrl,this.PageUrl,this.Guid)

        this.pay();
        });

    });
  },

  onError: err => {
    debugger
      console.log('OnError', err);
      this.tracklog.handleError2(err,this.Action="STEP-3-Paypal option",this.RequestUrl,this.PageUrl,this.Guid)

      //this.showError = true;
  },

  onCancel: (data, actions) => {

//this.tracklog.handleSuccess1(this.description="STEP-3 Paypal payment cancelled by user",this.Action="STEP-3-Paypal option","Cancelled",this.RequestUrl=this.PageUrl,this.PageUrl,this.Guid)
this.tracklog.handleError2("STEP-3 Paypal payment cancelled by user",this.Action="STEP-3-Paypal option",this.RequestUrl,this.PageUrl,this.Guid)


    //  this.showCancel = true;

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
///////Paypal End
  //step3 end
}
