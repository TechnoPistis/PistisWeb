import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { VendorBalanceService } from '../vendor-balance.service';

@Component({
  selector: 'app-view-detail',
  templateUrl: './view-detail.component.html',
  styleUrls: ['./view-detail.component.css']
})
export class ViewDetailComponent implements OnInit {
  vendorId: any;
  List:any[]=[];
  
  count: number = 0; page: number = 1; perPage: number = 10; pagesToShow: number = 10;
  isPaid: any="all";
  pageSize: any;
  constructor(private route: ActivatedRoute,private service:VendorBalanceService) { }
model={
  isPaid:"all",
  page:1,
  pageSize:10,
  vendorId:0
}
  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.vendorId = params['vendorId'];
      this.viewDetail(this.vendorId,this.isPaid);
    })
  }
viewDetail(vendorId,isPaid)
{
    
  this.model.vendorId=vendorId
  this.model.isPaid=isPaid
  this.model.page=this.page
  this.service.getVendorTransactions(this.model).subscribe((trans:any)=>{
    this.List=trans.data;
    this.count=trans.count;
  })
}
searchPaid(ispaid)
{
  this.viewDetail(this.vendorId,ispaid);
}
prevPage() {
  this.page = this.page - 1;
  this.viewDetail(this.vendorId,this.isPaid);
}
nextPage() {
  this.page = this.page + 1;
  this.viewDetail(this.vendorId,this.isPaid);

}
goToPage(event) {
  this.page = event;
  this.viewDetail(this.vendorId,this.isPaid);

}

newPageSize(e) {
  if (e == 0) {
    e = this.count;
  }
  this.perPage = e;
  this.viewDetail(this.vendorId,this.isPaid);

}

search() {
  this.page = 1;
  this.viewDetail(this.vendorId,this.isPaid);

}
}
