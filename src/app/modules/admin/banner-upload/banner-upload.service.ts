import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonService } from 'src/app/shared/services/common.service';
import { BannerUpload } from "./banner-upload";
@Injectable({
  providedIn: 'root'
})
export class BannerUploadService {
  data=new CommonService();
  private url=this.data.getUri();
  constructor(private http:HttpClient) { }

  postCategory(body: BannerUpload ){
    
    
    return this.http.post(this.url+'banner/uploadFile1', body)
    }
    postCategory1(body: BannerUpload ){
    
    
      return this.http.post(this.url+'banner/uploadFile2', body)
      }
    editImages(view:string,side:string){
      return this.http.get(this.url+'banner/editImages?Data='+view+'&side='+side )
    }
    saveurlEdit(selectedSide:string,selectedView:string,body: BannerUpload){
      return this.http.post(this.url+'banner/updateUrl?selectedSide='+selectedSide+'&selectedView='+selectedView ,body)
    }
    getLeftSideView(CurrentSide:string){
      return this.http.get(this.url+'banner/getLeftSideView?CurrentSide='+CurrentSide)
    }
}
