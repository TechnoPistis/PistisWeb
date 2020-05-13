import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonService } from '../../../shared/services/common.service';

@Injectable({
  providedIn: 'root'
})
export class ReportVendorService {

  constructor(
    private _http: HttpClient,
  ) { }

  private data = new CommonService().getUri();

  GetMostViewedProduct(search: any) {
    return this._http.post(this.data + 'VendorReport/most-viewed', search);
  }

  GetReviewedProducts(search: any) {
    return this._http.post(this.data + 'VendorReport/reviewed-products', search);
  }

  getSubcategories() {
    return this._http.get(this.data + 'category/getSubcategories');
  }

  GetOrderReport(search: any) {
    return this._http.post(this.data + 'VendorReport/order-report', search);
  }



}
