import { Component, OnInit } from '@angular/core';
import { ReportVendorService } from '../report.service';
import { ToastrService } from 'ngx-toastr/toastr/toastr.service';


@Component({
  selector: 'app-order-report',
  templateUrl: './order-report.component.html',
  styleUrls: ['./order-report.component.css']
})
export class OrderReportComponent implements OnInit {

  ProductOrderReport: any[] = [];
  ProductCategories: any[] = [];
  FromDate;
  ToDate;
  CategoryId = null;
  VendorId;

  count: number = 0; page: number = 1; perPage: number = 10; pagesToShow: number = 10;
  SearchName: any;
  pageSize: any;

  constructor(public ReportVendorService: ReportVendorService) { }

  ngOnInit() {
    this.page = 1;
    this.pageSize = 10;
     this.GetOrderReport(this.page);
     this.GetCategory();
  }

  GetCategory() {
    this.ReportVendorService.getSubcategories().subscribe((response: any[]) => {
        
      this.ProductCategories = response;
    },
      Error => {
          
      }
    );
  }

  GetOrderReport(page:any) {
      
    if (!this.CategoryId) {
      this.CategoryId = 0;
    }
    this.page=page;

    var model = {
      FromDate: this.FromDate,
      ToDate: this.ToDate,
      CategoryId: this.CategoryId,
      page: page,
      size: this.pageSize,
      VendorId: localStorage.getItem('UserId')
    }

    this.ReportVendorService.GetOrderReport(model).subscribe((response: any) => {
        
      this.ProductOrderReport = response.data;
      this.count = response.count;
    },
      Error => {
      }
    );
  }

  prevPage() {
    this.page = this.page - 1;
    this.GetOrderReport(this.page);
  }
  nextPage() {
    this.page = this.page + 1;
    this.GetOrderReport(this.page);
  }
  goToPage(event) {
    this.page = event;
    this.GetOrderReport(this.page);
  }

  newPageSize(e) {
    if (e == 0) {
      e = this.count;
    }
    this.perPage = e;
    this.GetOrderReport(this.page);
  }

  search(){
    this.page=1;
    this.GetOrderReport(this.page);
  }


}
