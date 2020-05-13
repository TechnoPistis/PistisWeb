import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonService } from '../../services/common.service';

@Injectable({
  providedIn: 'root'
})
export class TestiService {
  data=new CommonService();
  private url=this.data.getUri();
  constructor(private http:HttpClient) { }
  getTestimonials(){
    return this.http.get(this.url+"testimonial/get-all")
  }
}
