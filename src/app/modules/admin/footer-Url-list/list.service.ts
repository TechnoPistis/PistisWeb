import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { List } from "./list";
import { CommonService } from "../../../shared/services/common.service";
@Injectable({
  providedIn: 'root'
})
export class ListService {
  formData:List;
  list:List[];
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
    
    return  this.http.get(this.url+'FooterUrl/getFooterUrl')
    .toPromise().then(res => this.list = res as List[] );
  }
  deleteFeatureProduct(id : number){
    return this.http.delete(this.url + 'FooterUrl/deleteFooterUrl?id='+id);
   }
   getproducts(){
     
     return this.http.get(this.url+'FooterUrl/getFooter').toPromise().then();
   }

}
