import { Injectable } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Slider } from "./slider";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CommonService } from "../../../shared/services/common.service";
@Injectable({
  providedIn: 'root'
})
export class SliderService {
  formData: Slider;
  list: Slider[];
  data = new CommonService();
  private url = this.data.getUri();
  
  constructor(private http: HttpClient) { }

  refreshList() {
    return this.http.get(this.url + 'sliders/getsliderImages')
      .toPromise().then(res => this.list = res as Slider[]);
  }

  refreshList1() {
    return this.http.get(this.url + 'sliders/getsliderImagesForBackend').toPromise().then(res =>
      this.list = res as Slider[]);;
  }

  getProduct(id: number) {
    this.refreshList1();
    return this.list.find(e => e.Id == id);
  }

  postCategory(formData: Slider) {
      
    return this.http.post(this.url + 'sliders/addSlider', formData)
  }
  updateCategory(formData: Slider) {

    return this.http.post(this.url + 'sliders/addSlider', formData)
  }
  deleteCategory(id: number) {
    return this.http.delete(this.url + 'sliders/delete?id=' + id);
  }
  //  updateCategory(formData : Slider,fileToUpload: File){
  //   window.alert("update");
  //   const model:FormData =new FormData();
  //   model.append('Image', fileToUpload, fileToUpload.name);
  //   model.append('Id',formData.Id.toString());
  //   model.append('FromDateTime',formData.FromDateTime.toDateString());
  // model.append('ToDateTime',formData.ToDateTime.toDateString());
  //  return this.http.post(this.url+'UploadFile',model)
  //  }
  getproducts() {

    return this.http.get(this.url + 'sliders/getsliderImages').toPromise().then();

  }
}
