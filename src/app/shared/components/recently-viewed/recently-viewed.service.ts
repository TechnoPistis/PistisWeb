import { Injectable } from '@angular/core';
import { CommonService } from '../../services/common.service';
import { HttpClient } from '@angular/common/http';
import { HomePageComponent } from '../home-page/home-page.component';

@Injectable({
  providedIn: 'root'
})
export class RecentlyViewedService {

  private commonUrl=new CommonService().getUri();
  constructor(private http:HttpClient) { }

  getLists(UserId:number,IpAddress,Page,pageSize){
    var model={
      UserId:UserId,
      IpAddress:IpAddress,
      Page:Page,
      PageSize:pageSize
    }
      return this.http.post(this.commonUrl+'UserLog/getAllRecentlyViewed',model)
  
  }
}
