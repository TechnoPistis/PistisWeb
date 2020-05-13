import { Injectable } from '@angular/core';
import { Service } from "./Service";
import { CommonService } from 'src/app/shared/services/common.service';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class EditListService {
  list:Service[];
  formData:Service
  
  data=new CommonService();
  private url=this.data.getUri();
  constructor(private http:HttpClient) { }
  saveCategory(formData:Service){
      
     //alert(formData.GroupName)
     return this.http.post(this.url+'category/saveMenuListdetails',formData)
     }
     getMenulist(){
      return this.http.get(this.url+'category/getCategory1').toPromise()
     }
     getMenuDetails(SubId:number){
      return this.http.get(this.url+'category/getParentValue?SubId='+SubId)

     }

     getParentList(){
      return this.http.get(this.url+'category/parentList')

     }

}
