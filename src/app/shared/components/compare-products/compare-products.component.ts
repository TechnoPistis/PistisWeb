import { Component, OnInit, ViewChild } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { CommonService } from "../../services/common.service";
import { ToastrService } from "ngx-toastr";
import { Router } from "@angular/router";
import { CartItem, MyCart } from "../mycart/mycartModel";
import { HeaderComponent } from "../header/header.component";
import { MycartService } from "../mycart/mycart.service";
import { UserLogService } from '../../services/user-log.service';
import { Tracklog } from '../../services/Tracklog.service';
@Component({
  selector: "app-compare-products",
  templateUrl: "./compare-products.component.html",
  styleUrls: ["./compare-products.component.css"]
})
export class CompareProductsComponent implements OnInit {
  data = new CommonService();
  private url = this.data.getUri();
  product1: boolean = false;
  product2: boolean = false;
  Id = [];
  products: any[] = [];
  productId: number;
  dataList: any;
  product: any;
  LandingVariantId: any;
  varientImage: any;
  UserName: string;
  @ViewChild(HeaderComponent,{static:false}) headerData: HeaderComponent;
  Url: any;
  PageUrl: string;
  Guid: string;
  RequestUrl: any;
  description:string
  Action:string
  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private toastr: ToastrService,
    private Router: Router,
    private userLog:UserLogService,
    public cartservice: MycartService,
    public tracklog:Tracklog
  ) {}
  dataSource = [];

  width: any = 90;

  ngOnInit() {
    this.Guid= this.tracklog.newGuid()
    this.PageUrl=  this.Router.url.replace("/","")
    this.UserName = localStorage.getItem("UserName");
    this.route.queryParams.subscribe(params => {
      this.productId = params["Id"];
      this.LandingVariantId = params["variantId"];
      let UserId: any = localStorage.getItem("UserId");
      if (UserId == null) {
        UserId = 0;
      }
        this.RequestUrl="compare/getCompareProducts?UserId=" +
        UserId
        this.tracklog.handleSuccess1(this.description="View compare products",this.Action="compare products","Request",this.RequestUrl,this.PageUrl,this.Guid)

      this.getCompareProducts().subscribe(res => {

        this.product = res as [];
        if (this.product.length <= 0) this.Router.navigate(["/"]);
        this.width = Math.round(90 / this.product.length) + "%";
        console.table(this.product.length);
        // }
        this.tracklog.handleSuccess1(this.description="View compare products",this.Action="compare products",JSON.stringify( this.product  ),this.RequestUrl,this.PageUrl,this.Guid)
      },
      error => this.tracklog.handleError1(error,this.Action="compare products",this.RequestUrl,this.PageUrl,this.Guid)


      );
    });
    this.Url = this.Router.url;
    this.userLog.UserLog(this.productId, 1, this.Url, 1);
    // this.saveBrowseHistory(this.ipAddress ,this.validUser as number,this.productId as number).subscribe()

  }

  getCompareProducts() {
    let UserId: any = localStorage.getItem("UserId");
    if (UserId == null) {
      UserId = 0;
    }
    var IpAddress = localStorage.getItem("IpAddress");
    return this.http.get(
      this.url +
        "compare/getCompareProducts?UserId=" +
        UserId +
        "&IpAddress=" +
        IpAddress
    );
  }

  SaveCompareProduct(VarientId: number) {
    return this.http
      .get(this.url + "compare/SaveCompareProduct?variantId=" + VarientId)
      .subscribe(x => {
        console.log("done saved");
      });
  }
  getProductDetails1(variantId: number) {
    let UserId: any = localStorage.getItem("UserId");
    if (UserId == null) {
      UserId = 0;
    }
    let IpAddress = localStorage.getItem("IpAddress");
    var lang = localStorage.getItem("browseLang");
    this.tracklog.handleSuccess1(this.description="Item adding to wishlist",this.Action="Wishlist product","Request",this.RequestUrl,this.PageUrl,this.Guid)

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
          if (lang == "english")
            this.toastr.success("Product added to wishlist.");
           else
            this.toastr.success("Producto añadido a la lista de deseos.");
        } else {
          if (lang == "english")
            this.toastr.error("Already added to wishlist");
           else
            this.toastr.error("Ya añadido a la lista de deseos");

        }
        this.tracklog.handleSuccess1(this.description="Item adding to wishlist ",this.Action="Wishlist product","added",this.RequestUrl,this.PageUrl,this.Guid)
      },
      error => this.tracklog.handleError1(error,this.Action="Wishlist product",this.RequestUrl,this.PageUrl,this.Guid)


      );
  }
  deleteCompareproduct(Id: number, index) {
    this.RequestUrl="category/deleteProduct?Id="+Id
    this.tracklog.handleSuccess1(this.description="Removing product from compare",this.Action="Product removed","Request",this.RequestUrl,this.PageUrl,this.Guid)

    return this.http
      .get(this.url + "compare/DeleteCompare?Id=" + Id)
      .subscribe(x => {
        if (x == 1) {
          this.product.splice(index, 1);
          this.ngOnInit();
          var lang = localStorage.getItem("browseLang");
          if (lang == "english") {
            this.toastr.success("Product removed.");
          } else {
            this.toastr.success("Producto eliminado.");
          }
        }
        this.tracklog.handleSuccess1(this.description="Removing product from compare",this.Action="Product removed","removed",this.RequestUrl,this.PageUrl,this.Guid)
      },
      error => this.tracklog.handleError1(error,this.Action="Product removed",this.RequestUrl,this.PageUrl,this.Guid)


      );
  }
  productDetail(Id: number, variantId: number) {
    this.RequestUrl="product-details?Id="+ Id+"&variantId=" +variantId
    this.tracklog.handleSuccess1(this.description="View product details",this.Action="Product details button clicked","Request",this.RequestUrl,this.PageUrl,this.Guid)

    this.Router.navigate(["/product-details"], {
      queryParams: { Id: Id, variantId: variantId }
    });
  }

  // onDelete(Id:number,index){
  //
  //   this.service.deleteproduct(Id).subscribe(x=>{
  //
  //     if(x==1){
  //   this.product.splice(index,1);
  //     }
  //   })
  // }
  //   onAddData() {
  //  this.dataSource.push(this.dataSource.length);
  //  }
  // ngOnInit() {

  //   this.route.queryParams.subscribe(params => {
  //     this.productId=params['Id']
  //     this.Id.push(this.productId );

  //     if(this.Id.length>0){
  //     this.Id.forEach(element => {
  //      this.getProductDetails(element).subscribe(res=>
  //       {

  //         this.dataList=res
  //         this.dataSource.push(this.dataList)
  //       })
  //         })
  //     }
  //     });
  //     }

  addToCart(varientId, SellingPrice, Discount, PriceAfterdiscount,ShipmentVendor) {
    // this.Products.push(this.product);
    // let pro = this.Products
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
      this.headerData.ngOnInit()
      if(data)
      if(cart.UserId>0)
      this.Router.navigate(["/checkout-process/checkout"]);
      else
      this.Router.navigate(["/checkout-process/checkout-login"])
      else
      {

      var lang = localStorage.getItem("browseLang");
      if (lang == "english") {
        this.toastr.success("Product added successfully.");
      } else {
        this.toastr.success(
          "Producto añadido con éxito."
        );
      }
      this.Router.navigate(['/mycart'])
    }
    this.tracklog.handleSuccess1(this.description="Prouct Adding to cart ",this.Action="add To Cart","added",this.RequestUrl,this.PageUrl,this.Guid)
  },
  error => this.tracklog.handleError1(error,this.Action="add To Cart",this.RequestUrl,this.PageUrl,this.Guid)

    );
  }
}
