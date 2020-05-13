import { Injectable } from '@angular/core';
import { CommonService } from "../../../shared/services/common.service";
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  data = new CommonService();
  baseuri = this.data.getUri();
  constructor(private http: HttpClient) { }
  getCategories() {
    return this.http.get(this.baseuri + 'UserLog/getHomePageTrack');
  }
  getCategories1(val:number) {
    return this.http.get(this.baseuri + 'UserLog/getById?Id='+val);
  }
  getUserIds(){
    return this.http.get(this.baseuri+'UserLog/filterUser')
  }

}
