import { Component, OnInit, ViewChild } from "@angular/core";
import { MycartService } from "./mycart.service";
import { GetCart, MyCartModel } from "./mycartModel";
import { ToastrService } from "ngx-toastr";
//import { HeaderComponent } from "../header/header.component";
import { ShippingGatewayService } from "../CommonServices/ShippingGateService";
import { NgxSpinnerService } from "ngx-spinner";
import { UserLogService } from '../../services/user-log.service';
import { Router } from '@angular/router';
import { HeaderComponent } from '../header/header.component';
import { Tracklog } from '../../services/Tracklog.service';
import { DomSanitizer } from '@angular/platform-browser';
import { ApplicationStateServiceService } from '../../services/application-state-service.service';
import { CommonHeaderService } from '../header/header.service';

@Component({
selector: "app-mycart",
templateUrl: "./mycart.component.html",
styleUrls: ["./mycart.component.css"]
})
export class MycartComponent {

  @ViewChild(HeaderComponent,{static:false}) headerData: HeaderComponent;

  isMobileResolution: boolean=false;
  model: MyCartModel;
  myViewModel: MyCartModel;
  UserId: number;
  PageUrl:string
  RequestUrl:string
  Guid: string;
  description:string
  Action:string

  constructor(
    public service: MycartService,
    private toastr: ToastrService,
    public shipService: ShippingGatewayService,
    private spinner: NgxSpinnerService,
    private userLog:UserLogService,
    private Router:Router,
    public tracklog:Tracklog,
    private sanitizer:DomSanitizer,
    private applicationStateService:ApplicationStateServiceService,
  ) {

  this.model = new MyCartModel(sanitizer);
  this.myViewModel = new MyCartModel(sanitizer);
  //this.loadView();
  this.updateView();
  this.isMobileResolution = applicationStateService.getIsMobileResolution();
 }
 private updateView():void{this.myViewModel = this.model.clone();}
public loadView():void {
  this.PageUrl=  this.Router.url
  this.Guid=this.tracklog.newGuid()
  this.myViewModel.slanguage = localStorage.getItem("browseLang");
    this.myViewModel.slanguage = localStorage.getItem('browseLang')
    this.UserId=+localStorage.getItem("UserId")
    this.getcart();
    this.myViewModel.Url = this.Router.url;
      this.userLog.UserLog(this.productId, 1, this.myViewModel.Url, 1);
  }

PlaceOrder(){
  debugger
  this.service.placeOrderChecking( this.myViewModel.cartItem[0].Id ).subscribe((data:any)=>{
    debugger

    if(data.some(function(obj){return obj.IsStockAvailable===false}))
    {
      var lang = localStorage.getItem("browseLang");
      data.forEach(e => {
        if(!e.IsStockAvailable)
        {
          if (lang == "english") {
            this.toastr.warning(
              "currently " +
              e.MaxStock +
              " units is available in stock."
            );
          } else {
            this.toastr.warning(
              "actualmente " +
              e.MaxStock +
              " unidades Está disponible en stock."
            );
          }
        }
      });
    }
    else
    {
      if(this.UserId>0)
      this.Router.navigate(['/checkout-process/checkout']);
      else
      this.Router.navigate(['/checkout-process/checkout-login'])
    }
  })
}
  saveForLater(VariantId: number, CartItemId: any) {
    this.RequestUrl="category/AddWishListProduct?variantId=" + VariantId +"&UserId=" + this.myViewModel.customerId
    this.tracklog.handleSuccess1(this.description="Item is saved for later on my cart page",this.Action="Item is saved for later",JSON.stringify("Request"),this.RequestUrl,this.PageUrl,this.Guid)

    this.service.getProductDetails1(VariantId).subscribe(data => {

      if (data == 1) {
       // this.tracklog.handleSuccess(this.myViewModel.description="Item is saved for later on my cart page",this.myViewModel.Action="Item is saved for later",JSON.stringify(data))
        this.tracklog.handleSuccess1(this.description="Item is saved for later on my cart page",this.Action="Item is saved for later",JSON.stringify(data),this.RequestUrl,this.PageUrl,this.Guid)

        this.removeItemAlso(CartItemId);
        //this.getcart();
        var lang = localStorage.getItem("browseLang");
        if (lang == "english") {
          this.toastr.success("Item has been saved for later.");
        } else {
          this.toastr.success("El artículo se ha guardado para más tarde.");
        }
      } else {
        this.removeItemAlso(CartItemId);
        //this.getcart();
        var lang = localStorage.getItem("browseLang");
        if (lang == "english") {
          this.toastr.info("Item has been already saved for later.");
        } else {
          this.toastr.info("El artículo ya se ha guardado para más tarde.");
        }
      }
    }
    ,
	    error => this.tracklog.handleError1(error,this.Action="Item is saved for later",this.RequestUrl,this.PageUrl,this.Guid)


    );
  }

  removeItemAlso(CartItemId: number) {
    this.RequestUrl='cart/removeItem?id='+CartItemId
    this.tracklog.handleSuccess1(this.description="Item is removed on my cart page",this.Action="Item removing from cart",JSON.stringify("Request"),this.RequestUrl,this.PageUrl,this.Guid)

    this.service.removeItem(CartItemId).subscribe(data => {
      this.getcart();

      this.headerData.ngOnInit()
    },
    error => this.tracklog.handleError1(error,this.myViewModel.Action="Item removing from cart on save forlater",this.RequestUrl,this.PageUrl,this.Guid)
  //  error => this.tracklog.handleError(error,this.myViewModel.Action="Item removing from cart on save forlater")
    );
  }
  removeItem(CartItemId: number) {
    this.RequestUrl='cart/removeItem?id='+CartItemId
    this.tracklog.handleSuccess1(this.description="Item is removed on my cart page",this.Action="Item removing from cart",JSON.stringify("Request"),this.RequestUrl,this.PageUrl,this.Guid)

    this.service.removeItem(CartItemId).subscribe(data => {
      this.getcart();
      this.headerData.ngOnInit()
      var lang = localStorage.getItem("browseLang");
     // this.tracklog.handleSuccess(this.myViewModel.description="Item is removed on my cart page",this.myViewModel.Action="Item removing from cart",JSON.stringify(data))
      this.tracklog.handleSuccess1(this.description="Item is removed on my cart page",this.Action="Item removing from cart",JSON.stringify(data),this.RequestUrl,this.PageUrl,this.Guid)

      if (lang == "english") {
        this.toastr.success("Item removed successfully.");
      } else {
        this.toastr.success("Artículo eliminado con éxito.");
      }
    },
    error => this.tracklog.handleError1(error,this.Action="Item removing from cart",this.RequestUrl,this.PageUrl,this.Guid)

    );
  }
  quantityChange(q, Id) {

    this.myViewModel.cartItem.forEach(a => {
      if (a.CartItemId == Id) {
        if (a.InStock >= q) {
          this.RequestUrl='cart/updateQuantity?quantity='+q+"&Id="+Id
          this.tracklog.handleSuccess1(this.description="Quantity increment  on my cart page",this.Action="Quantity change in My cart",JSON.stringify("Request"),this.RequestUrl,this.PageUrl,this.Guid)

          this.service.updateQuantity(q, Id).subscribe(data => {
    //  this.tracklog.handleSuccess(this.myViewModel.description="Quantity change  on my cart page",this.myViewModel.Action="Quantity change in My cart",JSON.stringify(data))
      this.tracklog.handleSuccess1(this.myViewModel.description="Quantity change  on my cart page",this.myViewModel.Action="Quantity change in My cart",JSON.stringify(data),this.RequestUrl,this.PageUrl,this.Guid)

            this.getcart();
          },
          error => this.tracklog.handleError1(error,this.Action="Quantity change in My cart",this.RequestUrl,this.PageUrl,this.Guid)
         // error => this.tracklog.handleError(error,this.myViewModel.Action="Quantity change in My cart")
          );
        } else {
          var lang = localStorage.getItem("browseLang");
          if (lang == "english") {
            this.toastr.warning(
              "currently " +
              a.InStock +
              " units of " +
              a.Name +
              " is available in stock."
            );
          } else {
            this.toastr.warning(
              "actualmente " +
              a.InStock +
              " unidades de" +
              a.Name +
              " Está disponible en stock."
            );
          }

          this.getcart();
        }
      }
    });
  }
  increment(q, Id) {

    let quantity = q + 1;
    this.myViewModel.cartItem.forEach(a => {
      if (a.CartItemId == Id) {
        if (a.InStock >= quantity) {
          this.service.updateQuantity(quantity, Id).subscribe(data => {
     // this.tracklog.handleSuccess(this.myViewModel.description="Quantity increment  on my cart page",this.myViewModel.Action="Quantity change in My cart",JSON.stringify(data))
      this.RequestUrl='cart/updateQuantity?quantity='+quantity+"&Id="+Id
      this.tracklog.handleSuccess1(this.description="Quantity increment  on my cart page",this.Action="Quantity change in My cart",JSON.stringify("Request"),this.RequestUrl,this.PageUrl,this.Guid)

            this.getcart();
          }
          ,
          error => this.tracklog.handleError1(error,this.Action="Quantity change in My cart",this.RequestUrl,this.PageUrl,this.Guid)

         // error => this.tracklog.handleError(error,this.myViewModel.Action="Quantity change in My cart")
          );
        } else {
          var lang = localStorage.getItem("browseLang");
          if (lang == "english") {
            this.toastr.warning(
              "currently " +
              a.InStock +
              " units of " +
              a.Name +
              " is available in stock."
            );
          } else {
            this.toastr.warning(
              "actualmente " +
              a.InStock +
              " unidades de" +
              a.Name +
              " Está disponible en stock."
            );
          }
        }
      }
    });
  }
  decrement(q, Id) {
    if (q == 1) {
    var lang = localStorage.getItem("browseLang");

    if (lang == "english") {
    this.toastr.info("Quantity cannot be less than one.");
    } else {
    this.toastr.success("La cantidad no puede ser menos de un.");
    }

    return false;
    }
    let quantity = q - 1;
    this.RequestUrl='cart/updateQuantity?quantity='+quantity+"&Id="+Id
    this.tracklog.handleSuccess1(this.description="Quantity change  on my cart page",this.Action="Quantity change in My cart",JSON.stringify("Request"),this.RequestUrl,this.PageUrl,this.Guid)

    this.service.updateQuantity(quantity, Id).subscribe(data => {
    //  this.tracklog.handleSuccess(this.myViewModel.description="Quantity decrement  on my cart page",this.myViewModel.Action="Quantity change in My cart",JSON.stringify(data))
      this.tracklog.handleSuccess1(this.description="Quantity change  on my cart page",this.Action="Quantity change in My cart",JSON.stringify(data),this.RequestUrl,this.PageUrl,this.Guid)

    this.getcart();
    },
  //  error => this.tracklog.handleError(error,this.myViewModel.Action="Quantity change in My cart")

    error => this.tracklog.handleError1(error,this.myViewModel.Action="Quantity change in My cart",this.RequestUrl,this.PageUrl,this.Guid)

    );
    }
  CheckData() {

    this.myViewModel.cartItem.forEach(a => {
      if (a.InStock == 0) {
        this.myViewModel.disablebtn = true;
      }
    });
  }

  emptyCart: any = false;
  getcart() {

    this.spinner.show();
    this.myViewModel.customerId = parseInt(localStorage.getItem("UserId"));
    this.myViewModel.ipAddress = localStorage.getItem("IpAddress");
    this.RequestUrl='cart/getCartByCustomer?CustomerId='+this.myViewModel.customerId
    this.tracklog.handleSuccess1(this.description="Cart items  rendering on my cart",this.Action="Cart items rendering","Request",this.RequestUrl,this.PageUrl,this.Guid)

    this.service.getCart(this.myViewModel.customerId, this.myViewModel.ipAddress).subscribe(data => {
       debugger
      this.myViewModel.cartItem = data as GetCart[];

      this.CheckData();
      if (this.myViewModel.cartItem.length > 0) {
        this.LandingVariantId = this.myViewModel.cartItem[0].ProductVariantDetailId;
        this.productId = this.myViewModel.cartItem[0].ProductId;
        this.Quantity = this.myViewModel.cartItem[0].Quantity;

        if (this.PostalCode) {
          this.calculateCharges();
        }
      }
      else
        this.emptyCart = true;
      console.log(this.myViewModel.cartItem);
      this.spinner.hide();
      this.tracklog.handleSuccess1(this.description="Cart items  rendering on my cart",this.Action="Cart items rendering",JSON.stringify(data),this.RequestUrl,this.PageUrl,this.Guid)


    }
    ,
	    error => this.tracklog.handleError1(error,this.Action="Cart items rendering",this.RequestUrl,this.PageUrl,this.Guid)


    );

  }

  //-------------charges
  PostalCode: any;
  productId: any;
  LandingVariantId: any;
  ShippingCharges: any;
  Quantity: any = [];
  City: any;

  ShipModel = {
    DeliveryType: "",
    ResponseFrom: "",
    ShipPrice: 0,
    DeliveryDate: ""
  };

  ShippingError: any;
  isShipError: boolean = false;
  errMsg: any;
  VariantDetailId: any = [];

  calculateCharges() {


    if (!this.myViewModel.cartItem || this.myViewModel.cartItem.length <= 0) {
      return false;
    }
    this.PostalCode = this.PostalCode;
    this.City = '';

    this.productId = [];
    this.myViewModel.cartItem.forEach(element => {
      this.productId.push(element.ProductId);
    });

    this.VariantDetailId = [];
    this.myViewModel.cartItem.forEach(element => {
      this.VariantDetailId.push(element.ProductVariantDetailId);
    });

    this.Quantity = [];
    this.myViewModel.cartItem.forEach(element => {
      this.Quantity.push(element.Quantity);
    });
    this.checkCharges();
  }

  checkCharges() {

    if (+this.PostalCode) {
      var model = {
        CountryCode: "MX",
        Postalcode: this.PostalCode,
        productId: this.productId.join(","),
        variantId: this.VariantDetailId.join(","),
        quantity: this.Quantity.join(","),
        city: this.City
      };

      this.spinner.show();
      this.RequestUrl= + 'shippingGateway/GetQuotesCapabilities?countryCode='
      + model.CountryCode + '&postalCode=' + model.Postalcode
      + '&productId=' + model.productId + '&variantId=' + model.variantId + '&quantity=' + model.quantity + '&city=' + model.city
      this.tracklog.handleSuccess1(this.description="check charges for pin code on my cart page ",this.Action="check charges for pin code","Request",this.RequestUrl,this.PageUrl,this.Guid)

      this.shipService.CalculateCharges(model).subscribe((data: any) => {

        if (data.length > 0) {
          this.ShippingCharges = data;
          this.isShipError = false;
          this.ShippingError = null;
          this.errMsg = "";
        } else {
          if (data.Note === "Failure") {
            this.isShipError = true;
            this.errMsg = "* " + data.Message.split(".")[0];
          }
          //   this.ShippingError = data;
          // this.ShippingError.Message = this.ShippingError.Message.split('.')[0] + ".";
        }
        this.spinner.hide();
        this.tracklog.handleSuccess1(this.description="check charges for pin code on my cart page ",this.Action="check charges for pin code",JSON.stringify(data),this.RequestUrl,this.PageUrl,this.Guid)


      },
	        error => this.tracklog.handleError1(error,this.Action="check charges for pin code",this.RequestUrl,this.PageUrl,this.Guid)

      );
    } else {
      this.isShipError = true;
      var lang = localStorage.getItem("browseLang");
      if (lang == "english") {
        this.errMsg = "* Enter valid postal code";
      } else {
        this.errMsg = "* Ingrese un código postal válido";
      }
      return false;
    }
  }
  //render to detail page
  passTheSalt(Id: number, variantId,event) {
	  this.RequestUrl="/product-details?=Id="+Id+"&variantId="+variantId
    this.tracklog.handleSuccess1(this.description="View product details",this.Action="product details button clicked",JSON.stringify("product-details?Id="+ Id+"&variantId=" +variantId),this.RequestUrl,this.PageUrl,this.Guid)


    if (event.ctrlKey) {
      window.open(this.myViewModel.Url, '_blank'); // in new tab
  } else

    this.Router.navigate(['/product-details'], { queryParams: { Id: Id, variantId: variantId } });
  }
}
