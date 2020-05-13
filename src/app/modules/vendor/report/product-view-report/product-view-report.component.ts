import { Component, OnInit } from '@angular/core';
import { ReportVendorService } from '../report.service';
import { ToastrService } from 'ngx-toastr/toastr/toastr.service';

@Component({
  selector: 'app-product-view-report',
  templateUrl: './product-view-report.component.html',
  styleUrls: ['./product-view-report.component.css']
})
export class ProductViewReportComponent implements OnInit {

  ReviewedProducts: any[] = [];
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
     this.GetReviewedProducts(this.page);
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

  GetReviewedProducts(page:any) {
      
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

    this.ReportVendorService.GetReviewedProducts(model).subscribe((response: any) => {
        
      this.ReviewedProducts = response.data;
      this.count = response.count;
    },
      Error => {
      }
    );
  }

  prevPage() {
    this.page = this.page - 1;
    this.GetReviewedProducts(this.page);
  }
  nextPage() {
    this.page = this.page + 1;
    this.GetReviewedProducts(this.page);
  }
  goToPage(event) {
    this.page = event;
    this.GetReviewedProducts(this.page);
  }

  newPageSize(e) {
    if (e == 0) {
      e = this.count;
    }
    this.perPage = e;
    this.GetReviewedProducts(this.page);
  }

  search(){
    this.page=1;
    this.GetReviewedProducts(this.page);
  }
  

}
