import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { CommonService } from "../../../shared/services/common.service";
@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  data = new CommonService();
  private url = this.data.getUri();
  constructor(private http: HttpClient) { }
  updateOrder(orderno:number, OrderStatus:string){
    debugger
    return this.http.get(this.url + 'orders/UpdateOrderStatus?orderno=' + orderno + '&OrderStatus=' + OrderStatus )

  }
  getOrders() {

    let userId = +localStorage.getItem('UserId');
    if(userId==null){
      userId=0;
    }
    let IpAddress = localStorage.getItem('IpAddress');
    return this.http.get(this.url + 'orders/userOrders?CustomerId=' + userId + '&IpAddress=' + IpAddress, {headers: new HttpHeaders().set('Authorization', `Bearer ${sessionStorage.getItem('token')}`)});
  }

  getOrdersById(orderId) {

    let userId = +localStorage.getItem('UserId');
    if(userId==null){
      userId=0;
    }
    let IpAddress = localStorage.getItem('IpAddress');
    return this.http.get(this.url + 'orders/userOrders?CustomerId=' + userId + '&IpAddress=' + IpAddress + '&orderId=' + orderId, {headers: new HttpHeaders().set('Authorization', `Bearer ${sessionStorage.getItem('token')}`)});
  }
  getOrdersByCustomer() {
    let userId = +localStorage.getItem('UserId');
    if(userId==null){
      userId=0;
    }
    let IpAddress = localStorage.getItem('IpAddress');
    return this.http.get(this.url + 'orders/user-order/all?CustomerId=' + userId + '&IpAddress=' + IpAddress)
    }
    getOrdersByorderId(orderId) {

      let userId = +localStorage.getItem('UserId');
      if(userId==null){
        userId=0;
      }
      //let IpAddress = localStorage.getItem('IpAddress');
      return this.http.get(this.url + 'orders/getOrdersByorderId?orderno=' +orderId);
    }
}
