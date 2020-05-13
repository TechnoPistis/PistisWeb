import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {CommonService  } from "../../../shared/services/common.service";
@Injectable({
  providedIn: 'root'
})
export class CustomersService {
  data=new CommonService();
  
  private url=this.data.getUri();
  products: any;
  Countries: any;
  constructor(private http:HttpClient) {
    }


    refreshList(page,size,name){
      return this.http.get(this.url + 'Customer/getCustomers?page=' + page + '&pageSize=' + size + '&search=' + name);
   }
   deactivateCustomer(id : number){
     
    return this.http.get(this.url + 'Customer/deactivateCustomer?Id='+id);
   }
   deleteCustomer(id : number){
    
   return this.http.delete(this.url + 'Customer/deleteCustomer?Id='+id);
  }
  ResetPassword(id : number){
    
   return this.http.get(this.url + 'Customer/forgotpassword1?Id='+id);
  }
 
}
