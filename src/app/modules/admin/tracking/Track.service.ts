
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CommonService } from "../../../shared/services/common.service";
import { JsonPipe } from '@angular/common';
@Injectable({
    providedIn: 'root'
})
export class TrackingService {
    data = new CommonService();
    private url = this.data.getUri();

    constructor(
        private http: HttpClient
    ) { }

    getAllOrder(page,size,name) {
        return this.http.get(this.url + 'shippingGateway/getAllOrders?page=' + page + '&pageSize=' + size + '&search=' + name);
    }

    trackById(id: number) {
        return this.http.get(this.url + 'shippingGateway/trackById?Id=' + id);
    }

    getById(id: number) {
        return this.http.get(this.url + 'shippingGateway/getById?Id=' + id);
    }

    updateOrder(model: any) {
        return this.http.post(this.url + 'shippingGateway/updateOrder', model);
    }
}
