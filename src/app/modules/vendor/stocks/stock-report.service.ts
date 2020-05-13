import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonService } from 'src/app/shared/services/common.service';

@Injectable({
  providedIn: 'root'
})
export class StockReportService {
  constructor(
    private _http: HttpClient,
  ) { }

  private data = new CommonService().getUri();
  
  LowStock(search: any) {
    return this._http.post(this.data + 'vendorReport/low-stock', search);
  }
  OutStock(search: any) {
    return this._http.post(this.data + 'vendorReport/out-stock', search);
  }
  HighDemand(search: any) {
    return this._http.post(this.data + 'vendorReport/high-demand', search);
  }
  getSubcategories() {
    return this._http.get(this.data + 'category/getSubcategories');
  }
}
