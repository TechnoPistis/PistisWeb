import { Injectable } from '@angular/core';
import { News } from "./news";
import { CommonService } from 'src/app/shared/services/common.service';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class NewsService {
  formData:News;
  data=new CommonService();
  private url=this.data.getUri();
  constructor(private http:HttpClient) { }
  postCategory(formData : News){
      
    //alert(formData.ProductId)
        return this.http.post(this.url+'Template/addNewsletter',formData)
        }
        getnewsletter(Id:number){
          return this.http.get(this.url+'Template/getNewsletter?Id='+Id)
        }

}
