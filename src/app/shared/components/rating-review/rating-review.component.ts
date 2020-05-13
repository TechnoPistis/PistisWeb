import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonService } from '../../services/common.service';
import { NgbTypeaheadWindow } from '@ng-bootstrap/ng-bootstrap/typeahead/typeahead-window';
import { ProductService } from '../product-details/product.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserLogService } from '../../services/user-log.service';
import { Tracklog } from '../../services/Tracklog.service';

@Component({
  selector: 'app-rating-review',
  templateUrl: './rating-review.component.html',
  styleUrls: ['./rating-review.component.css']
})
export class RatingReviewComponent implements OnInit {
validate:boolean

Rating:number
  id: any;
  Review={
    UserId:0,
ProductId:1,
Review:'',
Rating:0
  }
  PageUrl:string
  RequestUrl:string
  message:boolean
  UserId:number
 ProductvarientDetailId:number
rate:number=0
description:string=''
  private url = new CommonService().getUri();
  product: any;
  varientImage: any;
  Url: string;
  description1:string
  Action:string
  Guid: string;
  constructor(
    private route: ActivatedRoute,private http: HttpClient,private productService: ProductService,private Router: Router,private toster:ToastrService,private userLog:UserLogService
    ,public tracklog:Tracklog
  ) { }

  ngOnInit() {
    this.Guid= this.tracklog.newGuid()
    this.PageUrl=  this.Router.url.replace("/","")
    this.validate=false
     this.message=false
    this.route.queryParams.subscribe(params => {
      this.id= params['Id'];
    this.ProductvarientDetailId=  params['ProductVdId'];
        this.RequestUrl="category/getProductDetails?Id=" + this.id + "&variantId=" + this.ProductvarientDetailId
        this.tracklog.handleSuccess1(this.description1="Getting product details on all review page",this.Action="Get Product Details","Request",this.RequestUrl,this.PageUrl,this.Guid)

      this.productService.getProductDetails(this.id,  this.ProductvarientDetailId).subscribe(res => {

        this.product = res;
        this.varientImage = this.product.LandingImage;
        console.log(this.product)
        this.tracklog.handleSuccess1(this.description1="Getting product details on all review page",this.Action="Get Product Details",JSON.stringify(res),this.RequestUrl,this.PageUrl,this.Guid)
      },
      error => this.tracklog.handleError1(error,this.Action="Get Product Details",this.RequestUrl,this.PageUrl,this.Guid)

      )
      let User:any= localStorage.getItem('UserId')

   this.UserId =  User as number
      console.log(this.id)
      return this.http
      .get(this.url + "Rating/getRating?UserId="+this.UserId  +'&ProductId='+this.id)
      .subscribe((x:any)=>{

        console.log(x)
                    this.rate=x.Rating
                    if(this.rate>0){
                      this.validate=true;
                    }
                    //alert(JSON.stringify(x))
                    this.description=x.Review
      })
    })
    this.Url = this.Router.url;
      this.userLog.UserLog(0, 1, this.Url, 1);
  }
  getRating(val:number){

    console.log(val)
    this.Rating=val;
    this.validate=true;

  }
  passTheSalt() {
    this.RequestUrl='/product-details'
    this.tracklog.handleSuccess1(this.description="View product details",this.Action="product details button clicked","Request",this.RequestUrl="product-details?Id="+ this.id+"&variantId=" +this.ProductvarientDetailId,this.PageUrl,this.Guid)

    //  alert('ghjh')
    this.Router.navigate(['/product-details'], { queryParams: { Id: this.id, variantId: this.ProductvarientDetailId } });
  }
  focusFunction(){

    if(this.validate==false){
      this.message=true
    }
  }
  getDescription(Desc:string){
    console.log(Desc)


    if(this.validate==true  ){
  this.Review
  this.Review.ProductId= this.id
  this.Review.Review=Desc
  this.Review.Rating=this.Rating
   let UserId:any= localStorage.getItem('UserId')
   this.Review.UserId=UserId as number
   this.tracklog.handleSuccess1(this.description="User submit the product  review",this.Action="product rating review","Request",this.RequestUrl= "Rating/saveRating",this.PageUrl,this.Guid)

   if(this.Review.ProductId>0 && this.Review.UserId>0)
   return this.http.post(this.url + "Rating/saveRating",this.Review).subscribe(x=>{
    this.tracklog.handleSuccess1(this.description="User submit the product  review",this.Action="product rating review",JSON.stringify(x),this.RequestUrl="Rating/saveRating",this.PageUrl,this.Guid)

    var lang = localStorage.getItem("browseLang");
    if (lang == "english") {
      this.toster.success(" Thank you for your review.")
    } else {
      this.toster.success(" Gracias por tu comentario.")
    }

     this.Router.navigate(['/MyOrders']);
   },
   error => this.tracklog.handleError1(error,this.Action="product rating review",this.RequestUrl,this.PageUrl,this.Guid)

   )
    }else{
      this.validate=false
    }
  }

}
