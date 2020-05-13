import { Injectable } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Slider } from "../sliders/slider";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {  CommonService} from "../../../shared/services/common.service";
@Injectable({
  providedIn: 'root'
})
export class SildersListService {
  formData:Slider;
  list:Slider[];
  data=new CommonService();
  private url=this.data.getUri();
  constructor(private http:HttpClient) { }
  refreshList(page, size, name){    
    return this.http.get(this.url + 'sliders/getsliderImages?page=' + page + '&pageSize=' + size + '&search=' + name);
  }
  getproducts(){
    
    return this.http.get(this.url+'sliders/getsliderImages').toPromise().then();
  
  }
  deleteCategory(id : number){
    return this.http.delete(this.url + 'sliders/delete?id='+id);
   }
}
