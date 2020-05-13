import { Component, OnInit } from '@angular/core';
import { TrackService } from "../track.service";
@Component({
  selector: 'app-order-live',
  templateUrl: './order-live.component.html',
  styleUrls: ['./order-live.component.css']
})
export class OrderLiveComponent implements OnInit {
data:any
orders:any
period:any
  constructor(
    private service:TrackService
  ) { }

  ngOnInit() {
    this.getSales("Y")
    this.getOrders("Y")
  }
  getSales(val:string){
    this.service.getSales(val).subscribe(x=>{
      debugger
      this.data=x

          })
  }
  getOrders(val:string){
    this.service.getOrders(val).subscribe(x=>{
      debugger
      this.orders=x
          })
  }
  sales(val){
this.getSales(val)
  }
  order(val:string){
this.getOrders(val)
  }
}
