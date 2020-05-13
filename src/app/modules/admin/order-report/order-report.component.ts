import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { OrdersService } from 'src/app/shared/components/my-orders/orders.service';
import { ToastrService } from 'ngx-toastr';



@Component({
  selector: 'app-order-report',
  templateUrl: './order-report.component.html',
  styleUrls: ['./order-report.component.css']
})
export class OrderReportComponent implements OnInit {
  isChecked1:boolean=false
  isChecked2:boolean=false
  isChecked3:boolean=false
  isChecked4:boolean=false
  isChecked5:boolean=false
  isChecked6:boolean=false

  orderID: any;
  DataList: any
  order:any
  constructor(public orders: OrdersService, private Router: Router,
    private srevice: OrdersService,
    public toaster:ToastrService
    , public _route: ActivatedRoute) {
      this._route.queryParams.subscribe(params => {
        this.orderID = params['orderno'];
      });
   //   this.orderID=178
    }

  ngOnInit() {
    this.getOrderById()
  }
  checkValue(val:string){
    debugger
    if(val=="Processing"){
      this.isChecked1=true
      this.isChecked2=false
      this.isChecked3=false
      this. isChecked4=false
      this. isChecked5=false
      this. isChecked6=false
    }  else if(val=="Shipped"){
      this.isChecked1=false
      this.isChecked2=true
      this.isChecked3=false
      this. isChecked4=false
      this. isChecked5=false
      this. isChecked6=false
    }else if(val=="Pending"){
      this.isChecked1=false
      this.isChecked2=false
      this.isChecked3=true
      this. isChecked4=false
      this. isChecked5=false
      this. isChecked6=false
    }else if(val=="Completed"){
      this.isChecked1=false
      this.isChecked2=false
      this.isChecked3=false
      this. isChecked4=true
      this. isChecked5=false
      this. isChecked6=false
    }else if(val=="Rejected"){
      this.isChecked1=false
      this.isChecked2=false
      this.isChecked3=false
      this. isChecked4=false
      this. isChecked5= true
      this. isChecked6=false
    }else if(val=="Refunded"){
      this.isChecked1=false
      this.isChecked2=false
      this.isChecked3=false
      this. isChecked4=false
      this. isChecked5=false
      this. isChecked6=true
    }
    this.srevice.updateOrder( this.orderID,val).subscribe(x=>{
      this.toaster.info("Order status successfully")
    })
         }
  getOrderById() {
    debugger
    if (+this.orderID) {
      this.orders.getOrdersByorderId(+this.orderID).subscribe((r:any) => {
        debugger
        if(r.OrderStatus=="Processing")
        this.isChecked1=true
       else if(r.OrderStatus=="Shipped")
        this.isChecked2=true
        else if(r.OrderStatus=="Pending")
        this.isChecked3=true
        else if(r.OrderStatus=="Completed")
        this.isChecked4=true
         else if(r.OrderStatus=="Rejected")
        this.isChecked5=true
        else if(r.OrderStatus=="Refunded")
        this.isChecked6=true
        // else if(r.OrderStatus=="Processing")
        // this.isChecked1=true
        // else  if(r.OrderStatus=="Processing")
        // this.isChecked1=true
        this.order = r;
        //onsole.log(this.DataList)
      })
    }

  }
}
