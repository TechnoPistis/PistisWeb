import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { OrdersService } from '../my-orders/orders.service';

@Component({
  selector: 'app-order-report',
  templateUrl: './order-report.component.html',
  styleUrls: ['./order-report.component.css']
})
export class OrderReportComponent implements OnInit {
  orderID: any;
  DataList: any
  order:any
  constructor(public orders: OrdersService, private Router: Router
    , public _route: ActivatedRoute) {
      // this._route.queryParams.subscribe(params => {
      //   this.orderID = params['orderID'];
      // });
      this.orderID=178
    }

  ngOnInit() {
    this.getOrderById()
  }
  getOrderById() {
    if (+this.orderID) {
      this.orders.getOrdersByorderId(+this.orderID).subscribe(r => {
        debugger
        this.order = r;
        //onsole.log(this.DataList)
      })
    }

  }

}
