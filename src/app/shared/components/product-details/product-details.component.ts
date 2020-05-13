import {Component,OnInit,HostListener,ViewChild} from "@angular/core";
import { ToastrService } from "ngx-toastr";
import { Router, ActivatedRoute, Data, NavigationEnd } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { UserLogService } from "src/app/shared/services/user-log.service";
import { ProductService } from "./product.service";
//import { Product } from "./product";
//import { } from "node_modules/ng-drift/lib/ng-drift.js";
import { CartItem, MyCart } from "../mycart/mycartModel";
import { MycartService } from "../mycart/mycart.service";
import { ShippingGatewayService } from "../CommonServices/ShippingGateService";
import { SideCategoryModel } from "../productlist/productlist.model";
import { ProductlistService } from "../productlist/productlist.service";
import { GoogleAnalyticsService } from 'src/app/google-analytics.service';
import { filter, map, mergeMap } from 'rxjs/operators';
import { DatePipe } from '@angular/common';
import { HeaderComponent } from '../header/header.component';
import { Tracklog } from '../../services/Tracklog.service';
import { ProductDetailsModel } from './product-details.component.model';
import { DomSanitizer } from '@angular/platform-browser';
import { ApplicationStateServiceService } from '../../services/application-state-service.service';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: "app-product-details",
  templateUrl: "./product-details.component.html",
  styleUrls: ["./product-details.component.css"]
})

export class ProductDetailsComponent  {
  @ViewChild(HeaderComponent,{static:false}) headerData: HeaderComponent;
  json = "http://ipv4.myexternalip.com/json";
  model: ProductDetailsModel;
  myViewModel: ProductDetailsModel;
  isMobileResolution: boolean=false;
  Images: any[]=[];
  Details: any;
  specification: any[]=[];
  reviewData: any;
  PageUrl: string="product-details";
  Guid: string;
  RequestUrl:string
  constructor(
    public tracklog:Tracklog,
    public datepipe: DatePipe,
    private toastr: ToastrService,
    private Router: Router,
    private route: ActivatedRoute,
    private http: HttpClient,
    private userLog: UserLogService,
    private productService: ProductService,
    public cartservice: MycartService,
    public shipService: ShippingGatewayService,
    public myservice: ProductlistService,
    public googleAnalyticsService:GoogleAnalyticsService,
    private sanitizer:DomSanitizer,
    private applicationStateService:ApplicationStateServiceService,
   // public tracklog:Tracklog,
  ) {
    this.model = new ProductDetailsModel(sanitizer);
    this.myViewModel = new ProductDetailsModel(sanitizer);
    //this.loadView();
    this.updateView();
    this.isMobileResolution = applicationStateService.getIsMobileResolution();
   }
   private updateView():void{this.myViewModel = this.model.clone();}

  public loadView():void {
    this.Guid=this.tracklog.newGuid()
    this.Router.events.pipe(
      filter((event) => event instanceof NavigationEnd),
      map(() => this.route),
      map((route) => {
        while (route.firstChild) route = route.firstChild;
        return route;
      }),
      filter((route) => route.outlet === 'primary'),
      mergeMap((route) => route.data)
     ).subscribe((event) => {
       this.productService.updateTitle(event['PISTIS']);
       this.productService.updateOgUrl(event['pistis.com.mx']);
       //Updating Description tag dynamically with title
       this.productService.updateDescription(event['Pistis'] + event[''])
     });


    this.myViewModel.activeHeart = false;
    this.myViewModel.getImage = localStorage.getItem("ProductImage");
    this.myViewModel.myThumbnail =
      "https://wittlock.github.io/ngx-image-zoom/assets/thumb.jpg";
    this.http.get("https://api.ipify.org/?format=json").subscribe(data => {
      this.route.queryParams.subscribe(params => {
        this.myViewModel.productId = params["Id"];
        if (this.myViewModel.productId != null) {
          this.RequestUrl= "tag/getTagsFront?productId="+this.myViewModel.productId
          this.tracklog.handleSuccess1(this.myViewModel.description="Getting product tags on product detail page ",this.myViewModel.Action="Product tag rendering","Request",this.RequestUrl,this.PageUrl,this.Guid)

          this.productService.getProducttags(this.myViewModel.productId).subscribe((x: any[]) => {

              this.myViewModel.tag123 = x;
              //console.log(this.myViewModel.tag123);
              this.tracklog.handleSuccess1(this.myViewModel.description="Getting product tags on product detail page ",this.myViewModel.Action="Product tag rendering",JSON.stringify(x),this.RequestUrl,this.PageUrl,this.Guid)
            }
            ,
    error => this.tracklog.handleError1(error,this.myViewModel.Action="Product tag rendering",this.RequestUrl,this.PageUrl,this.Guid)
            );
     this.getLikeProducts(this.myViewModel.productId)

        }
        this.myViewModel.LandingVariantId = params["variantId"];

        this.ActiveCheck();
//new
this.RequestUrl="category/getProductDetails?Id=" + this.myViewModel.productId + "&variantId=" +  this.myViewModel.LandingVariantId
this.tracklog.handleSuccess1(this.myViewModel.description="Getting product details on product detail page",this.myViewModel.Action="product details rendering","Request",this.RequestUrl,this.PageUrl,this.Guid)


this.productService.getDetails(this.myViewModel.productId, this.myViewModel.LandingVariantId).subscribe(detail=>{
  this.Details=detail;

  this.tracklog.handleSuccess1(this.myViewModel.description="Getting product details on product detail page",this.myViewModel.Action="product details rendering",JSON.stringify(detail),this.RequestUrl,this.PageUrl,this.Guid)
}
,
error => this.tracklog.handleError1(error,this.myViewModel.Action="product details rendering",this.RequestUrl,this.PageUrl,this.Guid)
);


this.productService.getImages(this.myViewModel.productId, this.myViewModel.LandingVariantId).subscribe((img:any[])=>{
  this.Images=img;
  this.myViewModel.varientImage = this.Images[0].LandingImage;

})
this.productService.getSpecifications(this.myViewModel.LandingVariantId).subscribe((spec:any[])=>{
  this.specification=spec;
})
this.productService.getVariants(this.myViewModel.productId, this.myViewModel.LandingVariantId).subscribe((vari:any)=>{
  debugger
  this.myViewModel.product=vari;
  this.myViewModel.product.Variant =vari.Variant.filter(order => order.Name!= "Default");
})
this.productService.getReviews(this.myViewModel.productId, this.myViewModel.LandingVariantId).subscribe(review=>{
  this.reviewData=review;
})
this.RequestUrl='products/getbreadcrumb?Id='+this.myViewModel.product.ProductCategoryId
this.tracklog.handleSuccess1(this.myViewModel.description="Getting product bread crumb on product detail page",this.myViewModel.Action="get bread crumb","Request",this.RequestUrl,this.PageUrl,this.Guid)

this.myservice
.getbreadcrumb(this.myViewModel.product.ProductCategoryId)
.subscribe(all => {
  this.myViewModel.maincat = all;
  this.tracklog.handleSuccess1(this.myViewModel.description="Getting product bread crumb on product detail page",this.myViewModel.Action="get bread crumb",JSON.stringify(all),this.RequestUrl,this.PageUrl,this.Guid)
}
,
error => this.tracklog.handleError1(error,this.myViewModel.Action="get bread crumb",this.RequestUrl,this.PageUrl,this.Guid)
);
    //     this.productService.getProductDetails(this.myViewModel.productId, this.myViewModel.LandingVariantId)
    //       .subscribe(res => {
    //         console.log(res)

    //         this.myViewModel.product = res;
    //         this.myViewModel.product.Variant = this.myViewModel.product.Variant.filter(order => order.Name!= "Default");
    //         this.myViewModel.varientImage = this.myViewModel.product.LandingImage450;

    //           this.tracklog.handleSuccess(this.myViewModel.description="Getting product details on product detail page",this.myViewModel.Action="product details rendering",JSON.stringify(res))
    //       }
    //       ,
    // error => this.tracklog.handleError(error,this.myViewModel.Action="product details rendering")
    //       );
      });
      this.myViewModel.Url = this.Router.url;
      this.userLog.UserLog(this.myViewModel.productId, 1, this.myViewModel.Url, 1);
      // this.saveBrowseHistory(this.ipAddress ,this.validUser as number,this.productId as number).subscribe()
    });
    //   this.ipAddress=data['ip'])
    // console.log(this.ipAddress);
  }

  getLikeProducts(Id){
    this.productService.getLikeProducts(Id).subscribe(p=>{

      this.myViewModel.likeProducts=p as[]
    },
    )
  }
  passTheSalt1(Id: number, variantId,event) {
    if (event.ctrlKey) {
      window.open(this.myViewModel.Url, '_blank'); // in new tab
  } else
  {this.RequestUrl="/allreviews"
  this.tracklog.handleSuccess1(this.myViewModel.description="View product allreviews",this.myViewModel.Action="product allreviews",JSON.stringify("allreviews?Id="+this.myViewModel.productId+"&variantId=" +this.myViewModel.LandingVariantId),this.RequestUrl,this.PageUrl,this.Guid)
    this.Router.navigate(['/product-details'], { queryParams: { Id: Id, variantId: variantId } });
    window.scroll(0,0);}
  }
  passTheSalt() {
    this.RequestUrl="/allreviews"
    this.tracklog.handleSuccess1(this.myViewModel.description="View product allreviews",this.myViewModel.Action="product allreviews",JSON.stringify("allreviews?Id="+this.myViewModel.productId+"&variantId=" +this.myViewModel.LandingVariantId),this.RequestUrl,this.PageUrl,this.Guid)

    //  alert('ghjh')
    this.Router.navigate(["/allreviews"], {
      queryParams: { Id: this.myViewModel.productId, variantId: this.myViewModel.LandingVariantId }
    });
  }
  addCompare() {
    this.RequestUrl="compare/SaveCompareProduct?variantId=" + this.myViewModel.LandingVariantId
    if (this.myViewModel.ComporeProduct.length == 0) {
      this.tracklog.handleSuccess1(this.myViewModel.description="Product adding to compare from product detail page",this.myViewModel.Action="Compare product","Request",this.RequestUrl,this.PageUrl,this.Guid)

      this.myViewModel.ComporeProduct.push(this.myViewModel.LandingVariantId);
      this.productService
        .SaveCompareProduct(this.myViewModel.LandingVariantId)
        .subscribe((x: any) => {
          if (x >= 1) {
            this.headerData.ngOnInit();
            localStorage.setItem("compareCount", x);
            this.toastr.clear();
            var lang = localStorage.getItem("browseLang");
            if (lang == "english") {
              this.toastr.success("Product added to compare.");
            } else {
              this.toastr.success("Producto agregado para comparar.");
            }

          } else {
            this.toastr.clear();
            var lang = localStorage.getItem("browseLang");
            if (lang == "english") {
              this.toastr.info("Product is already add to compare.");
            } else {
              this.toastr.info("El producto ya está agregado para comparar.");
            }
          }
          this.tracklog.handleSuccess1(this.myViewModel.description="Product adding to compare from product detail page",this.myViewModel.Action="Compare product","added",this.RequestUrl,this.PageUrl,this.Guid)
        },
        error => this.tracklog.handleError1(error,this.myViewModel.Action="Compare product",this.RequestUrl,this.PageUrl,this.Guid)

        );
    } else {
      var find = this.myViewModel.ComporeProduct.find(element => {
        return element == this.myViewModel.LandingVariantId;
      });
      if (find == undefined) {
        this.myViewModel.ComporeProduct.push(this.myViewModel.LandingVariantId);
      } else {
        var lang = localStorage.getItem("browseLang");
        if (lang == "english") {
          this.toastr.info("Product is already add to compare.");
        } else {
          this.toastr.info("El producto ya está agregado para comparar.");
        }
      }
    }
  }
  addtags(val: string) {
    this.RequestUrl= "tag/AddTag?productId=" + this.myViewModel.productId + "&tagname=" + val
    this.tracklog.handleSuccess1(this.myViewModel.description="Product tag is added by user on product detail page",this.myViewModel.Action="Product tag adding","Request",this.RequestUrl,this.PageUrl,this.Guid)

    this.productService.addtags(this.myViewModel.productId, val).subscribe(x => {
      if (x == 1) {
        var lang = localStorage.getItem("browseLang");
        if (lang == "english") {
          this.toastr.success("Tag added successfully.");
        } else {
          this.toastr.success("Etiqueta agregada con éxito.");
        }

        this.myViewModel.CustomerTags = "";
        this.productService.getProducttags(this.myViewModel.productId).subscribe(x => {
          this.myViewModel.tag123 = x;
        });
      }
      this.tracklog.handleSuccess1(this.myViewModel.description="Product tag is added by user on product detail page",this.myViewModel.Action="Product tag adding","added",this.RequestUrl,this.PageUrl,this.Guid)
    },
    error => this.tracklog.handleError1(error,this.myViewModel.Action="Product tag adding",this.RequestUrl,this.PageUrl,this.Guid)

    );
  }

  ActiveCheck() {
    // this.RequestUrl="category/checkWishList?VarientId="+this.myViewModel.LandingVariantId
     //this.tracklog.handleSuccess1(this.myViewModel.description="Item adding to wishlist from product detail",this.myViewModel.Action="Wishlist product","Request",this.RequestUrl,this.PageUrl,this.Guid)

     this.productService.checkWishlist(this.myViewModel.LandingVariantId).subscribe(x => {
       if (x == 1) {
         this.myViewModel.activeHeart = true;
       } else {
         this.myViewModel.activeHeart = false;
       }
     //  this.tracklog.handleSuccess1(this.myViewModel.description="Item adding to wishlist from product detail",this.myViewModel.Action="Wishlist product",JSON.stringify(x),this.RequestUrl,this.PageUrl,this.Guid)
       }
       //,
       //error => this.tracklog.handleError1(error,this.myViewModel.Action="Wishlist product",this.RequestUrl,this.PageUrl,this.Guid)

     );
   }

   deleteWishProduct() {
    this.RequestUrl="category/deleteWishProduct?VarientId="+this.myViewModel.LandingVariantId

    this.productService.deleteproduct(this.myViewModel.LandingVariantId).subscribe(x => {
      if (x == 1) {
        this.myViewModel.activeHeart = false;

    this.tracklog.handleSuccess1(this.myViewModel.description="Item removing from wishlist on product detail",this.myViewModel.Action="Wishlist product","Request",this.RequestUrl,this.PageUrl,this.Guid)
    this.tracklog.handleSuccess1(this.myViewModel.description="Item removed from wishlist on product detail",this.myViewModel.Action="Wishlist product","Removed",this.RequestUrl,this.PageUrl,this.Guid)

      } else {
        this.myViewModel.activeHeart = true;

    this.tracklog.handleSuccess1(this.myViewModel.description="Item adding from wishlist on product detail",this.myViewModel.Action="Wishlist product","Request",this.RequestUrl,this.PageUrl,this.Guid)
    this.tracklog.handleSuccess1(this.myViewModel.description="Item added from wishlist on product detail",this.myViewModel.Action="Added","Request",this.RequestUrl,this.PageUrl,this.Guid)

      }
    },
    error => this.tracklog.handleError1(error,this.myViewModel.Action="Wishlist product",this.RequestUrl,this.PageUrl,this.Guid)


    );
  }

  onSend(val: number) {

    if (val == 1) {
      this.myViewModel.activeHeart = true;
      var lang = localStorage.getItem("browseLang");
      if (lang == "english") {
        this.toastr.success("Added to wishlist.");
      } else {
        this.toastr.success("Añadido a la lista de deseos.");
      }

      this.productService
        .getProductDetails1(this.myViewModel.LandingVariantId)
        .subscribe(res => {

          //this.list = res as []
        });
    } else {

      this.myViewModel.activeHeart = false;
      this.deleteWishProduct();
    }
  }
  demoTrigger = document.querySelector(".demo-trigger");
  paneContainer = document.querySelector(".detail");

  // new Drift(demoTrigger, {
  //   paneContainer: paneContainer,
  //   inlinePane: false,
  // });

  // @HostListener('window:unload', [ '$event' ])
  // unloadHandler(event) {
  //
  // // ...
  // localStorage.setItem('LogOutDate', this.date.toDateString() );
  // this.userLog.UserLog(this.productId,1,this.Url,1)
  // }

  @HostListener("window:beforeunload", ["$event"])
  beforeUnloadHander(event) {
    this.myViewModel.date = new Date();
    localStorage.setItem("LogOutDate", this.myViewModel.date);
    // localStorage.setItem('LogInDate', this.date );
    this.myViewModel.DataCue = localStorage.getItem("LogOutDate");
   // console.log(this.myViewModel.DataCue);
    this.userLog.UserLog(this.myViewModel.productId, 1, this.myViewModel.Url, 1);
  }

  saveBrowseHistory(IpAddress, customerId: number, productId: number) {
    this.myViewModel.data.CustomerId = customerId;
    this.myViewModel.data.IpAddress = IpAddress;
    this.myViewModel.data.ProductId = productId;
    return this.http.post(
      "http://api.sathfere.com/api/CustomerHistory/saveCustomerHistory",
      this.myViewModel.data
    );
  }

  getFilterData(color, variantId, optionId, event) {

    if (!color) {
      $(event.target.parentElement.previousElementSibling).attr("unchecked");
      return false;
    } else {
      var selectOptions = [];
      var select = $(
        event.target.parentElement.parentElement.parentElement.parentElement
          .parentElement.parentElement.parentElement.parentElement.parentElement
          .previousElementSibling
      ).find("select");
      var size = select.length;
      for (var i = 0; i < size; i++) {
        selectOptions.push(parseInt(select[i].value));
      }
      selectOptions.push(optionId);
      this.productService
        .filterVariantDetails(this.myViewModel.productId, selectOptions.join(","))
        .subscribe((data: any) => {
          if (!data || !data.VariantDetailId) {
            $(event.target.parentElement.previousElementSibling).attr(
              "unchecked"
            );
            this.toastr.clear();
            var lang = localStorage.getItem("browseLang");
            if (lang == "english") {
              this.toastr.error(
                "Sorry this variant is not available currently !"
              );
            } else {
              this.toastr.error(
                "Lo sentimos, esta variante no está disponible actualmente."
              );
            }

            return false;
          } else {

            this.myViewModel.product = data;
            this.myViewModel.product.Variant = this.myViewModel.product.Variant.filter(order => order.Name!= "Default");
            this.myViewModel.product.ActiveTo=this.datepipe.transform(this.myViewModel.product.ActiveTo, 'yyyy-MM-dd');
            this.myViewModel.LandingVariantId = data.VariantDetailId;
            this.myViewModel.varientImage = this.myViewModel.product.LandingImage450;
            //console.log(this.myViewModel.product);
          }
        });
    }
  }

  onclick(id: number) {
    this.Router.navigate(["/header"], { queryParams: { Id: id } });
  }

  // @HostListener('mousemove', ['$event'] )
  // zoomIn(event) {
  //
  //   var element = document.getElementById("overlay");
  //   element.style.display = "inline-block";
  //   var img = document.getElementById("imgZoom");
  //   var posX = event.offsetX ? (event.offsetX) : event.pageX - img.offsetLeft;
  //   var posY = event.offsetY ? (event.offsetY) : event.pageY - img.offsetTop;
  //   element.style.backgroundPosition=(-posX*2)+"px "+(-posY*4)+"px";

  // }

  // zoomOut() {
  //
  //   var element = document.getElementById("overlay");
  //   element.style.display = "none";
  // }
  //display image as main image
  getValue(val:any,i:any) {

this.myViewModel.varientImage=this.Images[i].Image450;
  }

  getQuantity(event: any, variantId) {
    debugger
    this.myViewModel.selectedQuantity = event.target.value;
}

getVarientOptionId(event: any, variantId) {
  this.RequestUrl= "category/getImages?Id="
  this.tracklog.handleSuccess1(this.myViewModel.description="Getting product varients ",this.myViewModel.Action="Getting product varients","Request",this.RequestUrl,this.PageUrl,this.Guid)

  var id = event.target.value;
  this.productService
    .getVariantDetails(id, this.myViewModel.productId)
    .subscribe((data: any) => {
      if (!data || !data.VariantDetailId) {
        this.toastr.clear();
        var lang = localStorage.getItem("browseLang");
        if (lang == "english") {
          this.toastr.error(
            "Sorry this variant is not available currently !"
          );
        } else {
          this.toastr.error(
            "Lo sentimos, esta variante no está disponible actualmente !"
          );
        }

        return false;
      } else {
        this.myViewModel.product = data;
        this.myViewModel.product.Variant = this.myViewModel.product.Variant.filter(order => order.Name!= "Default");
        this.myViewModel.LandingVariantId = data.VariantDetailId;
        this.myViewModel.varientImage = this.myViewModel.product.LandingImage450;
        console.log(this.myViewModel.product);
      }
     // this.tracklog.handleSuccess(this.myViewModel.description="Getting product varients ",this.myViewModel.Action="Getting product varients",JSON.stringify(data))
      this.tracklog.handleSuccess1(this.myViewModel.description="Getting product varients ",this.myViewModel.Action="Getting product varients",JSON.stringify(data),this.RequestUrl,this.PageUrl,this.Guid)
    }
    ,
  error => this.tracklog.handleError1(error,this.myViewModel.Action="Getting product varients",this.RequestUrl,this.PageUrl,this.Guid)
    );
}

getVarientOptions(event: any, variantId) {
  this.RequestUrl="category/filterVariantDetails?productID="
  this.tracklog.handleSuccess1(this.myViewModel.description="Getting product varients ",this.myViewModel.Action="Getting product varients","Request",this.RequestUrl,this.PageUrl,this.Guid)

  var selectOptions = [];
  var select = $(event.target.parentElement.parentElement.parentElement).find(
    "select"
  );
  var size = select.length;
  for (var i = 0; i < size; i++) {
    selectOptions.push(parseInt(select[i].value));
  }
  this.productService
    .filterVariantDetails(this.myViewModel.productId, selectOptions.join(","))
    .subscribe((data: any) => {
      if (!data || !data.VariantDetailId) {
        this.toastr.clear();
        var lang = localStorage.getItem("browseLang");
        if (lang == "english") {
          this.toastr.error(
            "Sorry this variant is not available currently !"
          );
        } else {
          this.toastr.error(
            "Lo sentimos, esta variante no está disponible actualmente !"
          );
        }

        return false;
      } else {

        this.myViewModel.product = data;
        this.myViewModel.product.Variant = this.myViewModel.product.Variant.filter(order => order.Name!= "Default");

        this.myViewModel.LandingVariantId = data.VariantDetailId;
        this.myViewModel.varientImage = this.myViewModel.product.LandingImage450;
        console.log(this.myViewModel.product);
      }

      this.tracklog.handleSuccess1(this.myViewModel.description="Getting product varients ",this.myViewModel.Action="Getting product varients",JSON.stringify(data),this.RequestUrl,this.PageUrl,this.Guid)
    }
    ,
  error => this.tracklog.handleError1(error,this.myViewModel.Action="Getting product varients",this.RequestUrl,this.PageUrl,this.Guid)

    );
}

addToCart() {
  this.RequestUrl='cart/addToCart'
  this.tracklog.handleSuccess1(this.myViewModel.description="Prouct Adding to cart from product detail",this.myViewModel.Action="add To Cart","Request",this.RequestUrl,this.PageUrl,this.Guid)

  this.myViewModel.Products.push(this.myViewModel.product);
  let pro = this.myViewModel.Products;
  let item: CartItem = new CartItem();
  item.ProductVariantDetailId = this.myViewModel.LandingVariantId;
  item.UnitPrice = pro[0].SellingPrice;
  item.Discount = pro[0].Discount;
  item.Quantity=this.myViewModel.selectedQuantity;
  item.Amount = pro[0].PriceAfterdiscount;
  item.ShipmentVendor=pro[0].ShipmentVendor
  let cart: MyCart = new MyCart();
  cart.IpAddress = localStorage.getItem("IpAddress");
  cart.UserId = parseInt(
    localStorage.getItem("UserId") == null
      ? "0"
      : localStorage.getItem("UserId")
  );
  cart.TotalAmount = pro[0].PriceAfterdiscount;
  cart.CartItems.push(item);

  this.cartservice.addToCart(cart).subscribe(data => {
if(data)
{
 if(cart.UserId>0)
this.Router.navigate(["/checkout-process/checkout"]);
else
this.Router.navigate(["/checkout-process/checkout-login"])
}

    else
    {
       var lang = localStorage.getItem("browseLang");
    if (lang == "english") {
      this.toastr.success("Product added successfully.");
    } else {
      this.toastr.success("Producto agregado con éxito.");
    }
    this.tracklog.handleSuccess1(this.myViewModel.description="Prouct Adding to cart from product detail",this.myViewModel.Action="add To Cart",JSON.stringify(data),this.RequestUrl,this.PageUrl,this.Guid)
    this.Router.navigate(["/mycart"]);
    }
    this.googleAnalyticsService.eventEmitter("add_to_cart", "shop", "cart", "click", 10);
  }
,
error => this.tracklog.handleError1(error,this.myViewModel.Action="add To Cart",this.RequestUrl,this.PageUrl,this.Guid)

  );
}


  //-----------shipping charges-------------------
  PostalCode: any;
  ShippingCharges: any;
  ShipModel = {
    DeliveryType: "",
    ResponseFrom: "",
    ShipPrice: 0,
    DeliveryDate: ""
  };

  ShippingError: any;
  isShipError: boolean = false;
  errMsg: any;

  checkCharges() {

    if (+this.PostalCode) {
      var model = {
        CountryCode: "MX",
        Postalcode: this.PostalCode,
        productId: this.myViewModel.productId,
        variantId: this.myViewModel.LandingVariantId
      };

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
      });
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

  goToGetProducts(id) {
    this.RequestUrl="/productcatalogue/"
    this.tracklog.handleSuccess1(this.myViewModel.description="View products on productcatalogue ",this.myViewModel.Action="Clicked on category or subcat from product detail page",JSON.stringify("/productcatalogue?Id="+ id ),this.RequestUrl,this.PageUrl,this.Guid)
    this.Router.navigate(["/productcatalogue/"], { queryParams: { Id: id } });
    event.preventDefault();
  }

    IconOptions1: OwlOptions = {
      loop: true,
  autoplay:true,
  autoplayTimeout:7000,
  autoplayHoverPause:true,
  mouseDrag: true,
  touchDrag: true,
  pullDrag: false,
  dots: true,
  navSpeed: 1000,
  navText: ['', ''],
  responsive:{
      0:{
          items:1,
      },
      600:{
          items:2,
      },
      1000:{
          items:2,

      }
  },
  nav: false
    }
    counter(i: number) {
      return new Array(i);
  }
  LikeOptions: OwlOptions = {
    loop: false,
    margin:10,
    mouseDrag: false,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    navSpeed: 1000,
    navText:["<i class='fa fa-angle-left'></i>","<i class='fa fa-angle-right'></i>"],
    responsive:{
        0:{
            items:2,
        },
        600:{
            items:4,
        },
        1000:{
            items:6,

        }
    },
    nav: true
  }
}
