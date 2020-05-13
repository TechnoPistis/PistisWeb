import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { TrackingService } from '../Track.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  constructor(
    private _router: Router,
    private toastr: ToastrService,
    public _service: TrackingService
  ) { }

  ordersList: any[] = [];
  count: number = 0; page: number = 1; perPage: number = 10; pagesToShow: number = 10;
  SearchName: any='';
  pageSize: any;

  ngOnInit() {
    this.page=1;
    this.pageSize=10;
    this.getAllOrders();
  }

  getAllOrders() {
    this._service.getAllOrder(this.page,this.pageSize,this.SearchName).subscribe((response: any) => {
        
      this.ordersList = response.data;
      this.count = response.count;
    });
  }

  editOrder(id){
    if(+id){
      this._router.navigate(['/admin/tracking/update'], { queryParams: { Id: id } });
    }
  }

  trackOrder(id){
    if(+id){
    }
  }

  prevPage() {
    this.page = this.page - 1;
    this.getAllOrders();
  }
  nextPage() {
    this.page = this.page + 1;
    this.getAllOrders();
  }
  goToPage(event) {
    this.page = event;
    this.getAllOrders();
  }

  newPageSize(e) {
    if (e == 0) {
      e = this.count;
    }
    this.perPage = e;
    this.getAllOrders();
  }

  search(){
    this.page=1;
    this.getAllOrders();
  }

}
