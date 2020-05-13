import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { VendorBalanceService } from './vendor-balance.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-vendor-balance',
  templateUrl: './vendor-balance.component.html',
  styleUrls: ['./vendor-balance.component.css']
})
export class VendorBalanceComponent implements OnInit {
  public List: any = [];
  selectedVal: string;
  Vendor: any;
  constructor(private service: VendorBalanceService, private toastr: ToastrService
    , private Router:Router,public dialog: MatDialog) { }


  count: number = 0; page: number = 1; perPage: number = 10; pagesToShow: number = 10;
  SearchName: any;
  pageSize: any;

  showDiv:any=false;
  display: string="none";

  ngOnInit() {
    this.page = 1;
    this.pageSize = 10;
    this.SearchName = "";
    this.getVendors();

  }

  getVendors() {
    this.service.getVendorBalance(this.page, this.pageSize, this.SearchName).subscribe((data: any) => {
      this.List = data.data;
      this.count = data.count;
    })
  }
viewDetail(vendorId)
{
  this.Router.navigate(['/admin/balance/detail/'], { queryParams: { vendorId: vendorId } });
  
}
openpopup(vendorId){
  this.service.getById(vendorId).subscribe((data)=>{
if(data)
{
  this.Vendor=data;
    this.showDiv=true;
  this.display = 'block'
}
  })
  
}
closepopup(){
  this.showDiv=false;
  this.display = 'none'
}
pay(transno,payment){
    if(!transno || transno=="" ){
      this.toastr.info("Please enter the transaction number")
      return false
    }
    if(!payment || transno=="" ){
      this.toastr.info("Please enter the payment amount")
      return false
    }
  var model={
    Transno:transno,
    Payment:payment,
    VendorId:this.Vendor.VendorId
  }
  this.service.addWithTrans(model).subscribe((data)=>{
    if(data)
    {
    this.toastr.success("Data is updated")
    this.closepopup();
    this.getVendors();
  }
  else{
    this.toastr.warning("Something went wrong")
    //this.getVendors();
  }
  })

}
  prevPage() {
    this.page = this.page - 1;
    this.getVendors();
  }
  nextPage() {
    this.page = this.page + 1;
    this.getVendors();
  }
  goToPage(event) {
    this.page = event;
    this.getVendors();
  }

  newPageSize(e) {
    if (e == 0) {
      e = this.count;
    }
    this.perPage = e;
    this.getVendors();
  }

  search() {
    this.page = 1;
    this.getVendors();
  }
}