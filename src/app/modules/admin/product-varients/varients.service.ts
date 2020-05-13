import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Category } from "../product-category/category";
import {CommonService  } from "../../../shared/services/common.service";
@Injectable({
  providedIn: 'root'
})
export class VarientsService {
  data=new CommonService();
  private url=this.data.getUri();
  constructor(private http:HttpClient) { }
  
  getproducts(page, size, name,vendorId){
     
    return this.http.get(this.url+'products/getProductVarients?page='+page +"&pageSize=" +size +"&search=" +name+"&vendorId="+vendorId)
  }
  saveProductPrice(obj:any){
    return this.http.post(this.url+'products/ProductVarientsPrice',obj);

  }
  vendors(){
    return this.http.get(this.url+'products/getVendors');

  }
}
