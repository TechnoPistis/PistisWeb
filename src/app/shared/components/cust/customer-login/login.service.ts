import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CommonService } from 'src/app/shared/services/common.service';
@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private commonUrl=new CommonService().getUri();
  constructor(private http:HttpClient) { }

  CheckUserData(Id:number){
    
    return this.http.get(this.commonUrl+'Spinner/CheckUserData?UserId='+Id)

}
saveSpinnerData(model:any){
  return this.http.post(this.commonUrl+"Spinner/SaveSpinUserData",model)
}
}
