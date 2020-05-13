import { Component, OnInit } from "@angular/core";
import * as Highcharts from "highcharts";
import { TabComponent } from "@syncfusion/ej2-angular-navigations";
import { DashboardService } from "./dashboard.service";
import { yearsPerPage } from "@angular/material";
import { toArray } from "rxjs/operators";
@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.css"]
})
export class DashboardComponent implements OnInit {
 
  year: any = new Date().getFullYear();
  period: number = 0;
  lifeTimeSales: any;
  averageOrder: any;
  orders: any[] = [];
  Lastlist: any;
  Toplist: any;
  lang:any;
  isSpanish: boolean=false;
  constructor(public service: DashboardService) {}

  ngOnInit() {
      
    this.getSales(this.year, this.period);
    this.getBestSellers();
    this.getNewCustomers(this.year);
    this.getNumOfUsersToday();
    this.mostSearchedKeywords();
    this.mostSearchedProducts();
    this.getUserActivity();
    this.getTopCustomers();
    this.getNumberOfUsers();
    this.getFailedTransactions();
    this.getSalesAndRefunds();

    this.getLifeTimeSales();
    this.averageOrders();
    this.latest5Orders();
    this.topSearchedItems()
    this.lastSearchTerms()
    this.lang = localStorage.getItem("browseLang");
    this.getlang();
  
  }
  //Sales
  Reload() {
    window.location.reload();
  }

  getSales(year, period) {
    
    if (period == 1 || period == 2) {
      year =+ new Date().getFullYear();
    }
    this.service.getSales(year, period).subscribe(data => {
       
      Highcharts.chart("container", data);
    });
  }

  getNewCustomers(year) {
    this.service.getNewCustomers(year).subscribe(data => {
       
      Highcharts.chart("newCustomers", data);
    });
  }

  mostSearchedKeywords() {
    this.service.mostSearchedKeywords().subscribe(data => {
      if (data != null)
        localStorage.setItem("mostSearchedKeywords", JSON.stringify(data));
    });
  }

  async setMostSearchedKeywords() {
     Highcharts.chart(
      "topKeywords",
      await JSON.parse(localStorage.getItem("mostSearchedKeywords"))
    );
   await this.setmostSearchedProducts();
  }

  mostSearchedProducts() {
    this.service.mostSearchedProducts().subscribe(data => {
      if (data != null)
        localStorage.setItem("mostSearchedProducts", JSON.stringify(data));
    });
  }

async setmostSearchedProducts() {
       Highcharts.chart(
      "topProducts",
      await JSON.parse(localStorage.getItem("mostSearchedProducts"))
    );
  }

  getBestSellers() {
    this.service.getBestSellers().subscribe(data => {
      
      if (data != null) Highcharts.chart("bestSellers", data);
    });
  }
  getSalesAndRefunds() {
    this.service.getSalesAndRefunds().subscribe(data => {
       
      if (data != null)  localStorage.setItem('salesAndRefunds', JSON.stringify(data))
    });
  }

  async setSalesAndRefunds() {
    Highcharts.chart("salesAndRefund", await JSON.parse(localStorage.getItem('salesAndRefunds')))
  }

  getFailedTransactions() {
    this.service.getFailedTransactions().subscribe(data => {
      if (data != null) localStorage.setItem('failedTransactions', JSON.stringify(data))
    });  
  }

  async setFailedTransactions() {
    Highcharts.chart("transactionStatus", await JSON.parse(localStorage.getItem('failedTransactions')))
    await this.setSalesAndRefunds();
  }

  

  getNumberOfUsers() {
    this.service.getNumberOfUsers().subscribe(data => {
      if (data != null) localStorage.setItem('numberOfUsers', JSON.stringify(data))
    });
  }

  async setNumberOfUsers() {
  
    Highcharts.chart("numOfUsers", await JSON.parse(localStorage.getItem('numberOfUsers')))

  }

  getTopCustomers() {
    //this.getNumberOfUsers();
    this.service.getTopCustomers().subscribe(data => {
      if (data != null) localStorage.setItem('topCustomers', JSON.stringify(data))
    });
  }

  async setTopCustomers() {
  Highcharts.chart("topCustomers", await JSON.parse(localStorage.getItem('topCustomers')))
    await this.setNumberOfUsers();
  }

  getNumOfUsersToday() {
    this.service.getNumOfUsersToday().subscribe(data => {
      if (data != null) Highcharts.chart("numOfUsersToday", data);
    });
  }

  getUserActivity() {
    this.service.getUserActivity().subscribe(data => {
      if (data != null)
        localStorage.setItem("userActivity", JSON.stringify(data));
    });
  }

  setUserActivity() {
    Highcharts.chart(
      "userActivity",
      JSON.parse(localStorage.getItem("userActivity"))
    );
  }

 

  onOpenCalendar(container) {
    container.yearSelectHandler = (event: any): void => {
      container._store.dispatch(container._actions.select(event.date));
    };
    container.setViewMode("year");
  }
  //LifetimeSales
  getLifeTimeSales() {
    this.service.getLifeTimeSales().subscribe(sales => {
      this.lifeTimeSales = sales;
    });
  }
  //AverageOrders
  averageOrders() {
     
    this.service.averageOrders().subscribe(sales => {
      this.averageOrder = sales;
    });
  }
  //latest5Orders
  latest5Orders() {
    this.service.latest5Orders().subscribe(orders => {
      this.orders = orders as [];
    });
  }
  public headerText:object[]=[];
  getlang(){
    
    if(this.lang=="english")
    {
      this.isSpanish=false;
       this.headerText = [
        { text: "Total Sales" },
        { text: "Top Search Keywords" },
        { text: "Top Search Products" },
        { text: "BestSellers" },
        { text: "Sales/Refunds" },
        { text: "WhatsApp" },
        { text: "New Customers" },
        { text: "Transactions" },
        { text: "Top Customers" },
        { text: "Current Users" },
        { text: "Today Users" },
        { text: "User Activity" }
      ];
    }
    else{
      this.isSpanish=true;

      this.headerText = [
        { text: "Ventas Totales" },
        { text: "Palabras clave de búsqueda principales" },
        { text: "Mejores productos de búsqueda" },
        { text: "BestSellers" },
        { text: "Ventas / Reembolsos" },
        { text: "WhatsApp" },
        { text: "Nuevos Clientes" },
        { text: "Transacción" },
        { text: "Principales Clientes" },
        { text: "Usuarios Actuales" },
        { text: "Hoy Usuarias" },
        { text: "Actividad del Usuario" }
      ];
    }
  }
  
  topSearchedItems(){
    this.service.topSearchedItems().subscribe(x=>{
      this.Toplist=x as []
    })
  }
  lastSearchTerms(){
    this.service.lastSearchTerms().subscribe(x=>{
      this.Lastlist=x as []
    })
  }
}
