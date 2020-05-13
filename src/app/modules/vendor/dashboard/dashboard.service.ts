import { Injectable } from '@angular/core';
import { CommonService } from 'src/app/shared/services/common.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  data = new CommonService();

  private url = this.data.getUri();
  products: any;
  Countries: any;
  constructor(private http: HttpClient) {}
  getSales(year, period) {
    if (year == 0) {
      year = new Date().getFullYear;
    }
    let id=+localStorage.getItem("UserId")
    return this.http.get(
      this.url + "vendorDashboard/getSales?year=" + year + "&period=" + period+"&VendorId="+id
    );
  }
  getLifeTimeSales() {
    let id=+localStorage.getItem("UserId")
    return this.http.get(this.url + "vendorDashboard/getLifeTimeSales?VendorId="+id);
  }
  getBalance(){
    let id=+localStorage.getItem("UserId")
    return this.http.get(this.url + "vendorDashboard/getBalance?VendorId="+id);
  }
  averageOrders() {
    let id=+localStorage.getItem("UserId")
    return this.http.get(this.url + "vendorDashboard/avgOrder?VendorId="+id);
  }
  averageRatings(){
    let id=+localStorage.getItem("UserId")
    return this.http.get(this.url + "vendorDashboard/avgRating?VendorId="+id);
  }
  latest5Orders() {
    let id=+localStorage.getItem("UserId")
    return this.http.get(this.url + "vendorDashboard/latest6Reviews?VendorId="+id);
  }  
  // getBestSellers() {
  //   return this.http.get(this.url + "vendorDashboard/MostSearchedProducts");
  // }
  lowStock6Products() {
    let id=+localStorage.getItem("UserId")
    return this.http.get(this.url + "vendorDashboard/lowStock6Products?VendorId="+id);
  }  

}
