import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonService } from '../../services/common.service';
import { HeaderComponent } from '../header/header.component';
import { DatePipe } from '@angular/common';
import { RecentlyViewedService } from './recently-viewed.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MycartService } from '../mycart/mycart.service';
import { ProductService } from '../product-details/product.service';
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';
import { NgxSpinnerService } from 'ngx-spinner';
import { CartItem, MyCart } from '../mycart/mycartModel';

@Component({
  selector: 'app-recently-viewed',
  templateUrl: './recently-viewed.component.html',
  styleUrls: ['./recently-viewed.component.css']
})
export class RecentlyViewedComponent implements OnInit {
  Id:any=0;
  List1:any[]=[];
  ComporeProduct: any[] = [];
  data = new CommonService();
  private url = this.data.getUri();
  @ViewChild(HeaderComponent,{static:false}) headerData: HeaderComponent;
  UserId: number=0;
  IpAddress: any='';
  Page:any=0;
  pageSize:any=18;
  showMore:any=false
    constructor(public datepipe: DatePipe,private service:RecentlyViewedService,private route: ActivatedRoute,    private Router:Router,public cartservice: MycartService,private spinner: NgxSpinnerService, 
      public productService: ProductService, private toastr: ToastrService,
     
      private http: HttpClient,) { }
  
    ngOnInit() {
      
      this.UserId=+localStorage.getItem("UserId")
      this.IpAddress=localStorage.getItem("IpAddress")
     this.List()
        
    }
    
    
   List(){
      this.spinner.show();
      this.service.getLists(this.UserId,this.IpAddress,this.Page,this.pageSize).subscribe(x=>{
  if(x[0].Page==1)
  this.List1=x as []
  else
  {
    var data=x as []
    data.forEach(e => {
      this.List1.push(e)
    });
  }
  this.Page=x[0].Page
  this.showMore=x[0].ShowMore
  this.spinner.hide();
      })
    }
    show(){
      this.service.getLists(this.UserId,this.IpAddress,this.Page,this.pageSize).subscribe(x=>{
          
  if(x[0].Page==1)
  this.List1=x as []
  else
  {
    var data=x as []
    data.forEach(e => {
      this.List1.push(e)
    });
  }
  
  this.Page=x[0].Page
  this.showMore=x[0].ShowMore
      })
    }
    getProductDetails1(variantId: number) {
   
      let UserId: any = localStorage.getItem("UserId");
      if (UserId == null) {
        UserId = 0;
      }
      let IpAddress = localStorage.getItem("IpAddress");
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
        });
    }
   
    passTheSalt(Id: number, variantId) {
    
      //  alert('ghjh')
      this.Router.navigate(["/product-details"], {
        queryParams: { Id: Id, variantId: variantId }
      });
    }
    addCompare(VariantDetailId: number) {
     
      //if (this.ComporeProduct.length == 0) {
        this.ComporeProduct.push(VariantDetailId);
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
  
          
              this.headerData.ngOnInit()
            } else {
              this.toastr.clear();
              var lang = localStorage.getItem("browseLang");
              if (lang == "english") {
                this.toastr.info("Product is already added to compare.");
              } else {
                this.toastr.info("El producto ya está agregado para comparar.");
              }
            }
          });
      
    }
    addToCart(varientId, SellingPrice, Discount, PriceAfterdiscount) {
      let item: CartItem = new CartItem();
      item.ProductVariantDetailId = varientId;
      item.UnitPrice = SellingPrice;
      item.Discount = Discount;
      item.Amount = PriceAfterdiscount;
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
        var lang = localStorage.getItem("browseLang");
        if (lang == "english") {
          this.toastr.success("Product added successfully.");
        } else {
          this.toastr.success("Producto agregado con éxito.");
        }
      });
    }
  }