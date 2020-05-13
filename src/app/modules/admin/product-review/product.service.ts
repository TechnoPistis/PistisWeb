import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { CommonService } from 'src/app/shared/services/common.service';
@Injectable({
  providedIn: 'root'
})
export class ProductService {
  data=new CommonService();
  
  private url=this.data.getUri();
  constructor(private http:HttpClient
    , private datePipe: DatePipe) { }
    getCustomerReviews(){
        
      return this.http.get(this.url+'Rating/productReview')
    }
    ApproveCust(Id:number){
        
      return this.http.get(this.url+'Rating/productReviewUpdate?Id='+Id)
    }
}

