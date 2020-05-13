import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonService } from 'src/app/shared/services/common.service';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {
  data=new CommonService();
  private url=this.data.getUri();
  
  constructor(private http:HttpClient) { }
  getOrderById(id){
      
    return  this.http.get(this.url+'orders/getOrderById?orderno='+id)
  }
}
