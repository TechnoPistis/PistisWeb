import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CommonService } from "../../../shared/services/common.service";
@Injectable({
  providedIn: 'root'
})
export class UseractivityService {
  formData: any;
  list: [];
  data = new CommonService();
  private url = this.data.getUri();
  constructor(private http: HttpClient) { }

  refreshList(page, size, name) {
    return this.http.get(this.url + 'UserLog/last20MinUsers?page=' + page + '&pageSize=' + size + '&search=' + name);
  }
  refreshList1(page, size, name) {
    return this.http.get(this.url + 'UserLog/getAllUsers?page=' + page + '&pageSize=' + size + '&search=' + name);
  }
}
