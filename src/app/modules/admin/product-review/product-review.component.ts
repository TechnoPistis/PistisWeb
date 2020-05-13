import { Component, OnInit } from '@angular/core';
import { ReviewsService } from "../customer-reviews/reviews.service";
import { CommonService } from 'src/app/shared/services/common.service';
import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { ProductService } from 'src/app/modules/admin/product-review/product.service';
@Component({
  selector: 'app-product-review',
  templateUrl: './product-review.component.html',
  styleUrls: ['./product-review.component.css']
})

export class ProductReviewComponent implements OnInit {
  Review = {
    UserId: 0,
    ProductId: 1,
    Review: '',
    Rating: 0
  }
  data: any;
  Data = new CommonService();
  first: any
  scnd: any
  rate: number = 0
  Rating: number
  FirstDiv: any = true
  SeconedDiv: any = false
  thirdDiv: any = false
  UserId: any = 0
  WithoutFilter: boolean = true
  WithFilter: boolean = false
  ThirdFilter: boolean = false
  data1 = new CommonService();
  private url = this.data1.getUri();
  product2: any;
  productId: number;
  customerName: string;
  productname: string;
  userReview: any
  ProductId
  validate: boolean;
  message: boolean;
  description: any;
  constructor(private service: ReviewsService
    , private datePipe: DatePipe,
    private http: HttpClient,
    private toastr: ToastrService,
    private ProductService:ProductService) { }


  count: number = 0; page: number = 1; perPage: number = 10; pagesToShow: number = 10;
  SearchName: any = '';
  pageSize: any;

  ngOnInit() {
      
    this.page=1;
    this.pageSize=10;
    this.getAll();
  }

  getAll(){
    this.service.getProductReviews(this.page,this.pageSize).subscribe((response:any) => {
      this.data = response.data;
      this.count =response.count;
    })
  }

  resetForm() {
    this.Data = null
    this.first = ''
    this.scnd = ''
  }

  showReviews(UserId, customerName: string, productId: any) {
      
    this.FirstDiv = false
    this.SeconedDiv = true
    this.UserId = UserId
    this.customerName = customerName
    this.productId = productId
    this.service.FilterProductIdReviews(productId).subscribe(x => {
      this.product2 = x as []
    })
  }
  
  getTariks(first: string, scnd: string) {
      
    this.WithoutFilter = false
    this.WithFilter = true
    this.service.FilterProductReviews(first, scnd, this.productId).subscribe(x => {
      this.product2 = x as []
    })
  }
  moment(val: any) {

    this.WithoutFilter = false
    this.WithFilter = true
    this.service.FilterProductReviewsStatus(this.productId, val).subscribe(x => {

      this.product2 = x as []

    })
  }

  thirdDivActive(ProductId: number, productname: string) {
      
    this.FirstDiv = false
    this.SeconedDiv = false
    this.thirdDiv = true
    this.productId = ProductId
    this.productname = productname
    this.customerName
    console.log(this.productname)
    console.log(this.customerName)
    this.service.getRatingperUser(this.UserId, this.productId).subscribe((x: any) => {
      console.log(x)
      this.userReview = x
      this.rate = x.Rating
      this.description = x.Review


    })
  }
  getRating(val: number) {
      
    console.log(val)
    this.Rating = val;
    //  this.validate=true;
    this.rate = val
    //this.url + "Rating/getRating?UserId="+this.UserId  +'&ProductId='+this.id

  }
  // focusFunction(){
  //     
  //   if(this.validate==false){
  //     this.message=true 
  //   }
  // }

  getDescription(Desc: string) {
    console.log(Desc)

      

    this.Review
    this.Review.ProductId = this.productId
    this.Review.Review = Desc
    this.Review.Rating = this.Rating
    let UserId: any = this.UserId
    this.Review.UserId = UserId as number
    if (this.Review.ProductId > 0 && this.Review.UserId > 0)
      return this.http.post(this.url + "Rating/saveRating", this.Review).subscribe(x => {
        this.toastr.success('Review updated successfully.');
        this.FirstDiv = true
        this.SeconedDiv = false
        this.thirdDiv = false
      })

  }
  onClick(){
    this.FirstDiv=true
    this.SeconedDiv=false
    this.thirdDiv=false
  }

  prevPage() {
    this.page = this.page - 1;
    this.getAll();
  }
  nextPage() {
    this.page = this.page + 1;
    this.getAll();
  }
  goToPage(event) {
    this.page = event;
    this.getAll();
  }

  newPageSize(e) {
    if (e == 0) {
      e = this.count;
    }
    this.perPage = e;
    this.getAll();
  }

  search(){
    this.page=1;
    this.getAll();
  }
  onActivate(id:number){
    
    this.ProductService.ApproveCust(id).subscribe(x=>{
      this.getAll()
      if(x=1)
      this.toastr.info("This review is approved")
      else
      this.toastr.info("This review is dis-approved.")
    })
   
  }
}