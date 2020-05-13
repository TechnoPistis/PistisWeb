import { Component, OnInit, AfterViewInit, ViewChild } from "@angular/core";
import { ToastrService } from "ngx-toastr";
import { Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { MycartService } from "../mycart/mycart.service";
import { ProductService } from "src/app/shared/components/product-details/product.service";
import { TestimonialService } from "../testimonial/testimonial.service";
import { UserLogService } from '../../services/user-log.service';
import { DatePipe } from '@angular/common';
import { DomSanitizer } from '@angular/platform-browser';
import { ApplicationStateServiceService } from '../../services/application-state-service.service';
import { HomePageComponent } from './home-page.component';
import { HomePageService } from './home-page.service';
import { Tracklog } from '../../services/Tracklog.service';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { Menu } from '../front-end/menus/menu';

@Component({
  selector: "app-home-page-mobile",
  templateUrl: "./home-page.component.mobile.html",
  styleUrls: ["./home-page.component.css"]
})
export class HomePageMobileComponent extends HomePageComponent implements OnInit,AfterViewInit {

  constructor(
     datepipe: DatePipe,
     srevice: HomePageService,
     toastr: ToastrService,
     Router: Router,
     http: HttpClient,
     cartservice: MycartService,
     productService: ProductService,
     testimonialService: TestimonialService,
     userLog: UserLogService,
     sanitizer:DomSanitizer,
     applicationStateService:ApplicationStateServiceService,
     tracklog:Tracklog
  ) {
      super(datepipe,srevice,toastr,Router,http,cartservice,productService,testimonialService,userLog,sanitizer,applicationStateService,tracklog)
  }
  ngOnInit(){
    super.loadView();

}
ngAfterViewInit(){
  this.getHomePageData()
  this.GetTestimonial()
  this.getIconCategory()
  this.getLikeProducts()
  var UserId=+localStorage.getItem("UserId");
  if(UserId>0)
  {
    this.getRecentlyBoughtItem(UserId);

  }
  this.homeCategory();
  this.dealslIst();
  this.getIPAddress();
}
bannerOptions: OwlOptions = {
  loop: false,
  margin:10,
  mouseDrag: false,
  touchDrag: true,
  pullDrag: false,
  dots: true,
  navSpeed: 1000,
  navText:["<i class='fa fa-angle-left'></i>","<i class='fa fa-angle-right'></i>"],
  responsive:{
      0:{
          items:1,
      },
      600:{
          items:1,
      },
      1000:{
          items:1,

      }
  },
  nav: true
}
  homeCategory() {
    this.RequestUrl='homeCategory/getMobileLists'
    this.tracklog.handleSuccess1(this.description="Home list rendering on homepage",this.Action="Mobile Lists rendering","Request",this.RequestUrl=this.PageUrl,this.RequestUrl,this.Guid)

    this.srevice.getMobileLists().subscribe(x => {
      this.myViewModel.HomeCtegoryList = x as []
      this.myViewModel.HomeCtegoryList.forEach(h => {
        h.products.forEach(d => {
          let correcttime=this.datepipe.transform(d.ActiveTo, 'yyyy-MM-dd');
        d.ActiveTo=correcttime;
        });

      });
      this.tracklog.handleSuccess1(this.description="Get Mobile Lists rendering on homepage",this.Action="Mobile Lists rendering",JSON.stringify(x),this.RequestUrl,this.PageUrl,this.Guid)
    },
    error => this.tracklog.handleError1(error,this.Action="Mobile Lists rendering",this.RequestUrl,this.PageUrl,this.Guid)
    )
  }
  dealslIst() {
    this.RequestUrl='homeCategory/getMobileDealsProducts'
    this.tracklog.handleSuccess1(this.description="Deal Mobile Lists rendering on homepage",this.Action="Mobile Deal Lists rendering","Request",this.RequestUrl,this.PageUrl,this.Guid)

    this.srevice.getMobileDealLists().subscribe(x => {
      this.myViewModel.DealList = x as []
      this.myViewModel.DealList.forEach(d => {
        let correcttime=this.datepipe.transform(d.ActiveTo, 'yyyy-MM-dd');
        d.ActiveTo=correcttime;
      });
      this.tracklog.handleSuccess1(this.description="Deal Mobile Lists rendering on homepage",this.Action="Mobile Deal Lists rendering",JSON.stringify(x),this.RequestUrl,this.PageUrl,this.Guid)

    },
    error => this.tracklog.handleError1(error,this.Action="Mobile Deal Lists rendering",this.RequestUrl,this.PageUrl,this.Guid)

    )
  }
  getDealId(dealId: number) {
    this.tracklog.handleSuccess1(this.description="Deal Mobile Lists rendering on homepage",this.Action="Mobile Going to Deal page",JSON.stringify(""),this.RequestUrl="Request=/dealscatalogue?"+ dealId,this.PageUrl,this.Guid)

    this.Router.navigate(["/dealscatalogue"], { queryParams: { Id: dealId } });
  }
  getListId(listId: number) {
    this.RequestUrl="/homelistscatalogue"
    this.tracklog.handleSuccess1(this.description="View on get home list button",this.Action="View all homelist button clicked",JSON.stringify("homelistscatalogue?Id="+ listId ),this.RequestUrl,this.PageUrl,this.Guid)

    this.Router.navigate(["/homelistscatalogue"], { queryParams: { Id: listId } });
    }
  getIPAddress(){
    this.http.get("https://api.ipify.org/?format=json").subscribe(data => {

      localStorage.setItem("IpAddress", data["ip"]);
      this.myViewModel.ipAddress = data["ip"];
      this.recentlyViewed();
    });
  }
  recentlyViewed(){
    let UserId=+localStorage.getItem('UserId')
    this.RequestUrl='UserLog/getRecentlyViewedMobile?UserId='+UserId
    this.tracklog.handleSuccess1(this.description="Recently list rendering on homepage",this.Action="Mobile Recently list rendering","Request",this.RequestUrl=this.PageUrl,this.PageUrl,this.Guid)
  this.srevice.getRecentlyViewedMobile(UserId,this.myViewModel.ipAddress).subscribe(recent=>{
      this.myViewModel.recent=recent
      this.tracklog.handleSuccess1(this.description="Recently list rendering on homepage",this.Action="Mobile Recently list rendering",JSON.stringify(recent),this.RequestUrl=this.PageUrl,this.PageUrl,this.Guid)
    }
    ,
    error => this.tracklog.handleError1(error,this.Action="Mobile Recently list rendering",this.RequestUrl=this.PageUrl,this.PageUrl,this.Guid)
    )
  }


///shifted from home
getHomePageData() {

  this.srevice.getcategory().subscribe(res => {
    this.myViewModel.list = res as Menu[];
    this.myViewModel.ProductList = this.myViewModel.list.map(x => x.ProductCategory1 !== null);
    for (var i of this.myViewModel.list) {
      for (var child of i.ProductCategory1) {
        if (child.ProductCategory1 != null) {
          this.myViewModel.child = true;
        } else {
          this.myViewModel.child = false;
        }
      }
    }
  });
  this.srevice
    .getallProdcuts()
    .subscribe(res => {(this.myViewModel.CategoryProducts = res as Menu[])
      this.myViewModel.CategoryProducts.forEach(d => {
        let correcttime=this.datepipe.transform(d.ActiveTo, 'yyyy-MM-dd');
        d.ActiveTo=correcttime;
      });

    }

    );
  this.srevice
    .getcategory()
    .subscribe(res => {
      this.myViewModel.category = res as [];//this one
    });

  // this.srevice
  //   .getFeatureProducts()
  //   .subscribe(res => (this.myViewModel.FeatureProduct = res as FeatureProduct[]));
  this.srevice
    .getFooter()
    .toPromise()
    .then(res => {
      this.myViewModel.footer = res as [];
      // alert(JSON.stringify(this.footer))
    });

}
GetTestimonial() {
  this.RequestUrl='testimonial/get-all/approved'
  this.tracklog.handleSuccess1(this.description="Testimonial rendering",this.Action="Getting Testimonial","Request",this.RequestUrl,this.PageUrl,this.Guid)

  this.testimonialService.GetAllApproved().subscribe((response: any[]) => {

    var count = 0;
    var index = 0;
    // response.forEach(item => {

    //   if (count >= 0 && count <= 2) {
    //     if (count == 0) {
    //       this.TestimonialList.push({
    //         items: [
    //           { UserName: item.UserName, Description: item.Description }
    //         ]
    //       });
    //     } else {
    //       this.TestimonialList[index].items.push({
    //         UserName: item.UserName,
    //         Description: item.Description
    //       });
    //     }
    //     count++;
    //   } else {
    //     this.TestimonialList.push({
    //       items: [{ UserName: item.UserName, Description: item.Description }]
    //     });
    //     count = 1;
    //     index++;
    //   }
    // });

    this.TestimonialList=response as []
    this.tracklog.handleSuccess1(this.description="Testimonial rendering",this.Action="Getting Testimonial",JSON.stringify(response),this.RequestUrl,this.PageUrl,this.Guid)
   // this.tracklog.handleSuccess(this.description="Testimonial rendering",this.Action="Getting Testimonial",JSON.stringify(response))
  },
 // error => this.tracklog.handleError(error,this.Action="Getting Testimonial")
  error => this.tracklog.handleError1(error,this.Action="Getting Testimonial",this.RequestUrl,this.PageUrl,this.Guid)

  );
}
getIconCategory(){
  debugger
      this.RequestUrl='category/getIconCategory'
      this.tracklog.handleSuccess1(this.description="IconCategory rendering on homepage",this.Action="Icon Category rendering","Request",this.RequestUrl,this.PageUrl,this.Guid)
      this.srevice.getIconCategory().subscribe(category=>{
        this.myViewModel.iconCategory=category
        this.tracklog.handleSuccess1(this.description="IconCategory rendering on homepage",this.Action="Icon Category rendering",JSON.stringify(category),this.RequestUrl,this.PageUrl,this.Guid)
      },
      error => this.tracklog.handleError1(error,this.Action="Icon Category rendering",this.RequestUrl,this.PageUrl,this.Guid)
      )
    }
    getLikeProducts(){
      this.tracklog.handleSuccess1(this.description="Smilar products",this.Action="You May Like list rendering","Request",this.RequestUrl,this.PageUrl,this.Guid)

      this.srevice.getLikeProducts().subscribe(p=>{
        debugger
        this.myViewModel.likeProducts=p as[]
        this.tracklog.handleSuccess1(this.description="Smilar products",this.Action="You May Like list rendering",JSON.stringify(p),this.RequestUrl,this.PageUrl,this.Guid)
      },
      error => this.tracklog.handleError1(error,this.Action="You May Like list rendering",this.RequestUrl,this.PageUrl,this.Guid)
      )
    }
getRecentlyBoughtItem(Id)
{
this.productService.getRecentlyBoughtItem(Id).subscribe(x=>{
  if(x)
  {
  this.myViewModel.bought=x;
  if(this.myViewModel.bought)
  this.getRelatedItems(this.myViewModel.bought.ProductId);
  }
})
}
//end
}
