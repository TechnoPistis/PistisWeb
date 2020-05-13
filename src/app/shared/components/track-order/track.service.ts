import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonService } from '../../services/common.service';

@Injectable({
    providedIn: 'root'
})
export class TrackService {
    readonly baseuri = new CommonService().getUri();
    constructor(private http: HttpClient) { }
    track(id:number) {
         
        let UserId=+localStorage.getItem('UserId')
        if(!UserId){
          UserId=0;
        }
        return this.http.get(this.baseuri + 'shippingGateway/TrackOrder?orderId=' + id+'&UserId='+UserId);
    }
    getbytrackno(no){
        return this.http.get(this.baseuri + 'shippingGateway/getByTrackNo?no=' + no);
    }

}
