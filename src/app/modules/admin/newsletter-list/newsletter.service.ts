import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Newsletter } from "./newsletter";
import { CommonService } from "../../../shared/services/common.service";
@Injectable({
  providedIn: 'root'
})
export class NewsletterService {
  formData: Newsletter;
  list: Newsletter[];
  data = new CommonService();
  private url = this.data.getUri();

  constructor(private http: HttpClient) {
  }

  refreshList(page, size, name) {
    
    return this.http.get(this.url + 'NewsLetter/newsLetterList?page=' + page + '&pageSize=' + size + '&search=' + name);
  }
  deletenewsLetter(id: number) {
    return this.http.get(this.url + 'NewsLetter/deleteNewsletter?Id=' + id);
  }

  getCustomers() {

    return this.http.get(this.url + 'NewsLetter/getCustomers').toPromise().then();
  }
  onSubscribe(Id: number) {
    return this.http.get(this.url + "NewsLetter/subscribeUser?Id=" + Id);
  }
}
