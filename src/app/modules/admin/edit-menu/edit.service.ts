import { Injectable } from '@angular/core';
import { Edit } from "./edit";
import { CommonService } from 'src/app/shared/services/common.service';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class EditService {
  list:Edit[];
  formData:Edit
  
  data=new CommonService();
  private url=this.data.getUri();
  constructor(private http:HttpClient) { }
  updateCategory(formData:Edit){
    //  alert(formData.Id)
      return this.http.post(this.url+'CustomerGroup/editGroup',formData)
     }

  getEditMenu(Id:number){
    return this.http.get(this.url+'category/editmenu?Id='+Id).toPromise()
  }
}
