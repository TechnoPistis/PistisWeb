import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { datepickerAnimation } from 'ngx-bootstrap/datepicker/datepicker-animations';
import { CommonService } from '../services/common.service';
import { DatePipe } from '@angular/common'
import { log } from "./Log";
import { throwError } from 'rxjs';
import { IfStmt } from '@angular/compiler';
@Injectable({
    providedIn: 'root'
})
export class Tracklog {
    data: log
    data1 = new CommonService();
    url1 = this.data1.getUri();
    UserId: any;
    LogInDate: any;
    ipAddress: any
  serviceStart: boolean;
    constructor(private http: HttpClient, private datepipe: DatePipe) {
      this.UserId = +localStorage.getItem('UserId')
     

     }
    
 
    trackUserLog(LogData: log) {
      debugger
      
    if(localStorage.getItem("serviceStart")=="FALSE")
    return false;

      debugger
      if(!this.UserId){
return false
      }
        this.data = new log();
        this.UserId = localStorage.getItem('UserId')
        this.LogInDate = new Date()
        this.LogInDate = this.datepipe.transform(this.LogInDate, 'MM-dd-yyyy HH:mm:ss')
        this.ipAddress = localStorage.getItem('IpAddress');

        this.data.UserId = this.UserId as number;
        this.data.ActionDateTime = this.LogInDate
        this.data.IpAddress = this.ipAddress;
       this.data.PageUrl=LogData.PageUrl
       this.data.RequestUrl=LogData.RequestUrl
        this.data.LogtypeId =0;
        this.data.Description=LogData.Description;
        this.data.Result=LogData.Result;
        this.data.Action=LogData.Action;


        return this.http.post(this.url1 + 'UserLog/TrackUser', this.data).subscribe();

    }
    handleError(error,Action:string,requestUrl:string ,pageUrl:string) {
        
        let errorMessage = '';
        if (error.error instanceof ErrorEvent) {
          errorMessage = `Error: ${error.error.message}`;
        } else {
          errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
        }
       var errorLog= new log();
    errorLog.Description=error.message;
    errorLog.Result= "Error Code:" +error.status+"Message:"+ error.message ;
    errorLog.Action=Action
    errorLog.PageUrl=pageUrl
    errorLog.RequestUrl=requestUrl
this.trackUserLog(errorLog)
      }
      handleSuccess(Description:string,Action:string,Success:any,requestUrl:string ,pageUrl:string){
        
var SuccessLog= new log();
SuccessLog.Description=Description
SuccessLog.RequestUrl=requestUrl
SuccessLog.PageUrl=pageUrl
SuccessLog.Action=Action
SuccessLog.Result=Success
this.trackUserLog(SuccessLog)

      }
      handleSuccess1(Description:string,Action:string,Success:any,requestUrl:string ,pageUrl:string,guid:string){
        
var SuccessLog= new log();
SuccessLog.Description=Description
SuccessLog.RequestUrl=requestUrl
SuccessLog.PageUrl=pageUrl
SuccessLog.Action=Action
SuccessLog.Result=Success
SuccessLog.Guid=guid
this.trackUserLog1(SuccessLog)

      }
      handleError1(error,Action:string,requestUrl:string ,pageUrl:string,guid:string) {
        
        let errorMessage = '';
        if (error.error instanceof ErrorEvent) {
          errorMessage = `Error: ${error.error.message}`;
        } else {
          errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
        }
       var errorLog= new log();
    errorLog.Description=error.message;
    errorLog.Result= "Error Code:" +error.status+"Message:"+ error.message ;
    errorLog.Action=Action
    errorLog.PageUrl=pageUrl
    errorLog.RequestUrl=requestUrl
    errorLog.Guid=guid
this.trackUserLog1(errorLog)
      }
      handleError2(error,Action:string,requestUrl:string ,pageUrl:string,guid:string) {
        
        // let errorMessage = '';
        // if (error.error instanceof ErrorEvent) {
        //   errorMessage = `Error: ${error.error.message}`;
        // } else {
        //   errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
        // }
       var errorLog= new log();
    errorLog.Description=error
    errorLog.Result= "Error :" +error ;
    errorLog.Action=Action
    errorLog.PageUrl=pageUrl
    errorLog.RequestUrl=requestUrl
    errorLog.Guid=guid
this.trackUserLog1(errorLog)
      }
      // getGEOLocation(ip) {

      //   //let headers = new HttpHeaders();
      //     let url = "https://api.ipgeolocation.io/ipgeo?apiKey=0f4e06b0721a4a2b82bce38abc80b31a&ip="+ip; 
      //       return this.http
      //             .get(url)
                
      //     } 
     

      trackUserLog1(LogData: log) {
        debugger
        
        if(localStorage.getItem("serviceStart")=="FALSE")
        return false;
      
                this.data = new log();
        if(navigator.appVersion[5]!='W')
               this.data.IsDesktop=false
               else
               this.data.IsDesktop=true
              // var numberIp;
              
//                this.getGEOLocation(numberIp).subscribe(res => {
//  debugger
//                 var latitude = res['latitude'];
//                 var longitude = res['longitude'];
//                 var currency = res['currency']['code'];
//                 var currencysymbol = res['currency']['symbol'];
//                 var city = res['city'];
//                 var country = res['country_code3'];
//                 var isp = res['isp'];
//                 console.log(res);
//               });
this.data.Country=""
var device=navigator.appVersion[5];
              if(device=="W")
              this.data.AppVersion="Web"
              else if(device=="L")
              this.data.AppVersion="Android"
              else if(device=="i")
              this.data.AppVersion="iphone"
                this.LogInDate = new Date()
                this.LogInDate = this.datepipe.transform(this.LogInDate, 'MM-dd-yyyy HH:mm:ss')
                this.ipAddress = localStorage.getItem('IpAddress');
                this.data.UserId = this.UserId as number;
                this.data.ActionDateTime = this.LogInDate
                this.data.IpAddress = this.ipAddress;
               this.data.PageUrl=LogData.PageUrl
               this.data.RequestUrl=LogData.RequestUrl
                this.data.LogtypeId =0;
                this.data.Description=LogData.Description;
                this.data.Result=LogData.Result;
                this.data.Action=LogData.Action;
                this.data.Guid=LogData.Guid
        
        
                return this.http.post(this.url1 + 'UserLog/TrackUser', this.data).subscribe();
        
            }
            newGuid() {
              return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
                var r = Math.random() * 16 | 0,
                  v = c == 'x' ? r : (r & 0x3 | 0x8);
                return v.toString(16);
              });
            }

}
