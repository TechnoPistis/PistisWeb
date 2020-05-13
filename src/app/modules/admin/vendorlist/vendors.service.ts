import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { CommonService } from "../../../shared/services/common.service";
import { Vendor } from '../vendoradd/vendor';
import { VendorEdit } from '../vendoredit/vendor';

@Injectable({
  providedIn: "root"
})
export class VendorsService {
  add:Vendor;
  edit:VendorEdit;
  formData:Vendor;
  list:Vendor[];
  List1:Vendor[];
  url = new CommonService().getUri();
  

  constructor(private http: HttpClient) {}

  refreshList(page, size, name) {
    return this.http.get(
      this.url +
        "Vendor/getVendors?page=" +
        page +
        "&pageSize=" +
        size +
        "&search=" +
        name
    );
  }

  getVendor(id : number){
    // this.refreshList()
     
     return this.http.post(this.url+'Vendor/getVendor?Id='+id,"")
    }

  deleteVendor(id: number) {
    return this.http.get(this.url + "Vendor/deleteVendor?Id=" + id);
  }

  ResetPassword(id : number){
    
    return this.http.get(this.url + 'Customer/forgotpassword1?Id='+id);
   }

  deactivateVendor(id: number) {
    return this.http.get(this.url + "Vendor/deactivateVendor?Id=" + id);
  }

  getState(){
    return this.http.get(this.url+'Customer/getState')
  }
  getGender(){
    return this.http.get(this.url+'Customer/getGender')
  }
  getCountry(){
    return this.http.get(this.url+'Customer/getCountry')
  }
  getLanguage(){
    return this.http.get(this.url+'Customer/getLanguage')
  }

  saveVendor(user : Vendor){  
     
    return this.http.post(this.url+'User/registerVendor',user)
   }

   updateVendor(user : Vendor){
     
    return this.http.post(this.url+'Vendor/updateVendor',user)
   }
   GetCascadingCountries(){  
    return this.http.get(this.url+'country/getAll');
    
    
  }
  GetStates(){
    return this.http.get(this.url+'state/getAll');
  }

}
