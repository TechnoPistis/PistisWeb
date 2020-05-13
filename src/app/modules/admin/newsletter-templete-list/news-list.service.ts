import { Injectable } from '@angular/core';
import { News } from "../newsletter-templete/news";
import { CommonService } from 'src/app/shared/services/common.service';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class NewsListService {
  formData:News;
  data=new CommonService();
  private url=this.data.getUri();
  constructor(private http:HttpClient) { }
  refreshList(){
    
    return  this.http.get(this.url+'Template/newsLetters')
  }
  delete(Id:number){
    return  this.http.get(this.url+'Template/delNewsletter?Id='+Id)
  }
  sentEmail(Id:number){
    return this.http.get(this.url+'NewsLetter/SendEmailsToUsers?Id='+Id)
  }
  searchnews(val:string=''){
    
    return  this.http.get(this.url+'NewsLetter/searchNews?val='+val)
  }
}
