import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CommonService } from "../../../shared/services/common.service";
import { JsonPipe } from '@angular/common';
import { shippingModel } from './shippingModel';
@Injectable({
    providedIn: 'root'
})
export class shippingervice {
    formData: shippingModel;
    data = new CommonService();
    private url = this.data.getUri();

    constructor(
        private http: HttpClient
    ) { }

    getUserAddress(id: number, IpAddress: any) {
        
        return this.http.get(this.url + 'shipping/getAdressByUser?id=' + id + "&IpAddress=" + IpAddress, {headers: new HttpHeaders().set('Authorization', `Bearer ${sessionStorage.getItem('token')}`)});
    }

    addShipAddress(model: shippingModel) {
        return this.http.post(this.url + 'shipping/addUserAddress', model)
    }
    addShipAddressGuest(model: shippingModel) {
        return this.http.post(this.url + 'shipping/addUserAddressGuest', model)
    }
    
    addShipAddress1(model: shippingModel) {
        return this.http.post(this.url + 'shipping/addUserAddress1', model)
    }

    getById(id: number) {
        return this.http.get(this.url + 'shipping/getById?id=' + id);
    }

    updateShipAddress(model: shippingModel) {
        return this.http.post(this.url + 'shipping/updateUserAddress', model);
    }

    deleteShipAddress(id: number) {
        return this.http.get(this.url + 'shipping/delete?Id=' + id);
    }

    getCountry() {
        return this.http.get(this.url + 'country/getAll')
    }

    getState(id: number) {
        return this.http.get(this.url + 'country/getStateByCountry?id=' + id)
    }

    //-----------------billing address

    getUserBillAddress(id: number, IpAddress: any) {
        return this.http.get(this.url + 'shipping/getBillAdressByUser?id=' + id + "&IpAddress=" + IpAddress)
    }

    addBillAddress(model: any) {
        return this.http.post(this.url + 'shipping/addUsersBillAddress', model)
    }
}
