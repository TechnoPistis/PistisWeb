import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Category } from "./category";
import { CommonService } from "../../../shared/services/common.service";
@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  formData: Category;
  list: Category[];
  data = new CommonService();
  private url = this.data.getUri();
  products: any;
  Countries: any;
  headers = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };
  constructor(private http: HttpClient) { }
  refreshList() {
    return this.http.get(this.url + 'category/getCategory')
      .toPromise()
  }

  postCategory(formData: Category) {
    return this.http.post(this.url + 'category/UploadFile', formData)
  }
  deleteCategory(id: number) {
    return this.http.delete(this.url + 'category/delete?id=' + id);
  }
  getProduct(id: number) {
    this.refreshList()
    return this.list.find(e => e.Id == id);
  }
  updateCategory(formData: Category) {

    return this.http.post(this.url + 'category/uploadFile', formData)
  }
  getproducts() {

    return this.http.get(this.url + 'category/getProducts');
  }
  getSubCat(id: number) {
    return this.http.get(this.url + "category/getSubCat?id=" + id, { responseType: 'text' })
  }
  getCategoryHierarchy(id: number) {
    return this.http.get(this.url + "category/getHierarchy?id=" + id, { responseType: 'text' })

  }
  getCategoryName(id: number) {

    //return this.http.get(this.url+"category/getParentCategory?id="+id)

    return this.http.get(this.url + "category/getCategoryName?id=" + id, { responseType: 'text' })
  }
};


