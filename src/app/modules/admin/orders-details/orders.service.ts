import { Injectable } from '@angular/core';
import { CommonService } from 'src/app/shared/services/common.service';
import { HttpClient } from '@angular/common/http';
import { DatePipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  data = new CommonService();

  private url = this.data.getUri();
  constructor(private http: HttpClient
    , private datePipe: DatePipe) { }

  getorders(page, size) {

    return this.http.get(this.url + 'orders/getOrderDetails?page=' + page + '&pageSize=' + size)
  }

  getordersdate(firstDate: any, seconedDate: any, page, size) {

    firstDate = this.datePipe.transform(firstDate, 'dd/MM/yyyy HH:mm:ss')
    seconedDate = this.datePipe.transform(seconedDate, 'dd/MM/yyyy HH:mm:ss')
    return this.http.get(this.url + 'orders/getOrderDetails?First=' + firstDate + '&scnd=' + seconedDate + '&page=' + page + '&pageSize=' + size)
  }

  getordersdoy(page, size, doy: any) {
    return this.http.get(this.url + 'orders/filtergetOrderDetails2?page=' + page + '&pageSize=' + size + '&DOY=' + doy)
  }
  updateOrder(orderno:number, OrderStatus:string){
    return this.http.get(this.url + 'orders/UpdateOrderStatus?orderno=' + orderno + '&OrderStatus=' + OrderStatus )

  }
}
