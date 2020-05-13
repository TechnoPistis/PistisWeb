import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  spot1:any='option'
  spot:any='option'
  constructor(
    private toastr : ToastrService 
    ,private datePipe:DatePipe,
  ) { }

  ngOnInit() {
  }

}
