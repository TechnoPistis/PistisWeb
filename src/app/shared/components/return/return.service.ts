import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { CommonService } from '../../services/common.service';

@Injectable({
  providedIn: 'root'
})
export class ReturnService {

  constructor(private http:HttpClient,
    private router: Router) { }
    readonly url=new CommonService().getUri();

    saveData(model:any){
      return this.http.post(this.url+"return/save",model)
    }
}
