import { Component, OnInit, ViewChild } from '@angular/core';
import { DealsService } from "./deals.service";
import { ActivatedRoute } from '@angular/router';
import { Router } from "@angular/router";
import { CartItem, MyCart } from '../mycart/mycartModel';
import { MycartService } from '../mycart/mycart.service';
import { ProductService } from "src/app/shared/components/product-details/product.service";
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { HeaderComponent } from '../header/header.component';
import { CommonService } from '../../services/common.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-all-deals',
  templateUrl: './all-deals.component.html',
  styleUrls: ['./all-deals.component.css']
})
export class AllDealsComponent implements OnInit {
Id:any=0;
DealList:any[]=[];
ComporeProduct: any[] = [];
data = new CommonService();
private url = this.data.getUri();
@ViewChild(HeaderComponent,{static:false}) headerData: HeaderComponent;
  emptyDeal: boolean=false;
  constructor(public datepipe: DatePipe,private service:DealsService,private route: ActivatedRoute, private spinner: NgxSpinnerService,   private Router: Router,public cartservice: MycartService,
    public productService: ProductService, private toastr: ToastrService,
   
    private http: HttpClient,) { }

  ngOnInit() {
      
    this.route.queryParams.subscribe(params => {
      this.Id= params['Id'];
      
  })
  if(this.Id==undefined||this.Id=="0")
      this.Id=0;
  this.dealslIst()

  }
  
  dealslIst(){
    this.spinner.show();
    this.service.getDealLists(this.Id).subscribe(x=>{

this.DealList=x as []
this.DealList.forEach(d => {
  
      
    let correcttime=this.datepipe.transform(d.ActiveTo, 'yyyy-MM-dd');
  d.ActiveTo=correcttime;
  
  
});
if(this.DealList.length==0)
{
this.emptyDeal=true;
}
this.spinner.hide();
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
  getDealId(dealId:number){
      
    var url = this.Router.url
    
    if(url.includes("All-deals"))
    {
      this.Id=dealId;
      this.dealslIst()
    }
    else
    this.Router.navigate(["/All-deals"], { queryParams: { Id: dealId} });
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
              this.toastr.info("Product is already add to compare.");
            } else {
              this.toastr.info("El producto ya está agregado para comparar.");
            }
          }
        });
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
