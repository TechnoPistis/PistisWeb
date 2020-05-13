import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CommonService } from "../../../shared/services/common.service";
import { JsonPipe } from '@angular/common';
@Injectable({
    providedIn: 'root'
})
export class DealsService {
    data = new CommonService();
    private url = this.data.getUri();

    constructor(
        private http: HttpClient
    ) { }
// getParentName(Id){
//     ret
// }
    getAlldeal() {
        return this.http.get(this.url + 'deal/getAll1')
    }

    deleteDeal(id: number) {
        return this.http.delete(this.url + 'deal/delete?Id=' + id);
    }

    getDealById(id: number) {
        return this.http.get(this.url + 'deal/getById?Id=' + id);
    }

        addDeal(model: any) {
        return this.http.post(this.url + 'deal/addDeal', model);
    }

    updateDeal(model: any) {
        return this.http.post(this.url + 'deal/updateDeal', model);
    }

    
  GetProductVariantDetails(id: number,dealId) {
    return this.http.get(this.url + 'products/Product-variant-detail?Id=' + id+"&dealId="+dealId);
  }
  GetProductVariantDetails1(id: number) {
    return this.http.get(this.url + 'products/Product-variant-details?Id=' + id);
  }

}
