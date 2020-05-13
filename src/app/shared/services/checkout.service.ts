import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { datepickerAnimation } from 'ngx-bootstrap/datepicker/datepicker-animations';
import { CommonService } from '../services/common.service';
import { DatePipe } from '@angular/common'
import { Time } from 'highcharts';
@Injectable({
  providedIn: 'root'
})
export class CheckoutLog{
    Date:any
    checkoutPra=new checkout();
    data1=new CommonService();
    url1=this.data1.getUri();
    
    constructor(private http: HttpClient,private datepipe:DatePipe) { }
    checkoutlog( checkoutPra=new checkout()){
    return this.http.post(this.url1+"checkout/checkUserLog",checkoutPra)
    }
    
}
export class checkout{
    UserId?:number=0
    IpAddress:string=""
  //  Url:string
    CartId?:number=0
    Date?:Date= new Date();
    StartTime:Date
 //   EndTime:Date
    Step:string=""
    ShippingCharges?:any=0
    Pass:any
    Error:string=""
    Action:string
}