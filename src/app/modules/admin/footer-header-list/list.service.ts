import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Footer } from "../footer-header/footer";
import { CommonService } from "../../../shared/services/common.service";
@Injectable({
  providedIn: 'root'
})
export class ListService {
  formData:Footer;
  list:Footer[];
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
    
    return  this.http.get(this.url+'footer/getFooter')
    .toPromise().then(res => this.list = res as Footer[] );
    
  }
  
  deleteFeatureProduct(Id : number){
    return this.http.get(this.url + 'footer/deleteFooterHeader?Id='+Id);
   }
  
   getproducts(){
     
     return this.http.get(this.url+'FeatureProduct/getProducts').toPromise().then();
   }
}
