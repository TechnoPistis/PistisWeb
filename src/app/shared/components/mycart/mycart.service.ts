import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonService } from '../../services/common.service';

@Injectable({
  providedIn: 'root'
})
export class MycartService {
  readonly baseuri=new CommonService().getUri();
  constructor(private http:HttpClient) { }

  addToCart(pro){
     
    return this.http.post<Boolean>(this.baseuri+'cart/addToCart',pro);
  }
  getCart(id,ipAddress){
     
    if(isNaN(id)){
      id=0
    }
    return this.http.get(this.baseuri+'cart/getCartByCustomer?CustomerId='+id+"&ip="+ipAddress);
  }
  removeItem(id)
  {
    return this.http.get(this.baseuri+'cart/removeItem?id='+id);

  }
  updateQuantity(quantity,id)
  {
    return this.http.get(this.baseuri+'cart/updateQuantity?quantity='+quantity+"&Id="+id);

  }
  getProductDetails1( variantId: number) {
    let UserId= localStorage.getItem('UserId')==null?0: localStorage.getItem('UserId');
     let IpAddress=localStorage.getItem('IpAddress')

    return this.http.get(this.baseuri + "category/AddWishListProduct?variantId=" + variantId +"&UserId=" + UserId +"&IpAddress=" + IpAddress)
  }
  updateuser(userid,ipaddress)
  {
    let Ipaddress=localStorage.getItem('IpAddress')
    return this.http.get(this.baseuri+'cart/updateUser?userid='+userid+"&ipaddress="+Ipaddress);

  }
  CheckUserData(Id:number){
    
    return this.http.get(this.baseuri+'Spinner/CheckUserData?UserId='+Id)

}
saveSpinnerData(model:any){
  return this.http.post(this.baseuri+"Spinner/SaveSpinUserData",model)
}
placeOrderChecking(Id:number){
  return this.http.get(this.baseuri+'cart/placeOrderChecking?id='+Id);
}
}
