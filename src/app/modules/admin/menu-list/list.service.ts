import { Injectable } from '@angular/core';
import { Service } from "../sub-category/service";
import { CommonService } from 'src/app/shared/services/common.service';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class ListService {
  formData:Service;
  list:Service[];
  uri=new CommonService()
  private url=this.uri.getUri();
  products: any;
  Countries: any;
  data:[]
  constructor(private http:HttpClient) { }
  refreshList(page,size,name){
    return this.http.get(this.url + 'category/getSubCategory?page=' + page + '&pageSize=' + size + '&search=' + name);
  }
  
  deleteMenu(id : number){
    return this.http.get(this.url + 'category/DeleteMenu1?Id='+id);
   }
  
  //  getproducts(){
     
  //    return this.http.get(this.url+'category/getCategory').toPromise().then();
  //  }
}
