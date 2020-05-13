import { Component, OnInit, AfterViewInit, ViewChild } from "@angular/core";
import { HomePageService } from "./home-page.service";
import { ToastrService } from "ngx-toastr";
import { Router } from "@angular/router";
import { Footer } from "src/app/modules/admin/footerUrl/footer";
import { FeatureProduct } from "src/app/modules/admin/add-feature-product/feature-product";
import { Menu } from "../front-end/menus/menu";
import * as $ from "jquery";
import { HttpClient } from "@angular/common/http";

import { Newsletter } from "src/app/modules/admin/add-to-newsletter/newsletter";
import { CommonService } from "../../services/common.service";
import { MyCart, CartItem } from "../mycart/mycartModel";
import { MycartService } from "../mycart/mycart.service";
import { HeaderComponent } from "../header/header.component";
import { ProductService } from "src/app/shared/components/product-details/product.service";
import { TestimonialService } from "../testimonial/testimonial.service";
import { UserLogService } from "../../services/user-log.service";
import { DatePipe } from "@angular/common";
import { OwlOptions } from "ngx-owl-carousel-o";
import { DomSanitizer } from "@angular/platform-browser";
import { ApplicationStateServiceService } from "../../services/application-state-service.service";
import { HomePageComponentModel } from "./home-page.component.model";
import { Tracklog } from "../../services/Tracklog.service";

@Component({
  selector: "app-home-page",
  //templateUrl: "./home-page.component.html",
  templateUrl: "./home-page.component.html",
  styleUrls: ["./home-page.component.css"],
})
export class HomePageComponent implements AfterViewInit {
  description: string;
  Action: string;
  data = new CommonService();
  private url = this.data.getUri();
  formData1: Newsletter;
  menus: Promise<Menu[]>;
  @ViewChild(HeaderComponent, { static: false }) headerData: HeaderComponent;
  isMobileResolution: boolean = false;
  model: HomePageComponentModel;
  myViewModel: HomePageComponentModel;
  PageUrl:string
  RequestUrl:string
  Guid: string;
  constructor(
    public datepipe: DatePipe,
    public srevice: HomePageService,
    private toastr: ToastrService,
    public Router: Router,
    public http: HttpClient,
    public cartservice: MycartService,
    public productService: ProductService,
    public testimonialService: TestimonialService,
    private userLog: UserLogService,
    private sanitizer: DomSanitizer,
    private applicationStateService: ApplicationStateServiceService,
    public tracklog: Tracklog
  ) {
    this.model = new HomePageComponentModel(sanitizer);
    this.myViewModel = new HomePageComponentModel(sanitizer);
    //this.loadView();
    this.updateView();
    this.isMobileResolution = applicationStateService.getIsMobileResolution();
  }
  private updateView(): void {
    this.myViewModel = this.model.clone();
  }
  public loadView(): void {
    this.PageUrl=  this.Router.url
    this.Guid= this.tracklog.newGuid()
    this.getBannerImages();
    this.getSliderImages();
    this.myViewModel.slanguage = localStorage.getItem("browseLang");
    // this.GetTestimonial();
    this.myViewModel.searchValue = null;
    //this.homeCategory();
    this.myViewModel.Url = this.Router.url;
    // this.userLog.UserLog(
    //   this.myViewModel.productId,
    //   1,
    //   this.myViewModel.Url,
    //   1
    // );
    //this.dealslIst()
    //this.getIPAddress();

    // this.getNewsletterdata()
  }

  getRelatedItems(Id) {
    this.productService.getRelatedItems(Id).subscribe((rx) => {
      this.myViewModel.relatedProducts = rx as [];
    });
  }

  // getNewsletterdata() {
  //   this.srevice.getNewsletterData().subscribe(
  //     (x) => {
  //       this.myViewModel.news = x;
  //       this.myViewModel.ModalImage = this.myViewModel.news.Image;
  //       this.myViewModel.Newsletterdescription = this.myViewModel.news.Description;
  //       this.myViewModel.NewsletterHeading = this.myViewModel.news.HeaderName;
  //       this.tracklog.handleSuccess(
  //         (this.description = "Newsletterdata rendering on homepage"),
  //         (this.Action = "Newsletterdata rendering"),
  //         JSON.stringify(x)
  //       );
  //     },
  //     (error) =>
  //       this.tracklog.handleError(
  //         error,
  //         (this.Action = "Newsletterdata list rendering")
  //       )
  //   );
  // }
  getBannerImages() {
    this.RequestUrl="'sliders/getsliderImages1'"
    this.tracklog.handleSuccess1(this.description="Silder images rendering on homepage",this.Action="Slider images rendering","Request",this.RequestUrl,this.PageUrl,this.Guid)

    this.srevice
      .getBannerImages()
      .toPromise()
      .then(
        (x: any) => {
          console.log(x);
          this.myViewModel.banner = x as [];
          console.log(x);
          this.tracklog.handleSuccess1(
            (this.description = "Banner images rendering on homepage"),
            (this.Action = "Banner images  rendering"),
            JSON.stringify(x),this.RequestUrl,this.PageUrl,this.Guid
          );
        },
        (error) =>
          // this.tracklog.handleError(
          //   error,
          //   (this.Action = "Banner images rendering")
          // )
       this.tracklog.handleError1(error,this.Action="Banner images rendering",this.RequestUrl=this.PageUrl,this.PageUrl,this.Guid)

      );
  }
  getSliderImages() {
    this.srevice
      .sliderImages()
      .toPromise()
      .then((data) => {
        this.myViewModel.dataList1 = data;
        for (let i = 0; i < this.myViewModel.dataList1.length; i++) {
          let model = {
            Id: "",
            Image: "",
            Url: "",
          };
          model.Id = "" + this.myViewModel.dataList1[i].Id;
          model.Image = this.myViewModel.dataList1[i].Image;
          model.Url = this.myViewModel.dataList1[i].Url;
          this.myViewModel.dataList.push(model);
        }
      });
  }

  // ngAfterViewInit() {
  //
  //   $('[name="admin-style"]').attr("disabled", "disabled");
  //   $('[name="front-style"]').removeAttr("disabled");
  //   this.ipAddress = localStorage.getItem("IpAddress");
  // }

  ngAfterViewInit() {
    $('[name="admin-style"]').attr("disabled", "disabled");
    $('[name="front-style"]').removeAttr("disabled");

    let UserId = +localStorage.getItem("UserId");
    if (UserId == 0 || UserId == undefined || UserId == null) {
      var prize = localStorage.getItem("Prize");
      this.myViewModel.cancelCount = localStorage.getItem("CancelCount");
      if (!prize && this.myViewModel.cancelCount < 3) this.beforeSpinFn();
    } else {
      this.beforeSpinFn();
    }
  }
  async cancelcounter(): Promise<void> {
    // this.ipAddress = await this.getIPAddress();
    let userId = +localStorage.getItem("UserId");
    let IsSUbcribed = +localStorage.getItem("IsSubscribed");

    this.srevice
      .checkCancelCounter(userId, this.myViewModel.ipAddress, 0)
      .subscribe((x) => {
        if (x >= 5) {
          this.myViewModel.display = "none";
        } else {
          if (userId > 0) {
            this.srevice.checkRegisterSubscribeUser(userId).subscribe((x) => {
              if (x == 1) {
                IsSUbcribed = 1;
                this.myViewModel.display = "none";
              } else {
                this.myViewModel.showDiv = true;
                IsSUbcribed = 0;
                this.myViewModel.display = "block";
              }
            });
          }

          if (userId == null || userId == undefined || userId == 0) {
            this.checkUserSUbscribed();
          }
        }
        // if (userId > 0) {
        //   this.srevice.checkRegisterSubscribeUser(userId).subscribe(x => {
        //     if (x == 1) {
        //
        //       IsSUbcribed = 1;
        //       this.display = 'none'
        //     } else {
        //       this.showDiv = true
        //       IsSUbcribed = 0;
        //       this.display = 'block'
        //     }

        //   })
        // }
      });
  }

  // ngAfterViewInit() {
  //
  //   $('[name="admin-style"]').attr("disabled", "disabled");
  //   $('[name="front-style"]').removeAttr("disabled");
  //   this.beforeSpinFn()

  // }

  onclick(val: any): void {
    // alert(val);

    this.myViewModel.active = false;
    this.myViewModel.selectedItem = val;
    this.myViewModel.active2 = true;
    this.myViewModel.productId = val;
    this.srevice
      .filterProducts(this.myViewModel.productId)
      .toPromise()
      .then((res) => {
        this.myViewModel.CategoryProducts = res as [];
        this.myViewModel.CategoryProducts.forEach((d) => {
          let correcttime = this.datepipe.transform(d.ActiveTo, "yyyy-MM-dd");
          d.ActiveTo = correcttime;
        });
        // alert(JSON.stringify(res))
      });
    // this.CategoryProducts = this.srevice.filterProducts(val);
  }
  getAllproducts() {
    this.myViewModel.active = true;
    this.myViewModel.active2 = false;
    this.myViewModel.selectedItem = "";

    this.srevice
      .getallProdcuts()
      .toPromise()
      .then((res) => {
        this.myViewModel.CategoryProducts = res as Menu[];
        this.myViewModel.CategoryProducts.forEach((d) => {
          let correcttime = this.datepipe.transform(d.ActiveTo, "yyyy-MM-dd");
          d.ActiveTo = correcttime;
        });
      });
    this.srevice
      .getcategory()
      .toPromise()
      .then((res) => {
        this.myViewModel.category = res as []; //this one
      });
  }
  flag: boolean = false;
  catchEvent(event) {
    this.flag = true;
    console.log(event);
  }
  // getEmail(email: string) {
  //   let result: boolean;
  //   let UserId: any;
  //   var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  //   result = re.test(String(email).toLowerCase());
  //   if (result) {
  //     UserId = +localStorage.getItem("UserId");
  //     this.http.get("https://api.ipify.org/?format=json").subscribe((data) => {
  //       this.formData1 = new Newsletter();
  //       this.myViewModel.ipAddress = data["ip"];
  //       this.formData1.IpAddress = this.myViewModel.ipAddress;
  //       if (
  //         this.formData1.IpAddress == null &&
  //         this.formData1.IpAddress == undefined
  //       )
  //         this.formData1.IpAddress = "";
  //       this.formData1.Email = email;

  //       this.formData1.UserId = UserId;
  //       if (this.formData1.UserId) this.formData1.UserId = 0;
  //       this.sendata(this.formData1);

  //       this.myViewModel.searchValue = "";
  //       this.myViewModel.display = "none";
  //     });
  //   } else {
  //     var lang = localStorage.getItem("browseLang");
  //     if (lang == "english") {
  //       this.toastr.info("Please enter valid Email");
  //     } else {
  //       this.toastr.info("Por favor introduzca un correo electrónico válido");
  //     }
  //   }
  // }
  onCloseHandled() {
    this.myViewModel.display = "none";
    this.http.get("https://api.ipify.org/?format=json").subscribe((data) => {
      this.myViewModel.ipAddress = data["ip"];
    });
    let UserId = +localStorage.getItem("UserId");
    this.srevice
      .checkCancelCounter(UserId, this.myViewModel.ipAddress, 1)
      .subscribe();
  }
  // sendata(formData: Newsletter) {
  //   if (formData.UserId == null) {
  //     formData.UserId = 0;
  //   }
  //   var lang = localStorage.getItem("browseLang");

  //   return this.http
  //     .post(this.url + "NewsLetter/addNewsLetter", formData)
  //     .subscribe(
  //       (res) => {
  //         this.myViewModel.display = "none";
  //         if (res == 0) {
  //           if (lang == "english") {
  //             this.toastr.info("Already subscribed.");
  //           } else {
  //             this.toastr.info("Ya suscrito .");
  //           }
  //         } else {
  //           if (lang == "english") {
  //             this.toastr.info("Successfully Subscribed.");
  //           } else {
  //             this.toastr.info("Suscrito con éxito.");
  //           }
  //         }
  //         this.tracklog.handleSuccess(
  //           (this.description = "Subscribing for newsletter "),
  //           (this.Action = "Newsletter subscribe"),
  //           JSON.stringify(res)
  //         );
  //       },
  //       (error) =>
  //         this.tracklog.handleError(
  //           error,
  //           (this.Action = "Newsletter subscribe")
  //         )
  //     );
  // }

  hide(event) {
    this.flag = false;
  }
  passTheSalt(Id: number, variantId) {

    //  alert('ghjh')
    this.RequestUrl="product-details?Id="+ Id+"&variantId=" +variantId
    this.tracklog.handleSuccess1(this.description="View product details",this.Action="Product details button clicked","Request",this.RequestUrl,this.PageUrl,this.Guid)

    this.Router.navigate(["/product-details"], {
      queryParams: { Id: Id, variantId: variantId }
    });
  }

  getProductDetails1(variantId: number) {

    let UserId: any = localStorage.getItem("UserId");
    if (UserId == null) {
      UserId = 0;
    }

    let IpAddress = localStorage.getItem("IpAddress");
    this.RequestUrl=  "category/AddWishListProduct?variantId=" +
    variantId +
    "&UserId=" +
    UserId +
    "&IpAddress=" +
    IpAddress
    this.tracklog.handleSuccess1(this.description="Item adding to wishlist from home page",this.Action="Wishlist product","Request",this.RequestUrl,this.PageUrl,this.Guid)

    return this.http
      .get(
        this.url +
        "category/AddWishListProduct?variantId=" +
        variantId +
        "&UserId=" +
        UserId +
        "&IpAddress=" +
        IpAddress
      )
      .subscribe(e => {
        if (e == 1) {
          var lang = localStorage.getItem("browseLang");
          if (lang == "english") {
            this.toastr.success("Item added to wishlist.");
          } else {
            this.toastr.success("Artículo agregado a la lista de deseos.");
          }
        } else {
          var lang = localStorage.getItem("browseLang");
          if (lang == "english") {
            this.toastr.error("Already added to wishlist");
          } else {
            this.toastr.error("Ya agregado a la lista de deseos");
          }
        }
        this.tracklog.handleSuccess1(this.description="Item adding to wishlist from home page",this.Action="Wishlist product","added",this.RequestUrl,this.PageUrl,this.Guid)
      },
      error => this.tracklog.handleError1(error,this.Action="Wishlist product",this.RequestUrl,this.PageUrl,this.Guid)

      );
  }
  addToCart(varientId, SellingPrice, Discount, PriceAfterdiscount,ShipmentVendor) {
    this.RequestUrl='cart/addToCart'
    this.tracklog.handleSuccess1(this.description="Prouct Adding to cart",this.Action="add To Cart","Request",this.RequestUrl,this.PageUrl,this.Guid)

    let item: CartItem = new CartItem();
    item.ProductVariantDetailId = varientId;
    item.UnitPrice = SellingPrice;
    item.Discount = Discount;
    item.Amount = PriceAfterdiscount;
    item.ShipmentVendor=ShipmentVendor
    let cart: MyCart = new MyCart();
    cart.IpAddress = localStorage.getItem("IpAddress");
    cart.UserId = parseInt(
      localStorage.getItem("UserId") == null
        ? "0"
        : localStorage.getItem("UserId")
    );
    cart.TotalAmount = PriceAfterdiscount;
    cart.CartItems.push(item);

    this.cartservice.addToCart(cart).subscribe(data => {


      if(data){
      if(cart.UserId>0)
      this.Router.navigate(["/checkout-process/checkout"]);
      else
      this.Router.navigate(["/checkout-process/checkout-login"])
      }
      else
      {
        this.headerData.ngOnInit();
      var lang = localStorage.getItem("browseLang");
      if (lang == "english") {
        this.toastr.success("Product added successfully.");
      } else {
        this.toastr.success("Producto agregado con éxito.");
      }
    }
    this.tracklog.handleSuccess1(this.description="Prouct Adding to cart from home page",this.Action="add To Cart","added",this.RequestUrl,this.PageUrl,this.Guid)
    },
    error => this.tracklog.handleError1(error,this.Action="add To Cart",this.RequestUrl,this.PageUrl,this.Guid)

    );
  }
  SaveCompareProduct(VarientId: number) {
    let UserId: any = localStorage.getItem("UserId");
    if (UserId == null) {
      UserId = 0;
    }
//this.RequestUrl= "compare/SaveCompareProduct?variantId=" +
VarientId +
"&UserId=" +
UserId +
"&IpAddress=" +
IpAddress
//this.tracklog.handleSuccess1(this.description="Save Compare Product from home page",this.Action="Save Compare Product","Request",this.RequestUrl,this.PageUrl,this.Guid)

    var IpAddress = localStorage.getItem("IpAddress");
    return this.http.get(
      this.url +
      "compare/SaveCompareProduct?variantId=" +
      VarientId +
      "&UserId=" +
      UserId +
      "&IpAddress=" +
      IpAddress
    );
  }
  addCompare(VariantDetailId: number) {

    //if (this.ComporeProduct.length == 0) {
    this.myViewModel.ComporeProduct.push(VariantDetailId);
    let UserId:any= localStorage.getItem('UserId')
    if(UserId==null){
      UserId =0
     }
    this.RequestUrl="compare/SaveCompareProduct?variantId=" + VariantDetailId+ "&UserId=" + UserId
    this.tracklog.handleSuccess1(this.description="Product adding to compare from home page",this.Action="Compare product","Request",this.RequestUrl,this.PageUrl,this.Guid)

    this.productService
      .SaveCompareProduct(VariantDetailId)
      .subscribe((x: any) => {
        if (x >= 1) {

          localStorage.setItem("compareCount", x);
          this.toastr.clear();
          var lang = localStorage.getItem("browseLang");
          if (lang == "english") {
            this.toastr.success("Product added to compare.");
          } else {
            this.toastr.success("Producto agregado para comparar.");
          }
          this.headerData.ngOnInit();
        } else {
          this.toastr.clear();
          var lang = localStorage.getItem("browseLang");
          if (lang == "english") {
            this.toastr.info("Product is already add to compare.");
          } else {
            this.toastr.info("El producto ya está agregado para comparar.");
          }
        }
        this.tracklog.handleSuccess1(this.description="Product adding to compare from home page",this.Action="Compare product","added",this.RequestUrl,this.PageUrl,this.Guid)
      },
      error => this.tracklog.handleError1(error,this.Action="Compare product",this.RequestUrl,this.PageUrl,this.Guid)

      );
    // } else {
    //   var find = this.ComporeProduct.find(element => {
    //     return element == VariantDetailId;
    //   });
    //   if (find == undefined) {
    //     this.ComporeProduct.push(VariantDetailId);
    //   } else {
    //     var lang = localStorage.getItem("browseLang");
    //     if (lang == "english") {
    //       this.toastr.info("Product is already add to compare.");
    //     } else {
    //       this.toastr.info("El producto ya está agregado para comparar.");
    //     }
    //   }
    // }
  }
  TestimonialList: any[] = [];

  gotocat(Id) {
    this.RequestUrl="/productcatalogue?id="+Id
    this.tracklog.handleSuccess1(this.description="Going to product catelogue",this.Action="Going to productcatalogue","Request",this.RequestUrl,this.PageUrl,this.Guid)
    this.Router.navigate(["/productcatalogue"], { queryParams: { id: Id } });
  }

  checkUserSUbscribed() {
    let userId = +localStorage.getItem("UserId");
    if (userId == null || userId == undefined || userId == 0) {
      this.http.get("https://api.ipify.org/?format=json").subscribe((data) => {
        this.myViewModel.ipAddress = data["ip"];
        this.srevice
          .checkNewsLetterSubscribe(this.myViewModel.ipAddress)
          .subscribe((x: any) => {
            if (x == 1) {
              this.myViewModel.display = "none";
            } else {
              this.myViewModel.showDiv = true;
              this.myViewModel.display = "block";
            }
          });
      });
    }
    return false;
  }
  //popup starts

  getSpinnerOptions() {
    let UserId = +localStorage.getItem("UserId");
    if (UserId) {
      this.srevice.getSpinChance(UserId).subscribe((x) => {
        if (x == 1) {
          this.getspinneroptionwithoutuser();
        }
      });
    } else {
      this.getspinneroptionwithoutuser();
    }
  }
  getspinneroptionwithoutuser(){
    this.RequestUrl='Spinner/SpinnerOptionsFront'
    this.tracklog.handleSuccess1(this.description="Getting spinner options",this.Action="spinner options ","Request",this.RequestUrl,this.PageUrl,this.Guid)

    this.myViewModel.showSpinnerDiv=true
    this.myViewModel.display = 'block';
    this.srevice.getSpinnerOptions().toPromise().then(x => {
      this.tracklog.handleSuccess1(this.description="Getting spinner options",this.Action="spinner options ",JSON.stringify(x),this.RequestUrl,this.PageUrl,this.Guid)
      this.myViewModel.spinner = x as []
      this.myViewModel.spinner.forEach((element: any) => {

        this.myViewModel.prizes.push(element.Description)
      });

      this.myViewModel.showDiv = true
      this.random()
      this.myViewModel.colors = ["#e32129",
        "#eb4225",
        "#f37425",
        "#f8a41e",
        "#fdd10e",
        "#a8c23a",
        "#51a246",
        "#2ea4a4",
        "#2481c4",
        "#3a2462",
        "#662b65",
        "#8e275f",]

    }).catch(err=>{
      this.tracklog.handleError1(err,this.Action="spinner options ",this.RequestUrl,this.PageUrl,this.Guid)
      console.log(err);
    })
  }
  random() {
    let rand: any;

    this.myViewModel.spinner.forEach((element: any) => {
      if (
        element.SpinnerOptionsPeriod &&
        element.SpinnerOptionsPeriod.Chances == 0 &&
        element.MoodId == 2
      ) {
        this.myViewModel.newarray.push(element.Description);
      } else if (
        element.SpinnerOptionsPeriod &&
        element.SpinnerOptionsPeriod.Chances == 0 &&
        element.MoodId == 3
      ) {
      } else if (
        element.SpinnerOptionsPeriod &&
        element.SpinnerOptionsPeriod.Chances > 0
      ) {
        this.myViewModel.newarray.push(element.Description);
      } else if (!element.SpinnerOptionsPeriod) {
        this.myViewModel.newarray.push(element.Description);
      }
    });

    rand = this.myViewModel.newarray[
      Math.floor(Math.random() * this.myViewModel.newarray.length)
    ];

    if (rand == "Spin to win") {
      rand = "Almost";
    }
    this.myViewModel.prizeToWin = rand;
    //     let item = this.spinner.find(i => i.Description == this.prizeToWin)
    // if(item.ProductId>0){
    //   this.SpinnervarientId=item.ProductId
    //   this.srevice.getSpinnervarientId(item.ProductId).subscribe(x=>{
    //     this.SpinnerproductId=x;
    //   })
    // }else if(item.CategoryId>0){
    //   this.SpinnercatelogueId=item.CategoryId
    // }else if(item.ProductCategoryId){
    //   this.SpinnercatelogueId=item.CategoryId

    // }
  }

  beforeSpinFn() {
    this.CheckSpinnerToDisplay();
    //this.getSpinnerOptions();
  }

  afterSpinFn() {
    this.myViewModel.audio.pause();
    this.myViewModel.prizeToWin;
    let item = this.myViewModel.spinner.find(
      (i) => i.Description == this.myViewModel.prizeToWin
    );
    this.toastr.success(item.DisplayMessage);
    localStorage.setItem("Prize", JSON.stringify(item));
    let model = {
      SpinnerPromotionId: 0,
      SpinCount: 1,
      UserId: 0,
      MoodId: 0,
      // IsActive:true,
      // IsUsed:true,
      // SpinDate:new Date(),
      // CancelCounter:0,
      // CancelDate:new Date(),
    };

    var userId = +localStorage.getItem("UserId");
    if (userId == null || userId == undefined || userId < 0) model.UserId = 0;
    else {
      model.UserId = userId;
      model.SpinnerPromotionId = item.Id;
      model.SpinCount = 1;
      model.MoodId = item.MoodId;
    }
    console.log(model);
    this.RequestUrl="Spinner/SaveSpinUserData"
      this.tracklog.handleSuccess1(this.description="After clicked on the spinner ",this.Action="Spinner clicked","Request",this.RequestUrl,this.PageUrl,this.Guid)

    this.srevice.saveSpinnerData(model).subscribe((x) => {
      console.log(x);
      this.myViewModel.SpinnerMoodId = item.MoodId;
      if (item.MoodId == 3) {
        this.spinnermessage();
        if (item.ProductId > 0) {
          this.myViewModel.SpinnervarientId = item.ProductId;
          this.srevice.getSpinnervarientId(item.ProductId).subscribe((x) => {
            this.myViewModel.SpinnerproductId = x;
          });
        } else if (item.CategoryId > 0) {
          if (item.ProductCategoryId)
            this.myViewModel.SpinnercatelogueId = item.ProductCategoryId;
          else this.myViewModel.SpinnercatelogueId = item.CategoryId;
        }
       // this.tracklog.handleSuccess1(this.description="User not logged in but spin the spinner ",this.Action="Spinner clicked",JSON.stringify(x),this.RequestUrl,this.PageUrl,this.Guid)
        this.tracklog.handleSuccess1(this.description="After clicked on the spinner ",this.Action="Spinner clicked",JSON.stringify(x),this.RequestUrl,this.PageUrl,this.Guid)

      } else {
        let UserId = +localStorage.getItem("UserId");
        if (UserId == null || UserId == undefined || UserId == 0) {
          this.tracklog.handleSuccess1(this.description="User not logged in but spin the spinner ",this.Action="Spinner clicked",JSON.stringify(x),this.RequestUrl,this.PageUrl,this.Guid)


          var lang = localStorage.getItem("browseLang");
          if (lang == "english") {
            this.toastr.info("Kindly,register to try luck in future.");
          } else {
            this.toastr.info(
              "Por favor, regístrese para probar suerte en el futuro."
            );
          }
        }
      }
    });
  }
  spinnermessage() {
    let UserId = +localStorage.getItem("UserId");
    if (UserId == null || UserId == undefined || UserId == 0) {
      this.tracklog.handleSuccess1(this.description="User not logged in but spin the spinner ",this.Action="Spinner clicked","Kindly,register to avail this offer.",this.RequestUrl=this.PageUrl,this.PageUrl,this.Guid)


      var lang = localStorage.getItem("browseLang");
      if (lang == "english") {
        this.toastr.info("Kindly,register to avail this offer.");
      } else {
        this.toastr.info("Por favor, regístrese para aprovechar esta oferta.");
      }
    }
  }
  //popup ends
  onSpinnerClose() {
    this.myViewModel.audio.pause();
    this.myViewModel.display = "none";
    let UserId = +localStorage.getItem("UserId");
    if (UserId > 0) {
      this.srevice
        .checkSpinnerCancelCounter(UserId, 1)
        .subscribe((count: any) => {
          localStorage.setItem("CancelCount", count);
          this.myViewModel.cancelCount = localStorage.getItem("CancelCount");
        });
    } else {
      if (this.myViewModel.cancelCount == 0)
        localStorage.setItem("CancelCount", this.myViewModel.cancelCount);

      this.myViewModel.cancelCount = +localStorage.getItem("CancelCount") + 1;
      localStorage.setItem("CancelCount", this.myViewModel.cancelCount);
    }
  }
  CheckSpinnerToDisplay() {
    let UserId = +localStorage.getItem("UserId");
    if (UserId > 0) {
      this.srevice.CheckSpinnerToDisplay(UserId).subscribe((spin) => {
        if (spin == true) {
          this.myViewModel.audio.src = "/assets/sound/sound.mp3";
          //this.myViewModel.audio.play()
          this.getSpinnerOptions();
          //this.showDiv=true;
        }
      });
    } else {
      this.srevice.CheckSpinnerToDisplay(UserId).subscribe((spin) => {
        if (spin == true) {
          this.myViewModel.cancelCount = +localStorage.getItem("CancelCount");
          if (this.myViewModel.cancelCount < 3) {
            this.myViewModel.audio.src = "assets/sound/sound.mp3";
            if (this.myViewModel.audio.src) {
              //this.myViewModel.audio.play()
            }
            this.getSpinnerOptions();
          }
        }
      });
    }
  }
  GotoPage(){

    if(this.myViewModel.SpinnervarientId>0){
      this.tracklog.handleSuccess1(this.description="Clicked on win prize",this.Action="Spinned and win","Request",this.RequestUrl="/product-details?Id="+ this.myViewModel.SpinnerproductId+"&variantId="+this.myViewModel.SpinnervarientId ,this.PageUrl,this.Guid)
      this.Router.navigate(["/product-details"], {
        queryParams: { Id: this.myViewModel.SpinnerproductId, variantId: this.myViewModel.SpinnervarientId }
      });
    }else if(this.myViewModel.SpinnercatelogueId>0){
      this.tracklog.handleSuccess1(this.description="Clicked on win prize",this.Action="Spinned and win","Request",this.RequestUrl="/productcatalogue?Id="+ this.myViewModel.SpinnercatelogueId ,this.PageUrl,this.Guid)
      this.Router.navigate(['/productcatalogue/'], { queryParams: { Id: this.myViewModel.SpinnercatelogueId } });


    }
      }
  //owl slider
  //   customOptions: OwlOptions = {
  //   loop: true,
  //   mouseDrag: true,
  //   touchDrag: false,
  //   pullDrag: false,
  //   dots: true,
  //   navSpeed: 700,
  //   navText: ['', ''],
  //   nav: false,
  //   responsive: {
  //     0: {
  //       items: 1
  //     },
  //     400: {
  //       items: 1
  //     },
  //     740: {
  //       items: 1
  //     },
  //     940: {
  //       items: 1
  //     }
  //   }

  // }

  //Slider
  customOptions: OwlOptions = {
    loop: true,
    autoplay: true,
    autoplayTimeout: 7000,
    autoplayHoverPause: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: true,
    navSpeed: 1000,
    navText: ["", ""],
    responsive: {
      0: {
        items: 1,
      },
      600: {
        items: 1,
      },
      1000: {
        items: 1,
      },
    },
    nav: true,
  };
  //Slider End
  //ICON CATEGOY
  mainSearch(CategoryId: number) {

    if(CategoryId>0 ){
     this.tracklog.handleSuccess1(this.description="Clicked  category on home page ",this.Action="Clicked category","Request",this.RequestUrl="productcatalogue?Id="+ this.myViewModel.SpinnercatelogueId ,this.PageUrl,this.Guid)
   this.Router.navigate(['/productcatalogue/'], { queryParams: { Id: CategoryId } });
 }}
  IconOptions: OwlOptions = {
    loop: false,
    margin: 10,
    mouseDrag: false,
    touchDrag: true,
    pullDrag: false,
    dots: true,
    navSpeed: 1000,
    navText: [
      "<i class='fa fa-angle-left'></i>",
      "<i class='fa fa-angle-right'></i>",
    ],
    responsive: {
      0: {
        items: 2,
      },
      600: {
        items: 3,
      },
      1000: {
        items: 6,
      },
    },
    nav: true,
  };
  BoughtOptions: OwlOptions = {
    loop: false,
    margin: 10,
    mouseDrag: false,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    navSpeed: 1000,
    navText: [
      "<i class='fa fa-angle-left'></i>",
      "<i class='fa fa-angle-right'></i>",
    ],
    responsive: {
      0: {
        items: 2,
      },
      600: {
        items: 4,
      },
      1000: {
        items: 5,
      },
    },
    nav: true,
  };
  LikeOptions: OwlOptions = {
    loop: false,
    margin: 10,
    mouseDrag: false,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    navSpeed: 1000,
    navText: [
      "<i class='fa fa-angle-left'></i>",
      "<i class='fa fa-angle-right'></i>",
    ],
    responsive: {
      0: {
        items: 2,
      },
      600: {
        items: 4,
      },
      1000: {
        items: 6,
      },
    },
    nav: true,
  };
  Testimonial: OwlOptions = {
    loop: false,
    margin: 10,
    mouseDrag: false,
    touchDrag: true,
    pullDrag: false,
    dots: true,
    navSpeed: 1000,
    navText: [
      "<i class='fa fa-angle-left'></i>",
      "<i class='fa fa-angle-right'></i>",
    ],
    responsive: {
      0: {
        items: 1,
      },
      600: {
        items: 3,
      },
      1000: {
        items: 4,
      },
    },
    nav: true,
  };
}
interface NewsLetter {
  Email: String;
  IpAddress: String;
  UserId: Number;
}
