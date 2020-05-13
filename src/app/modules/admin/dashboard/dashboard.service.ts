import { Injectable } from "@angular/core";
import { CommonService } from "src/app/shared/services/common.service";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root"
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
    return this.http.get(
      this.url + "dashboard/getSales?year=" + year + "&period=" + period
    );
  }

  getTopCustomers(){
    return this.http.get(this.url + "dashboard/getTopCustomers");
  }

  getNewCustomers(year) {
    return this.http.get(this.url + "dashboard/getNewCustomers?year=" + year);
  }

  getFailedTransactions(){
    return this.http.get(this.url + "dashboard/getFailedTransactions");
  }

  getLifeTimeSales() {
    return this.http.get(this.url + "dashboard/getLifeTimeSales");
  }
  averageOrders() {
    return this.http.get(this.url + "dashboard/avgOrder");
  }
  latest5Orders() {
    return this.http.get(this.url + "dashboard/latest5Orders");
  }

  mostSearchedKeywords() {
    return this.http.get(this.url + "Dashboard/MostSearchedKeywords");
  }

  mostSearchedProducts() {
    return this.http.get(this.url + "Dashboard/MostSearchedProducts");
  }

  getBestSellers() {
    return this.http.get(this.url + "Dashboard/getBestSellers");
  }

  getSalesAndRefunds() {
    return this.http.get(this.url + "Dashboard/getSalesAndRefund");
  }

  getNumberOfUsers(){
    return this.http.get(this.url + "Dashboard/numOfUsersNow")
  }

  getNumOfUsersToday(){
    return this.http.get(this.url + 'Dashboard/numOfUsersToday')
  }

  getUserActivity(){
    return this.http.get(this.url + 'Dashboard/getUserActivity')
  }
  lastSearchTerms(){
    return this.http.get(this.url + 'Dashboard/lastSearchTerms')
  }
  topSearchedItems(){
    return this.http.get(this.url + 'Dashboard/topSearchedItems')
  }

}
