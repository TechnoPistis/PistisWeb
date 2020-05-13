import { Injectable } from '@angular/core';
import { CommonService } from 'src/app/shared/services/common.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class VendorBalanceService {

  data=new CommonService();
  
  private url=this.data.getUri();
  products: any;
  Countries: any;
  constructor(private http:HttpClient) {
    }


    getVendorBalance(page,size,name){
      return this.http.get(this.url +'vendorBalance/getAll?page=' + page + '&pageSize=' + size + '&search=' + name);
   }
   getVendorTransactions(model){
    return this.http.post(this.url +'vendorBalance/getDetail',model);

   }
   getById(vendorId)
   {
    return this.http.get(this.url +'vendorBalance/getById?VendorId=' +vendorId);

   }
   addWithTrans(model){
    return this.http.post(this.url +'vendorBalance/addWithTrans',model);

   }
}
