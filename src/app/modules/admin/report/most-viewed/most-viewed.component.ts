import { Component, OnInit } from '@angular/core';
import { ReportService } from '../report.service';
import { ToastrService } from 'ngx-toastr/toastr/toastr.service';
import { ThrowStmt } from '@angular/compiler';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-most-viewed',
  templateUrl: './most-viewed.component.html',
  styleUrls: ['./most-viewed.component.css']
})


export class MostViewedComponent implements OnInit {
  constructor(public ReportService: ReportService, ) {
  }

  MostViewedProducts: any[] = [];
  ProductCategories: any[] = [];
  FromDate;
  ToDate;
  CategoryId = null;

  count: number = 0; page: number = 1; perPage: number = 10; pagesToShow: number = 10;
  SearchName: any;
  pageSize: any;

  ngOnInit() {
    this.page = 1;
    this.pageSize = 10;
    this.GetMostViewed(this.page);
    this.GetCategory();
  }

  GetMostViewed(page:any) {
      
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
    }

    this.ReportService.GetMostViewedProduct(model).subscribe((response: any) => {
        
      this.MostViewedProducts = response.data;
      this.count = response.count;
    },
      Error => {
          
        // this.tostr.info("Somthing went wrong!");
      }
    );
  }

  GetCategory() {
    this.ReportService.getSubcategories().subscribe((response: any[]) => {
        
      this.ProductCategories = response;
    },
      Error => {
          
      }
    );
  }

  prevPage() {
    this.page = this.page - 1;
    this.GetMostViewed(this.page);
  }
  nextPage() {
    this.page = this.page + 1;
    this.GetMostViewed(this.page);
  }
  goToPage(event) {
    this.page = event;
    this.GetMostViewed(this.page);
  }

  newPageSize(e) {
    if (e == 0) {
      e = this.count;
    }
    this.perPage = e;
    this.GetMostViewed(this.page);
  }

  search(){
    this.page=1;
    this.GetMostViewed(this.page);
  }

}
