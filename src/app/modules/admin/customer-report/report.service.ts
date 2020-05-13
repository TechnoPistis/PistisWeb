import { Injectable } from '@angular/core';
import { CommonService } from 'src/app/shared/services/common.service';
import { HttpClient } from '@angular/common/http';
import { DatePipe } from "@angular/common";
@Injectable({
  providedIn: 'root'
})
export class ReportService {
  data = new CommonService();

  private url = this.data.getUri();
  constructor(private http: HttpClient
    , private datepipe: DatePipe) { }
  getCustomers(firstDate: any, seconedDate: any) {
      
    firstDate = this.datepipe.transform(firstDate, 'MM/dd/yyyy HH:mm:ss')
    seconedDate = this.datepipe.transform(seconedDate, 'MM/dd/yyyy HH:mm:ss')
var model:any={
  firstDate:"",
  seconedDate:""
}
model.firstDate=firstDate;
model.seconedDate=seconedDate;
    return this.http.post(this.url + 'user/getCustomers1',model);
  }
  getCustomersday(val: string) {
      
    return this.http.get(this.url + 'user/getCustomersday?DMY=' + val)
  }
  getCustomersOrders(firstDate: any, seconedDate: any) {
      
    firstDate = this.datepipe.transform(firstDate, 'dd/MM/yyyy HH:mm:ss')
    seconedDate = this.datepipe.transform(seconedDate, 'dd/MM/yyyy HH:mm:ss')

    return this.http.get(this.url + 'user/getUserOrders?firstDate=' + firstDate + '&seconedDate=' + seconedDate);
  }
  getCustomersOrdersday(val: string) {
      
    return this.http.get(this.url + 'user/getUserOrdersDOY?DOY=' + val)
  }
}
