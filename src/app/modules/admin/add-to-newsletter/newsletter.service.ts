import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Newsletter } from "./newsletter";
import { CommonService } from "../../../shared/services/common.service";
@Injectable({
  providedIn: 'root'
})
export class NewsletterService {
  formData:Newsletter;
  list:Newsletter[];
  data=new CommonService();
  
  private url=this.data.getUri();
  constructor(private http:HttpClient) {
    this.refreshList();
   }
  refreshList(){
    
    return  this.http.post(this.url+'NewsLetter/getCustomers',"") 
   }
    deletenewsLetter(id : number){
      return this.http.delete(this.url + 'NewsLetter/deleteNewsletter?Id='+id);
     }
    
     getCustomers(){
       
       return this.http.get(this.url+'CustomerGroup/getCustomers')
     }
     onSubscribe(Id:number){
      return this.http.post(this.url+"NewsLetter/subscribeUser?Id="+Id,"");
    }
    getProduct(id : number){
    
      this.refreshList()
      return this.list.find(e=>e.Id==id);
    
     }
     postCategory(formData : Newsletter){
      
    //  alert(formData.Id)
    if(formData.Id==null || formData.Id==0){
      return this.http.post(this.url+'NewsLetter/addNewsLetter', formData)
    }else{
      return this.http.get(this.url+'NewsLetter/addToNewsLetterId?Id='+formData.Id)
    }

      }
      updateCategory(formData : Newsletter){
       
        //return this.http.post(this.url+'updateFeatureProduct?ProductId='+formData.ProductId, "")
       }

}
