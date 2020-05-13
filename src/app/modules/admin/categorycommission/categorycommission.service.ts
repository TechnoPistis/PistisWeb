import { Injectable } from '@angular/core';
import { CommonService } from 'src/app/shared/services/common.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CategorycommissionService {
  data=new CommonService();
  
  private url=this.data.getUri();
  products: any;
  Countries: any;
  constructor(private http:HttpClient) {
    }
  getAll(){
    return this.http.get(this.url + 'commission/getAll');
 }
 delete(id)
 {
  return this.http.get(this.url + 'commission/delete?Id='+id);
 }
 add(model: any) {
  return this.http.post(this.url + 'commission/add', model);
}

update(Id,Commission) {
  return this.http.post(this.url + 'commission/edit?Id='+Id,Commission);
}

getCategories() {
  return this.http.get(this.url + 'commission/getCategory');
}
}
