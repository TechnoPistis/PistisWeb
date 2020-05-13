import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BannerImage } from './BannerImage.model';
import {CommonService  } from "src/app/shared/services/common.service";
@Injectable({
  providedIn: 'root'
})
export class BannerService {
  url=new CommonService().getUri();
  images:[]
  formData:BannerImage;
  constructor(private http:HttpClient) { 
  
  
  }

  refreshList(){
    
   return this.getproducts().toPromise();
  }
   postCategory(body: BannerImage ){
    
    
    return this.http.post(this.url+'banner/uploadFile', body)
    }
  // postCategory(fileToUpload: File){
  //   
  //   const model:FormData =new FormData();
  //   model.append('Icon', fileToUpload, fileToUpload.name);
    
  //   return this.http.post(this.url+'uploadFile', model)
  //   }
    getproducts(){
     
      return this.http.get(this.url+'banner/getBannerImages');
     
    }
   deleteCategory(id : number){
     return this.http.get(this.url + 'banner/Bannerdelete?Id='+id);
    }
}
