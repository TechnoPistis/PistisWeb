import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonService } from 'src/app/shared/services/common.service';

@Injectable({
  providedIn: 'root'
})
export class ReturnListService {

  constructor(
    private _http: HttpClient,
  ) { }

  private data = new CommonService().getUri();

  getReturnData(page, size) {
    return this._http.get(this.data + 'return/getAll?page=' + page + '&pageSize=' + size);
  }
  refund(amount, id) {
    return this._http.get(this.data + 'return/refund?amount=' + amount + "&id=" + id);
  }
}
