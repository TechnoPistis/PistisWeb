import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CommonService } from "../../../shared/services/common.service";
import { Variant, VariantOption } from '../products/product.model';
import { JsonPipe } from '@angular/common';
@Injectable({
    providedIn: 'root'
})
export class VariantService {
    formData: Variant;
    list: VariantOption[];
    data = new CommonService();
    private url = this.data.getUri();

    constructor(
        private http: HttpClient
    ) { }

    getAllVariants(page, size, name, catId) {
        if (!catId)
            catId = 0;
        return this.http.get(this.url + 'variants/getAll?page=' + page + '&pageSize=' + size + '&search=' + name + '&categoryId=' + catId);
    }

    getVariantsByCategory(id: number) {
        return this.http.get(this.url + 'variants/getVariantByCategory?Id=' + id)
    }

    deleteVariant(id: number) {
        return this.http.delete(this.url + 'variants/delete?Id=' + id);
    }

    getVariantById(id: number) {
        return this.http.get(this.url + 'variants/getById?Id=' + id);
    }


    checkMainSelected(id) {
        return this.http.get(this.url + 'variants/checkMainSelected?Id=' + id);
    }

    checkExistingName(name, catId, variantId) {
        return this.http.get(this.url + 'variants/checkExistingName?name=' + name + "&catId=" + catId + "&variantId=" + variantId);
    }

    addVariant(model: any) {
        return this.http.post(this.url + 'variants/addVariant', model);
    }

    updateVariant(model: any) {
        return this.http.post(this.url + 'variants/updateVariant', model);
    }
}
