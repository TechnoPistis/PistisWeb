import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Footer } from './footer';
import {  CommonService} from "src/app/shared/services/common.service";
@Injectable({
  providedIn: 'root'
})
export class FooterService {
  list:Footer[];
  formData:Footer
  private data=new CommonService();
  url=this.data.getUri();
  products: any;
  Countries: any;
  headers={
    headers: new HttpHeaders({
        'Content-Type': 'application/json'
    })
};
  constructor(private http:HttpClient) { }
  refreshList(){
      
    return  this.http.get(this.url+'footer/getfooter')
    .toPromise().then(res => this.list = res as [] );
    
  }
  deleteCategory(Id : number){
    return this.http.delete(this.url + 'footer/deleteFooterHeader?id='+Id);
   }
   getProduct(id : number){
    this.refreshList()
    return this.list.find(e=>e.Id==id);
   }
   saveCategory(formData:Footer){
   
  //  alert(formData.Name)
    return this.http.post(this.url+'footer/savefooterHeader?Name='+ formData.Name,"")
    }
    updateCategory(formData:Footer){
    //  alert(formData.Id)
      return this.http.post(this.url+'footer/updatefooterHeader?Id='+ formData.Id+'&Name='+formData.Name,"")
     }
     getproducts(){
       
       return this.http.get(this.url+'footer/getfooter');
     }

}
