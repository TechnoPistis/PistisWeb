import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { datepickerAnimation } from 'ngx-bootstrap/datepicker/datepicker-animations';
import { CommonService } from '../services/common.service';
import { DatePipe } from '@angular/common'
import { Tracklog } from './Tracklog.service';
@Injectable({
  providedIn: 'root'
})
export class UserLogService {
  LogInDate: any;
 data:userLog
  UserId: any;
  LogOutDate:any;
  ipAddress: any;
  description:string
  Action:string
  
  data1=new CommonService();
  url1=this.data1.getUri();

  constructor(private http: HttpClient,private datepipe:DatePipe,public tracklog:Tracklog) { }
  UserLog(ProductId:number,PageId:number,Url:string,ActionId:number){
      
    this.data= new userLog();
    this.UserId=localStorage.getItem('UserId')
      this.LogInDate=localStorage.getItem('LogInDate')
      this.LogInDate= this.datepipe.transform(this.LogInDate,'MM-dd-yyyy HH:mm:ss')
      this.LogOutDate=localStorage.getItem('LogOutDate');
     
      this.LogOutDate=this.datepipe.transform(this.LogOutDate,'MM-dd-yyyy HH:mm:ss');
     this.ipAddress= localStorage.getItem('IpAddress' );
this.data.UserId=this.UserId as number;
this.data.LogInDate=this.LogInDate

this.data.LogOutDate=this.LogOutDate;
this.data.IPAddress=this.ipAddress;
this.data.ProductId=ProductId;
this.data.PageId=PageId;
this.data.Url=Url;
this.data.ActionId=ActionId;
return this.http.post(this.url1+'UserLog/SaveUserLog', this.data).subscribe(x=>{
 // this.tracklog.handleSuccess(this.description="Saving user logs",this.Action="User logs",JSON.stringify(x))
}
//,error => this.tracklog.handleError(error,this.Action="User logs")

);

  }

}
export class userLog{
  Id?:number
UserId?:number
ActionId?:number
PageId?:number
Url:string
ProductId?:number
IPAddress:string
LogInDate?:Date
LogOutDate?:Date

}