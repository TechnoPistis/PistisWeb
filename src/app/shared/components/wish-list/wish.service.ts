import { Injectable } from '@angular/core';
import { CommonService } from "./../../services/common.service";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class WishService {

 //"http://localhost:44304/api/";
 private url = new CommonService().getUri();
 constructor(private http: HttpClient,   private Router: Router) {

 }
 getProductDetails( variantId: number) {
  let UserId:any= localStorage.getItem('UserId')
  if(!UserId){
    UserId =0
   }
   let IpAddress=localStorage.getItem('IpAddress')
  return this.http.get(this.url + "category/AddWishListProducts?variantId=" + variantId +"&UserId=" + UserId +"&IpAddress=" + IpAddress, {headers: new HttpHeaders().set('Authorization', `Bearer ${sessionStorage.getItem('token')}`)});
}
deleteproduct(Id:number){
  return this.http.get(this.url + "category/deleteProduct?Id="+Id)
}


}
