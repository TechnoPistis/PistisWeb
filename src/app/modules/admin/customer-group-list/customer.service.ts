import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Customer } from "./customer";
import { CommonService } from "../../../shared/services/common.service";
@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  formData:Customer;
  list:Customer[];
  data=new CommonService();
  private url=this.data.getUri();
  products: any;
  Countries: any;
  constructor(private http:HttpClient) { }
  refreshList(){
    return  this.http.get(this.url+'CustomerGroupUsers/getCategory')
    .toPromise().then(res => this.list = res as Customer[] );
    
  }
   getGroups(page,size,name){
    return this.http.get(this.url + 'CustomerGroup/getCustomerGroup?page=' + page + '&pageSize=' + size + '&search=' + name);
  }

  addCustomerInGroup(UserId:number,groupId:number){
    return this.http.get(this.url+'CustomerGroupUsers/addCustomerIngroup?Id='+UserId+'&groupId='+groupId)
  }
  
  deleteGroup(groupId:number){
    return this.http.get(this.url+'CustomerGroup/deleteGroup?groupId='+groupId)
    
   }

  manageUsers(groupId:number){

   // return this.http.get(this.url+'addCustomerIngroup?groupId='+groupId)
  }
  editGroupName(){
    //
  }
  

}
