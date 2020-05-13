import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FeatureProduct } from "../add-feature-product/feature-product";
import {  CommonService} from "../../../shared/services/common.service";
import { CommonModule } from '@angular/common';
@Injectable({
  providedIn: 'root'
})
export class ListService {
  formData:FeatureProduct;
  list:FeatureProduct[];
  uri=new CommonService()
  private url=this.uri.getUri();
  products: any;
  Countries: any;
  data:[]
  headers={
    headers: new HttpHeaders({
        'Content-Type': 'application/json'
    })
};
  constructor(private http:HttpClient) { }
  refreshList(page, size, name){
    return this.http.get(this.url + 'FeatureProduct/getProductsFilter?page=' + page + '&pageSize=' + size + '&search=' + name);
  }
  refreshList1(){
    return this.http.get(this.url + 'FeatureProduct/getProductsFilter2');
  }
  
  deleteFeatureProduct(id : number){
    return this.http.delete(this.url + 'FeatureProduct/deleteFeatureProduct?ProductId='+id);
   }
  
   getproducts(){
     
     return this.http.get(this.url+'FeatureProduct/getFeatureProduct').toPromise().then();
   }
}
