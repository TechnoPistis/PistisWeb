import { Component, OnInit } from '@angular/core';
import { ReviewsService } from "./reviews.service";
import { CommonService } from 'src/app/shared/services/common.service';
import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-customer-reviews',
  templateUrl: './customer-reviews.component.html',
  styleUrls: ['./customer-reviews.component.css']
})


export class CustomerReviewsComponent implements OnInit {
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
  validate: boolean;
  message: boolean;
  description: any;
  active:boolean
  deactive:boolean=false
  Review = {
    UserId: 0,
    ProductId: 1,
    Review: '',
    Rating: 0,
    ReviewStatusId:0
  }
  id:any
  ReviewStatusId: any;
  constructor(private service: ReviewsService
    , private datePipe: DatePipe,
    private http: HttpClient,
    private toastr: ToastrService) { }

  count: number = 0; page: number = 1; perPage: number = 10; pagesToShow: number = 10;
  SearchName: any;
  pageSize: any;

  ngOnInit() {
    this.page = 1;
    this.pageSize = 10;
    this.getReviews();
  }
  onActivate(id:number){
    this.service.deActivateCustomer(id).subscribe(x=>{
      
      if(x==1){
      this.toastr.info("This review is approved ")
      this.active=true
      this.id=id
      }
      else{
      this.active=false
      this.id=id

      this.toastr.info("This review is dis-approved")
      }
    })
    this.getReviews();

  }

  getReviews() {
    this.service.getCustomerReviews(this.page,this.pageSize).subscribe((x: any) => {
      this.data = x.data;
      
      this.count=x.count;
    })
  }
  onClick(){
    this.FirstDiv=true
    this.SeconedDiv=false
    this.thirdDiv=false
  }
  resetForm() {
    this.Data = null
    this.first = ''
    this.scnd = ''
  }

  showReviews(UserId, customerName: string) {
    this.FirstDiv = false
    this.SeconedDiv = true
    this.UserId = UserId
    this.customerName = customerName
  }

  getTariks(first: string, scnd: string) {
    this.WithoutFilter = false
    this.WithFilter = true
    this.service.FilterCustomerReviews(first, scnd, this.UserId).subscribe(x => {

      this.product2 = x as []

    })

    //   
    // let FilterData = this.data[0].product2
    // FilterData.forEach(element => {
    //   let reviewDate=this.datePipe.transform(new Date(element.ReviewDate), 'dd/MM/yyyy');

    //   if ( reviewDate>= this.first)
    //     if (reviewDate <= this.scnd) {
    //       console.log(element)
    //     }
    // });

  }
  moment(val: any) {

    this.WithoutFilter = false
    this.WithFilter = true
    this.service.FilterCustomerReviewsStatus(this.UserId, val).subscribe(x => {

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
      this.userReview = x
      this.rate = x.Rating
      this.ReviewStatusId=x.ReviewStatusId
      this.description = x.Review
    })
  }
  selectChangeHandler (event: any) {
    //update the ui
    this.ReviewStatusId = event.target.value;
    this.validate = true;
  }
  getRating(val: number) {
      
    console.log(val)
    this.Rating = val;
    this.validate = true;
    this.rate = val
    //this.url + "Rating/getRating?UserId="+this.UserId  +'&ProductId='+this.id

  }
  focusFunction() {
      
    if (this.validate == false) {
      this.message = true
    }
  }
  getDescription(Desc: string) {
    if (this.validate == true) {
      this.Review
      this.Review.ProductId = this.productId
      this.Review.Review = Desc
      this.Review.Rating = this.Rating
      this.Review.ReviewStatusId=this.ReviewStatusId
      let UserId: any = this.UserId
      this.Review.UserId = UserId as number
      if (this.Review.ProductId > 0 && this.Review.UserId > 0)
        return this.http.post(this.url + "Rating/saveRating", this.Review).subscribe(x => {
          this.toastr.success('Review updated successfully.');
          this.getReviews();
          this.FirstDiv=true
        })
    } else {
      this.toastr.success('Review updated successfully.');
      this.getReviews();
      this.FirstDiv=true

    }
  }

  
prevPage() {
  this.page = this.page - 1;
  this.getReviews();
}
nextPage() {
  this.page = this.page + 1;
  this.getReviews();
}
goToPage(event) {
  this.page = event;
  this.getReviews();
}

newPageSize(e) {
  if (e == 0) {
    e = this.count;
  }
  this.perPage = e;
  this.getReviews();
}

search(){
  this.page=1;
  this.getReviews();
}

}
