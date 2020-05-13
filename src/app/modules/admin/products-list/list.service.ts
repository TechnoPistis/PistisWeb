import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Category } from "../product-category/category";
import {CommonService  } from "../../../shared/services/common.service";
@Injectable({
  providedIn: 'root'
})
export class ListService {
  formData:Category;
  list:Category[];
  data=new CommonService();
  private url=this.data.getUri();
  products: any;
  Countries: any;
  headers={
    headers: new HttpHeaders({
        'Content-Type': 'application/json'
    })
};
  constructor(private http:HttpClient) { }
  refreshList(){
    
let x=  this.http.get(this.url+'category/getCategory')
    
    return x
  }
  
  deleteCategory(id : number){
    return this.http.delete(this.url + 'category/delete?id='+id);
   }
  
   getproducts(){
     
     return this.http.get(this.url+'category/getProducts').toPromise().then();
   }
  }

