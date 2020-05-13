import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Footer } from './footer';
import { CommonService } from "../../../shared/services/common.service";
@Injectable({
  providedIn: 'root'
})
export class FooterService {
  list:Footer[];
  formData:Footer
  data=new CommonService()
  private url=this.data.getUri();
  products: any;
  Countries: any;
  filterList:Footer
  headers={
    headers: new HttpHeaders({
        'Content-Type': 'application/json'
    })
};
  constructor(private http:HttpClient) { }
  refreshList(){
    
    return  this.http.get(this.url+'FooterUrl/getfooter')
    .toPromise().then(res => this.list = res as [] );
    
  }
  deleteCategory(id : number){
    return this.http.delete(this.url + 'FooterUrl/deleteFooterUrl?Id='+id);
   }
   getOneFooterdata(id:number){
    return this.http.get(this.url + 'FooterUrl/getOneFooterUrl?Id='+id)
   }
   getProduct(id : number){
    this.getOneFooterdata(id)
       
 
   }
   postCategory(formData:Footer){
    formData.Id=0;
    
    return this.http.post(this.url+'FooterUrl/saveFooterUrl',formData)
    }
    updateCategory(formData:Footer){
     
      return this.http.post(this.url+'FooterUrl/updateFooterUrl',formData)
     }
     getproducts(){
       
       return this.http.get(this.url+'FooterUrl/getfooter');
     }
    //  getFooter(){
      
    //   return this.http.get(this.url+'FooterUrl/getfooter');
    // }

}
