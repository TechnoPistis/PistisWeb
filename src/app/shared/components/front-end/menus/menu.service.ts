import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {CommonService  } from "../../../services/common.service";
import { Menu } from './menu';
@Injectable({
  providedIn: 'root'
})
export class MenuService {
  private url=new CommonService().getUri();
  products: any;
  Countries: any;
  headers={
    headers: new HttpHeaders({
        'Content-Type': 'application/json'
    })
};
  list: Menu[];
  constructor(private http:HttpClient) { }
  refreshList(){
    
    return  this.http.get(this.url+'category/getCategory')
    .toPromise().then(res => this.list = res as Menu[] );
    
  }

  
   getproducts(){
     
     return this.http.get(this.url+'category/getAllCategory');
   }
  }

