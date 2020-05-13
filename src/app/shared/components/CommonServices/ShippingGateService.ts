import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonService } from '../../services/common.service';

@Injectable({
    providedIn: 'root'
})

export class ShippingGatewayService {
    readonly uri = new CommonService().getUri();
    constructor(private http: HttpClient) { }

    CalculateCharges(model: any) {
        if (!model.quantity)
            model.quantity = 1;
        return this.http.get<any>(this.uri
            + 'shippingGateway/GetQuotesCapabilities?countryCode='
            + model.CountryCode + '&postalCode=' + model.Postalcode
            + '&productId=' + model.productId + '&variantId=' + model.variantId + '&quantity=' + model.quantity + '&city=' + model.city
        );
    }

}
