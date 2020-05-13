import { Component, OnInit, ViewChild } from '@angular/core';
import { ProductService } from '../product-details/product.service';
import { ActivatedRoute } from '@angular/router';
import { MycartService } from '../mycart/mycart.service';
import { MyCart, CartItem } from '../mycart/mycartModel';
import { HeaderComponent } from '../header/header.component';
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';
import { CommonService } from '../../services/common.service';
import { Router } from "@angular/router";
@Component({
  selector: 'app-customer-reviewsss',
  templateUrl: './customer-reviewsss.component.html',
  styleUrls: ['./customer-reviewsss.component.css']
})
export class CustomerReviewsssComponent implements OnInit {
  productId: number;
  data = new CommonService();
  private url = this.data.getUri();
  @ViewChild(HeaderComponent,{static:false}) headerData: HeaderComponent;
  LandingVariantId: number;
  product: any;
  varientImage: any;
  pageSize: any;
  count: number = 0; page: number = 1; perPage: number = 10; pagesToShow: number = 10;
 
 ProductreviewDetails:any={
    productId:0,
    varientId:0,
    page:0,
    pageSize:0,
    searchName:''

  }
  SearchName: number;
  constructor(private productService: ProductService,
    private route: ActivatedRoute,
    public cartservice: MycartService,
    private toastr: ToastrService,
    private http: HttpClient,
    private Router: Router,
    ) { }

  ngOnInit() {
    this.page = 1;
    this.pageSize = 2;
    this.SearchName = 0;
    this.getproductReviews()
  }
  onChange(val:any){
      
    this.SearchName=val
    this.getproductReviews()
  }
getproductReviews(){
    
  this.route.queryParams.subscribe(params => {
    this.productId = params["Id"];
 
    this.LandingVariantId = params["variantId"];
this.ProductreviewDetails={
  productId:0,
  varientId:0,
  page:0,
  pageSize:0,
  searchName:''
}
    this.ProductreviewDetails.productId=this.productId;
    this.ProductreviewDetails.varientId=this.LandingVariantId;
    this.ProductreviewDetails.page=this.page
    this.ProductreviewDetails.pageSize=this.pageSize
    this.ProductreviewDetails.searchName=this.SearchName

    //ProductreviewDetails.page=this.searchName


    this.productService
      .getProductDetails2(this.ProductreviewDetails)
      .subscribe(res => {
         
        console.log(res)
        this.product = res;
        this.varientImage = this.product.LandingImage;
        this.count=this.product.Count
      });
  });

}
addToCart() {
    
  let item: CartItem = new CartItem();
  item.ProductVariantDetailId = this.LandingVariantId;
  item.UnitPrice = this.product.PriceAfterdiscount;
  item.Discount = this.product.Discount;
  item.Amount = this.product.PriceAfterdiscount;
  let cart: MyCart = new MyCart();
  cart.IpAddress = localStorage.getItem("IpAddress");
  cart.UserId = parseInt(
    localStorage.getItem("UserId") == null
      ? "0"
      : localStorage.getItem("UserId")
  );
  cart.TotalAmount = this.product.PriceAfterdiscount;;
  cart.CartItems.push(item);

  this.cartservice.addToCart(cart).subscribe(data => {
    this.headerData.ngOnInit()
    var lang = localStorage.getItem("browseLang");
    if (lang == "english") {
      this.toastr.success("Product added successfully.");
    } else {
      this.toastr.success("Producto agregado con éxito.");
    }
  });
}
passTheSalt() {
  
  //  alert('ghjh')
  this.Router.navigate(["/product-details"], {
    queryParams: { Id: this.productId, variantId: this.LandingVariantId }
  });
}
getProductDetails1() {
   
  let UserId: any = localStorage.getItem("UserId");
  if (UserId == null) {
    UserId = 0;
  }
  let IpAddress = localStorage.getItem("IpAddress");
  return this.http
    .get(
      this.url +
      "category/AddWishListProduct?variantId=" +
      this.LandingVariantId +
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
    });
}
nextPage() {
  this.page = this.page + 1;
 this.getproductReviews()
}
goToPage(event) {
  this.page = event;
  this.getproductReviews()
}
newPageSize(e) {
  if (e == 0) {
    e = this.count;
  }
  this.perPage = e;
  this.getproductReviews()
}
prevPage() {
  this.page = this.page - 1;
  this.getproductReviews();
}
}
