import { Component, OnInit, ViewChild } from "@angular/core";
import { ToastrService } from "ngx-toastr";
import { Router, ActivatedRoute, Data } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { WishService } from "./wish.service";
import { CartItem, MyCart } from "../mycart/mycartModel";
import { MycartService } from "../mycart/mycart.service";
import { HeaderComponent } from "../header/header.component";
import { UserLogService } from '../../services/user-log.service';
import { Tracklog } from '../../services/Tracklog.service';
@Component({
  selector: "app-wish-list",
  templateUrl: "./wish-list.component.html",
  styleUrls: ["./wish-list.component.css"]
})
export class WishListComponent implements OnInit {
  productId: any;
  @ViewChild(HeaderComponent,{static:false}) headerData: HeaderComponent;
  LandingVariantId: any;
  list: [];
  Action:string
  RequestUrl:string
  Guid: string;
  wishlistLenght: number;
  UserName: string;
  hidemainDiv: boolean = false;
  Url: string;
  PageUrl: string;
  description:string
  constructor(
    private toastr: ToastrService,
    private Router: Router,
    private route: ActivatedRoute,
    private http: HttpClient,
    private service: WishService,
    public cartservice: MycartService,private userLog:UserLogService,
    public tracklog:Tracklog
  ) {}

  ngOnInit() {
    this.Guid= this.tracklog.newGuid()
    this.PageUrl=  this.Router.url.replace("/","")
    const UserId = localStorage.getItem("UserId");
    if (UserId == undefined || UserId == null) {
      this.hidemainDiv = false;
    } else {
      this.hidemainDiv = true;
    }
    this.UserName = localStorage.getItem("UserName");
    this.route.queryParams.subscribe(params => {
      this.productId = params["Id"];
      this.LandingVariantId = params["variantId"];
      this.RequestUrl="category/AddWishListProducts?variantId=" + this.LandingVariantId
      this.tracklog.handleSuccess1(this.description="View wishlist products",this.Action="wishlist products","Request",this.RequestUrl,this.PageUrl,this.Guid)

      this.service.getProductDetails(10).subscribe(res => {

        this.list = res as [];

        console.table(this.list);
        this.wishlistLenght = this.list.length;
        this.tracklog.handleSuccess1(this.description="View wishlist products",this.Action="wishlist products",JSON.stringify(this.list ),this.RequestUrl,this.PageUrl,this.Guid)
      },
      error => this.tracklog.handleError1(error,this.Action="wishlist products",this.RequestUrl,this.PageUrl,this.Guid)


      );
    });
    this.Url = this.Router.url;
      this.userLog.UserLog(this.productId, 1, this.Url, 1);
  }
  productDetail(Id: number, variantId: number) {
    this.RequestUrl="product-details?Id="+ Id+"&variantId=" +variantId
    this.tracklog.handleSuccess1(this.description="View product details",this.Action="Product details button clicked","Request",this.RequestUrl,this.PageUrl,this.Guid)

    this.Router.navigate(["/product-details"], {
      queryParams: { Id: Id, variantId: variantId }
    });
  }

  onDelete(Id: number, index) {
    this.RequestUrl="category/deleteProduct?Id="+Id
    this.tracklog.handleSuccess1(this.description="Removing product from wishlist",this.Action="Product removed","Request",this.RequestUrl,this.PageUrl,this.Guid)

    this.service.deleteproduct(Id).subscribe(x => {

      if (x == 1) {
        this.list.splice(index, 1);
        var lang = localStorage.getItem("browseLang");
        if (lang == "english") {
          this.toastr.success("Product removed from wishlist.");
        } else {
          this.toastr.success("Producto retirado de la lista de deseos.");
        }
        this.wishlistLenght = this.list.length;
      }
      this.tracklog.handleSuccess1(this.description="Removing product from wishlist",this.Action="Product removed","removed",this.RequestUrl,this.PageUrl,this.Guid)
    },
    error => this.tracklog.handleError1(error,this.Action="Product removed",this.RequestUrl,this.PageUrl,this.Guid)

    );
  }
  logout() {

    localStorage.removeItem("UserName");
    localStorage.removeItem("UserId");
    this.Router.navigate(["/customer/UserLogin"]);
  }
  addToCart(varientId, SellingPrice, Discount, PriceAfterdiscount,ShipmentVendor) {
    this.RequestUrl='cart/addToCart'
    this.tracklog.handleSuccess1(this.description="Prouct Adding to cart",this.Action="add To Cart","Request",this.RequestUrl,this.PageUrl,this.Guid)

    // this.Products.push(this.product);
    // let pro = this.Products
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
      this.headerData.ngOnInit()
      if(data){
        if(cart.UserId>0)
        this.Router.navigate(['/checkout-process/checkout'])
        else
        this.Router.navigate(['/checkout-process/checkout-login'])
      }

      else{
      var lang = localStorage.getItem("browseLang");
      if (lang == "english") {
        this.toastr.success("Product added successfully.");
      } else {
        this.toastr.success("Producto añadido correctamente.");
      }
      this.Router.navigate(["/mycart"]);
    }
    this.tracklog.handleSuccess1(this.description="Prouct Adding to cart from home page",this.Action="add To Cart","added",this.RequestUrl,this.PageUrl,this.Guid)
  },
  error => this.tracklog.handleError1(error,this.Action="add To Cart",this.RequestUrl,this.PageUrl,this.Guid)


    );
  }
}
