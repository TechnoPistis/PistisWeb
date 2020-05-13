import { Component, OnInit } from '@angular/core';
import { StockReportService } from './stock-report.service';

@Component({
  selector: 'app-stocks',
  templateUrl: './stocks.component.html',
  styleUrls: ['./stocks.component.css']
})
export class StocksComponent implements OnInit {
  UserId: any;

  constructor(
    private _service: StockReportService
  ) { }

  count: number = 0; page: number = 1; perPage: number = 10; pagesToShow: number = 10;
  SearchName: any;
  pageSize: any;

  LowStockArray: any[] = [];
  ProductCategories: any[] = [];
  CategoryId = 0;
  OptionId=0;
  ngOnInit() {
    this.UserId=+localStorage.getItem("UserId");
    this.page = 1;
    this.pageSize = 10;
    this.GetStocks(this.page);
    this.GetCategory();
    
  }

  GetStocks(page) {
      
    if (!this.CategoryId ) {
      this.CategoryId = 0;
    }
    this.page=page;
    var model = {
      CategoryId: this.CategoryId,
      page: page,
      size: this.pageSize,
      VendorId:this.UserId,
    }
if(this.OptionId==0)
{
    this._service.LowStock(model).subscribe((response: any) => {
      this.LowStockArray = response.data;
      this.count = response.count;
    });
  }
  else if(this.OptionId==1)
  {
    this._service.OutStock(model).subscribe((response: any) => {
      this.LowStockArray = response.data;
      this.count = response.count;
    });
  }
  else if(this.OptionId==2)
  {
    this._service.HighDemand(model).subscribe((response: any) => {
      this.LowStockArray = response.data;
      this.count = response.count;
    });
  }
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

prevPage() {
  this.page = this.page - 1;
  this.GetStocks(this.page);
}
nextPage() {
  this.page = this.page + 1;
  this.GetStocks(this.page);
}
goToPage(event) {
  this.page = event;
  this.GetStocks(this.page);
}

newPageSize(e) {
  if (e == 0) {
    e = this.count;
  }
  this.perPage = e;
  this.GetStocks(this.page);
}

search(){
  this.page=1;
  this.GetStocks(this.page);
}


}
