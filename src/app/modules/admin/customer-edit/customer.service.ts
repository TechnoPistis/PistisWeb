import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Customer } from "./customer";
import { CommonService } from "../../../shared/services/common.service";
import { CommonModule } from '@angular/common';
@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  edit:Customer
  formData:Customer;
  list:Customer[];
  List1:Customer[];
  data=new CommonService();
  private url=this.data.getUri();

  constructor(private http:HttpClient) { }
  // refreshList(){
  //   
  //   return this.http.post(this.url+'getCustomers',"")
  //   .toPromise().then(res => 
  //     {
      
  //       this.list = res as Customer[]
       
  //     })
       
  // }
   getProduct(id : number){
   // this.refreshList()
    
    return this.http.post(this.url+'Customer/getCustomer?Id='+id,"")
   }
getState(){
  return this.http.get(this.url+'Customer/getState')
}
getGender(){
  return this.http.get(this.url+'Customer/getGender')
}
getCountry(){
  return this.http.get(this.url+'Customer/getCountry')
}

getLanguage(){
  return this.http.get(this.url+'Customer/getLanguage')
}
  //  postCategory(formData : Customer){
    
  //   alert(formData.Id)
  //   return this.http.post(this.url+'saveFeatureProduct?ProductId='+formData.ProductId, "")
  //   }
    updateCustomer(user : Customer){
     
      return this.http.post(this.url+'Customer/editCustomer',user)
     }
    
}
