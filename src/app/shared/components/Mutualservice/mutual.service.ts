import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonService } from '../../services/common.service';
@Injectable({
  providedIn: 'root'
})
export class MutualService {

  constructor(private http: HttpClient) { }
  private baseUrl=new CommonService().getUri();
  Invoke<T>(url:string, model:T ,method:string) {
    //
    if(method == "post")
    {
        return this.http.post<T>(this.baseUrl+url,model)
        .toPromise();
    }
    if(method == "get")
    {
        return this.http.get<T>(this.baseUrl+url)
        .toPromise();
    }
       
    }
}
