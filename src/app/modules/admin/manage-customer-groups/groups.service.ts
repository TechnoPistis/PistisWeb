import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Groups } from "./groups";
import { CommonService } from "../../../shared/services/common.service";
@Injectable({
  providedIn: 'root'
})
export class GroupsService {
  formData:Groups;
  data=new CommonService();
  private url=this.data.getUri();
  constructor(private http:HttpClient) { }
  getGroups(){
    
    return this.http.get(this.url+"CustomerGroup/getCustomerGroup")
  }
  usersInGroup(groupId:number){

    return this.http.post(this.url+'CustomerGroupUsers/getCustomerGroupUsers?groupId='+groupId,"")
   }
   delete(userId:number,groupId:number){
    // alert();
     return this.http.delete(this.url+'CustomerGroupUsers/deleteCustomerFromgroup?UserId='+userId+'&groupId='+groupId)
   }
   addUser(){
     
   }
}
