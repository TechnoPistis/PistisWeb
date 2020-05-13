import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonService } from '../../services/common.service';

@Injectable({
  providedIn: 'root'
})
export class TestimonialService {

  constructor(
    private _http: HttpClient
  ) { }

  readonly baseuri = new CommonService().getUri();

  GetAll() {
    return this._http.get(this.baseuri + 'testimonial/get-all');
  }

  GetAllApproved() {
    return this._http.get(this.baseuri + 'testimonial/get-all/approved');
  }
getUserTestimonial(){
 var userId=+ localStorage.getItem('UserId');
 if(!userId){
   userId=0;
 }
 return this._http.get(this.baseuri+'testimonial/getUserTestimonial?Id='+userId)
}
  Add(model: any) {
      
    return this._http.post(this.baseuri + 'testimonial/save', model);
  }

  Update(id: number, approved: boolean) {
    return this._http.post(this.baseuri + 'testimonial/update?id=' + id + '&IsApproved=' + approved, null);
  }

  Delete(id: number) {
    return this._http.post(this.baseuri + 'testimonial/delete?id=' + id, null);
  }
  search(val:string){
 return this._http.get(this.baseuri+'testimonial/Searchval?val='+val)

  }
}
