import { Injectable } from '@angular/core';
import { CommonService } from '../../services/common.service';
import { HttpClient } from '@angular/common/http';
import { LoginCheckout } from './checkoutmodel';

@Injectable({
  providedIn: 'root'
})
export class CheckoutserviceService {

  data = new CommonService();
  private url = this.data.getUri();

  constructor(
    private http: HttpClient
  ) { }

  getUserAddress(id: number, IpAddress: any) {
    return this.http.get(this.url + 'checkout/getAdressByUser?id=' + id + "&IpAddress=" + IpAddress)
  }
  changeDefaultAddress(id: number) {
    return this.http.get(this.url + 'checkout/changeDefaultAddress?id=' + id)
  }
  addCheckout(model: LoginCheckout) {
    return this.http.post(this.url + 'checkout/loginCheckout', model);
  }
  registerUser(model) {
    return this.http.post(this.url + "user/registerCustomer", model)
  }
  sendPaymentDetails(data: any) {
    return this.http.post(this.url + "PaymentTransaction/saveTransaction2", data)
  }
  SendDetailsToUsers(model:LoginCheckout){
    return this.http.post(this.url + 'checkout/SendDetailsToUsers', model);
    
    }
    SendDetailsTopranjal(model:LoginCheckout){
      return this.http.post(this.url + 'checkout/sendDetailsTopranjal', model);
      
      }
    SendDetailsToVendor(model:LoginCheckout){
    return this.http.post(this.url + 'checkout/SendDetailsToVendor', model);
    
    }
  checkemail(email) {
    return this.http.get(this.url + 'checkout/checkemail?email=' + email)
  }

  setAsBillAddress(ShipAddressId){
    return this.http.get(this.url + 'shipping/setAsBillAddress?id=' + ShipAddressId)
  }
  getpromoCart(){
      
    let UserId=+localStorage.getItem('UserId')
    if(!UserId){
      UserId=0;
    }
   let ip= window.localStorage.getItem("IpAddress");
    return this.http.get(this.url + 'cart/getCartByCustomerpromo?CustomerId=' + UserId+'&ip='+ip)

  }
  getusedCupon(){
      
    let UserId=+localStorage.getItem('UserId')
    if(!UserId){
      UserId=0;
    }
 
    return this.http.get(this.url + 'Spinner/getUserCupon?Id=' + UserId)
  }
  removeusedCupon(){
      
    let UserId=+localStorage.getItem('UserId')
    if(!UserId){
      UserId=0;
    }
 
    return this.http.get(this.url + 'Spinner/removeUserCupon?Id=' + UserId)
  }
  checkUserData(cartid){
      
    let UserId=+localStorage.getItem('UserId')
    if(!UserId){
      UserId=0;
    }

    return this.http.get(this.url + 'Spinner/CheckUserDatacheckout?UserId=' + UserId+"&CartId="+cartid)
  }
  checkTheSalt(pass:string){
    let UserId=localStorage.getItem('UserId')
    return this.http.get(this.url+'user/checkOtp?UserId='+UserId+'&password='+pass)
  }

  sendNewSalt(pass:string){
    let UserId=localStorage.getItem('UserId')
    return this.http.get(this.url+'user/saveSalt?UserId='+UserId+'&password='+pass)
  }
  checkemail1(email) {
    return this.http.get(this.url + 'checkout/checkemail1?email=' + email)
  }
}




