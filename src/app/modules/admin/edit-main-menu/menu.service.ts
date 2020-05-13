import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { CommonService } from "../../../shared/services/common.service";

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  data=new CommonService();
  private url=this.data.getUri();

  constructor(private http:HttpClient) { }
save(menu){
  debugger
    return this.http.post(this.url +'category/UpdateCategory',menu );
    }

}
