import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FeatureProduct } from "./feature-product";
import { CommonService } from "../../../shared/services/common.service";

@Injectable({
  providedIn: 'root'
})
export class FeatureProductService {
  edit:FeatureProduct
  formData:FeatureProduct;
  list:FeatureProduct[];
  List1:FeatureProduct[];
  data=new CommonService();
  private url=this.data.getUri();

  constructor(private http:HttpClient) { }
  getProductfilter(filtration:any) {
      
    return this.http.post(this.url + 'FeatureProduct/getProductsFilter',filtration);
  }
  refreshList(){
    
    return this.http.get(this.url+'FeatureProduct/getProductsFilter')
    .toPromise().then(res => this.list = res as FeatureProduct[]);
    
  }
  deleteCategory(id : number){
    return this.http.delete(this.url + 'FeatureProduct/deleteFeatureProduct?ProductId='+id);
   }
   getProduct(id : number){
    
    this.refreshList()
    return this.list.find(e=>e.Id==id);
  
   }
   postCategory(ProductId:any){
    
//alert(formData.ProductId)
    return this.http.get(this.url+'FeatureProduct/saveFeatureProduct?ProductId='+ProductId)
    }
    updateCategory(formData : FeatureProduct){
     
      return this.http.post(this.url+'FeatureProduct/updateFeatureProduct?ProductId='+formData.ProductId, "")
     }
     getproducts(){
       
       return this.http.get('FeatureProduct/getFeatureProduct');
     }


}
