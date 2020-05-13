import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { DatePipe } from '@angular/common';
import { OrdersService } from "./orders.service";
import { Router } from '@angular/router';
@Component({
  selector: 'app-orders-details',
  templateUrl: './orders-details.component.html',
  styleUrls: ['./orders-details.component.css']
})
export class OrdersDetailsComponent implements OnInit {
  data: any;
  first: string;
  scnd: string;
  spot: any = 'option'
  constructor(
    private toastr: ToastrService
    , private datePipe: DatePipe,
    private srevice: OrdersService,
    private router: Router
  ) { }


  count: number = 0; page: number = 1; perPage: number = 10; pagesToShow: number = 10;
  SearchName: any = '';
  pageSize: any;

  ngOnInit() {
    this.page = 1;
    this.pageSize = 10;
    this.getOrders();
  }
OriginalData:any
getOrderStatus(val){
  debugger

this.data=this.OriginalData
 var filterData= this.data.filter(x=>x.OrderStatus==val)
 if(filterData.length==0){
   this.toastr.info("No order with this status "+ val)
 }else{
   this.data=filterData
 }
}
  getOrders() {
    this.srevice.getorders(this.page, this.pageSize).subscribe((response: any) => {
debugger
      this.data = response.data;
      this.OriginalData=this.data
      this.count = response.count;
    })
  }

  getTariks(first: string, scnd: string) {

    this.page = 1;
    this.first = first
    this.scnd = scnd
    this.srevice.getordersdate(first, scnd, this.page, this.pageSize).subscribe((response: any) => {
      this.data = response.data;
      this.count = response.count;
      this.val = ''
    })
  }

  val: any;
  moment(val: string) {
    this.val = val;
    this.page = 1;
    this.srevice.getordersdoy(this.page, this.pageSize, val).subscribe((response: any) => {
      console.log(response)
      this.data = response.data;
      this.count = response.count;
      this.first = ''
      this.scnd = ''
    })
  }

  goToInvoice(Id) {
    this.router.navigate(['/admin/invoice'], { queryParams: { orderno: Id } })
  }
  goToOrder(Id) {
    this.router.navigate(['/admin/orderReportDetails'], { queryParams: { orderno: Id } })
  }
  prevPage() {
    this.page = this.page - 1;
    if (this.first && this.scnd)
      this.getTariks(this.first, this.scnd);
    if (this.val)
      this.moment(this.val);
    this.getOrders();
  }

  nextPage() {
    this.page = this.page + 1;
    if (this.first && this.scnd)
      this.getTariks(this.first, this.scnd);
    if (this.val)
      this.moment(this.val);
    this.getOrders();
  }
  goToPage(event) {
    this.page = event;
    if (this.first && this.scnd)
      this.getTariks(this.first, this.scnd);
    if (this.val)
      this.moment(this.val);
    this.getOrders();
  }

  newPageSize(e) {
    if (e == 0) {
      e = this.count;
    }
    this.perPage = e;
    if (this.first && this.scnd)
      this.getTariks(this.first, this.scnd);
    if (this.val)
      this.moment(this.val);
    this.getOrders();
  }

  search() {
    this.page = 1;
    if (this.first && this.scnd)
      this.getTariks(this.first, this.scnd);
    if (this.val)
      this.moment(this.val);
    this.getOrders();
  }


}
