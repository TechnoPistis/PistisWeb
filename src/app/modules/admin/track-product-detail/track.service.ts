import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonService } from 'src/app/shared/services/common.service';

@Injectable({
  providedIn: 'root'
})
export class TrackService {

  data = new CommonService();
  baseuri = this.data.getUri();
  constructor(private http: HttpClient) { }
  getCategories() {
    return this.http.get(this.baseuri + 'UserLog/productDetailPageTrack');
  }
  getCategories1(val:number) {
    return this.http.get(this.baseuri + 'UserLog/getById?Id='+val);
  }
  getUserIds(){
    return this.http.get(this.baseuri+'UserLog/getUsers')
  }
}
