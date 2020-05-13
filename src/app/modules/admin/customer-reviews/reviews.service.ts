import { Injectable } from '@angular/core';
import { CommonService } from 'src/app/shared/services/common.service';
import { HttpClient } from '@angular/common/http';
import { DatePipe } from '@angular/common';


@Injectable({
  providedIn: 'root'
})
export class ReviewsService {
  data = new CommonService();

  private url = this.data.getUri();
  constructor(private http: HttpClient
    , private datePipe: DatePipe) { }
  getCustomerReviews(page, size) {
      
    return this.http.get(this.url + 'Rating/CustomerReviews?page=' + page + '&pageSize=' + size)
  }
  FilterCustomerReviews(firstDate: any, scnddate: any, UserId: any) {
    firstDate = this.datePipe.transform(new Date(firstDate), 'dd/MM/yyyy HH:mm:ss');
    scnddate = this.datePipe.transform(new Date(scnddate), 'dd/MM/yyyy HH:mm:ss');
    return this.http.get(this.url + 'Rating/FilterCustomerReviews?firstDate=' + firstDate + '&lastDate=' + scnddate + '&UserId=' + UserId)

  }
  FilterCustomerReviewsStatus(UserId: any, val: any) {
    return this.http.get(this.url + 'Rating/FilterCustomerReviewsStatus?UserId=' + UserId + '&ReviewSatusId=' + val)

  }
  getRatingperUser(UserId: any, productid: any) {
    return this.http.get(this.url + "Rating/getRatingperUser?UserId=" + UserId + '&ProductId=' + productid)

  }

  getProductReviews(page, size) {
      
    return this.http.get(this.url + 'Rating/productReview?page=' + page + '&pageSize=' + size)
  }
  
  FilterProductReviews(firstDate: any, scnddate: any, ProductId: any) {
    firstDate = this.datePipe.transform(new Date(firstDate), 'dd/MM/yyyy HH:mm:ss');
    scnddate = this.datePipe.transform(new Date(scnddate), 'dd/MM/yyyy HH:mm:ss');
    return this.http.get(this.url + 'Rating/FilterProductReviews?firstDate=' + firstDate + '&lastDate=' + scnddate + '&ProductId=' + ProductId)

  }
  FilterProductIdReviews(ProductId: any) {
    return this.http.get(this.url + 'Rating/FilterProductIdReviews?ProductId=' + ProductId)

  }
  FilterProductReviewsStatus(productId: any, val: any) {
    return this.http.get(this.url + 'Rating/FilterProductReviewsStatus?productId=' + productId + '&ReviewSatusId=' + val)

  }
  UpdateRating(UserId, id) {
    return this.http.get(this.url + "Rating/getRating?UserId=" + UserId + '&ProductId=' + id)
  }
  deActivateCustomer(Id:number){
    return this.http.get(this.url + "Rating/deActivate?Id="  +Id)

  }
}
