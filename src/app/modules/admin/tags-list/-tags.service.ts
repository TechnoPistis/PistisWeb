import { Injectable } from '@angular/core';
import { CommonService } from 'src/app/shared/services/common.service';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class TagsService {


  data = new CommonService();

  private url = this.data.getUri();
  products: any;
  Countries: any;
  constructor(private http: HttpClient) {
  }
  refreshList(page,size,name) {
    return this.http.get(this.url + 'tag/getTags?page=' + page + '&pageSize=' + size + '&search=' + name);
  }
  deactivateCustomer(id: number) {
    return this.http.get(this.url + 'tag/deactivateTag?Id=' + id);
  }
  deleteCustomer(id: number) {
    return this.http.get(this.url + 'tag/deleteTag?Id=' + id);
  }
  getProd(val: any) {
    return this.http.get(this.url + 'tag/getProduct?Id=' + val);
  }
}
