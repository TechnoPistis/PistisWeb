import { Injectable } from '@angular/core';
import { CommonService } from "../../services/common.service";
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class DealsService {
  private commonUrl=new CommonService().getUri();
  constructor(private http:HttpClient) { }

  getDealLists(Id:number){
    
    return this.http.get(this.commonUrl+'homeCategory/getParticularDealProducts?Id='+Id)

}
// getDealList(){
    
//   return this.http.get(this.commonUrl+'homeCategory/getAllDealProducts');

// }
}
