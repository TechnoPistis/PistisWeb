import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Group } from "./group";
import { CommonService } from "../../../shared/services/common.service";

@Injectable({
  providedIn: 'root'
})
export class GroupService {
  list:Group[];
  formData:Group
  
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
    
    return  this.http.get(this.url+'CustomerGroup/getCustomers')
    .toPromise().then(res => this.list = res as [] );
    
  }
  getGroupName(Id:number){
      
    return this.http.get(this.url+"CustomerGroup/getOneCustomerGroup?Id="+Id)
  }
  deleteCategory(Id : number){
    return this.http.delete(this.url + 'CustomerGroup/deleteGroup?groupId='+Id);
   }
   getProduct(id : number){
    this.http.get(this.url+'CustomerGroup/getCustomerGroup').subscribe(res=>{
      this.list=res as Group[]
      return this.list.find(e=>e.Id==id);
    }
     )
    
   }
   saveCategory(formData:Group){
     
    //alert(formData.GroupName)
    return this.http.post(this.url+'CustomerGroup/createGroup',formData)
    }
    updateCategory(formData:Group){
    //  alert(formData.Id)
      return this.http.post(this.url+'CustomerGroup/editGroup',formData)
     }
     getproducts(){
       
       return this.http.get(this.url+'footer/getfooter');
     }
     getCustomers(){
       
      return this.http.get(this.url+'Customer/getCustomers');
    }
}

