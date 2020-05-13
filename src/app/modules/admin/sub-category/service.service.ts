import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonService } from 'src/app/shared/services/common.service';
import { Service } from "./service";
@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  list:Service[];
  formData:Service
  
  data=new CommonService();
  private url=this.data.getUri();
  constructor(private http:HttpClient) { }
  saveCategory(formData:Service){
      
     //alert(formData.GroupName)
     return this.http.post(this.url+'category/SaveSubMenu',formData)
     }
     getMenulist(){
      return this.http.get(this.url+'category/getCategory').toPromise()
     }
     getSpanishMenulist(){
      return this.http.get(this.url+'category/getCategoryinSpanish')
     }

}
