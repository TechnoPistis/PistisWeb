import { Component, OnInit } from '@angular/core';
import { OrdersService } from "./orders.service";
import { Router, ActivatedRoute } from '@angular/router';
import { UserLogService } from '../../services/user-log.service';
@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent implements OnInit {
  DataList: any
  DataList1: any
  orderID: any;
  todayDate=new Date();
  UserName:any;
  hidemainDiv: boolean=false;
  Url: string;
  productId: any=0;
  constructor(public order: OrdersService, private Router: Router
    , public _route: ActivatedRoute,private userLog:UserLogService
  ) { }

  ngOnInit() {
 
    const UserId= localStorage.getItem('UserId');

if(UserId==undefined ||UserId==null){
this.hidemainDiv=false
}else{
this.hidemainDiv=true
}
    this.UserName=localStorage.getItem('UserName');
      
    this._route.queryParams.subscribe(params => {
      this.orderID = params['orderID'];
    });

    if (!this.orderID)
      this.getAllOrders();
    else
      this.getOrderById();

      this.Url = this.Router.url;
      this.userLog.UserLog(this.productId, 1, this.Url, 1);
  }
  logout(){
    
    localStorage.removeItem('UserName')
    localStorage.removeItem('UserId')
    this.Router.navigate(['/customer/UserLogin'])
  }
  getOrderById() {
    if (+this.orderID) {
      this.order.getOrdersById(+this.orderID).subscribe(r => {
        this.DataList = r;
        console.log(this.DataList)
      })
    }
    else
      this.getAllOrders();
  }

  getAllOrders() {
    this.order.getOrders().subscribe(r => {
      this.DataList = r;
      console.log(this.DataList)
    })
  }

  getproductId(id: number, PvdId: number) {
    console.log(id)
    this.Router.navigate(['/RatingReview'], { queryParams: { Id: id, ProductVdId: PvdId } });
  }

  trackOrder(orderId) {
      
    // window.localStorage.removeItem("OrderId");
    // window.localStorage.setItem("OrderId",orderId);
    this.Router.navigate(['/trackorder'], { queryParams: { orderId: orderId } });
  }
  productDetail(Id: number, variantId: number) {
      
    this.Router.navigate(['/product-details'], { queryParams: { Id: Id, variantId: variantId } });
  }
  gotoReturn(id: number, PvdId: number,CheckoutItemId:number,Quantity:number) {
    this.Router.navigate(['/return'], { queryParams: { Id: id, ProductVdId: PvdId,CheckoutItemId:CheckoutItemId,Quantity:Quantity } });
    }
}
