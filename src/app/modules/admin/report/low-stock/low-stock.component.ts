import { Component, OnInit } from '@angular/core';
import { ReportService } from '../report.service';

@Component({
  selector: 'app-low-stock',
  templateUrl: './low-stock.component.html',
  styleUrls: ['./low-stock.component.css']
})
export class LowStockComponent implements OnInit {

  constructor(
    private _service: ReportService
  ) { }

  count: number = 0; page: number = 1; perPage: number = 10; pagesToShow: number = 10;
  SearchName: any;
  pageSize: any;

  LowStockArray: any[] = [];
  ProductCategories: any[] = [];
  CategoryId = null;
  ngOnInit() {
    this.page = 1;
    this.pageSize = 10;
    this.GetLowStocks(this.page);
    this.GetCategory();
  }

  GetLowStocks(page) {
      
    if (!this.CategoryId || this.CategoryId=="null") {
      this.CategoryId = 0;
    }
    this.page=page;
    var model = {
      CategoryId: this.CategoryId,
      page: page,
      size: this.pageSize
    }

    this._service.LowStock(model).subscribe((response: any) => {
      this.LowStockArray = response.data;
      this.count = response.count;
    },
      Error => {

      });
  }

  GetCategory() {
    this._service.getSubcategories().subscribe((response: any[]) => {
        
      this.ProductCategories = response;
      if (this.CategoryId == 0) {
        this.CategoryId = null;
      }
    },
      Error => {
          
      }
    );
  }

  DeleteLowStock(id: number) {
    this._service.DeleteLowStock(id).subscribe((response: any) => {
    },
      Error => {
      });
  }

  
prevPage() {
  this.page = this.page - 1;
  this.GetLowStocks(this.page);
}
nextPage() {
  this.page = this.page + 1;
  this.GetLowStocks(this.page);
}
goToPage(event) {
  this.page = event;
  this.GetLowStocks(this.page);
}

newPageSize(e) {
  if (e == 0) {
    e = this.count;
  }
  this.perPage = e;
  this.GetLowStocks(this.page);
}

search(){
  this.page=1;
  this.GetLowStocks(this.page);
}

}
