import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonService } from '../../../shared/services/common.service';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  constructor(
    private _http: HttpClient,
  ) { }

  private data = new CommonService().getUri();

  GetMostViewedProduct(search: any) {
    return this._http.post(this.data + 'report/most-viewed', search);
  }

  getSubcategories() {
    return this._http.get(this.data + 'category/getSubcategories');
  }

  GetVendors(){
    return this._http.get(this.data+'user/getVendors');
  }

  GetProductCategory() {
    return this._http.get(this.data + 'category/getAllCategory');
  }

  Search(model: any) {
    return this._http.post(this.data + 'report/most-viewed', model);
  }

  BestSeller(search: any) {
      
    return this._http.post(this.data + 'report/best-seller', search);
  }

  DeleteBestSeller(Id: any) {
    return this._http.post(this.data + 'report/best-seller/delete?Id=' + Id, null);
  }

  LowStock(search: any) {
    return this._http.post(this.data + 'report/low-stock', search);
  }

  DeleteLowStock(Id: any) {
    return this._http.post(this.data + 'report/low-stock?Id=' + Id, null);
  }
  
}
