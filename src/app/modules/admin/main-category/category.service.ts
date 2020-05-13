import { Injectable } from '@angular/core';
import { Category } from './category';
import { CommonService } from 'src/app/shared/services/common.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  list:Category[];
  data=new CommonService();
  private url=this.data.getUri();
  formData= new Category();
  constructor(private http:HttpClient) { }
  postCategory(formData : Category){
    return this.http.post(this.url+'category/SaveMainMenu',formData)
    }
}
