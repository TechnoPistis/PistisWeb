import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../dashboard.service';
import * as Highcharts from 'highcharts';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  year: number = new Date().getFullYear();
  period: number = 0;
  lifeTimeSales: any;
  averageOrder: any;
  averageRating:any;
  orders: any[] = [];
  balance: any;
  lang:any;
  isSpanish: boolean=false;
  constructor(public service: DashboardService) {}

  ngOnInit() {
    this.getSales(this.year, this.period);
    this.getLifeTimeSales();
    this.getBalance();
    this.averageOrders();
    this.averageRatings();
    this.lowStock6Products();
    this.latest5Orders()
    this.getlang();
  }
  getlang() {
    
    if(this.lang=="english")
    {
      this.isSpanish=false;
       this.headerText = [
        { text: "Total Sales" },
        { text: "Low Stock" }
      ];
    }
    else{
      this.isSpanish=true;

      this.headerText = [
        { text: "Ventas Totales" },
        { text: "Stock bajo" }
      ];
    }
  }
  //Sales
  Reload() {
    window.location.reload();
  }
  getBalance(){
    this.service.getBalance().subscribe(sales => {
      this.balance = sales;
    });
  }
  getSales(year, period) {
      
    if (period == 1 || period == 2) {
      year = 2019;
    }
    this.service.getSales(year, period).subscribe(data => {
       
      Highcharts.chart("container", data);
    });
  }
  lowStock6Products(){
    this.service.lowStock6Products().subscribe(data => {
       
      Highcharts.chart("lowStock", data);
    });
  }

  // getBestSellers() {
  //   this.service.getBestSellers().subscribe(data => {
  //     if (data != null) Highcharts.chart("bestSellers", data);
  //   });
  // }

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
  averageRatings(){
    this.service.averageRatings().subscribe(sales => {
      this.averageRating = sales;
    });
  }
  //latest5Orders
  latest5Orders() {
    this.service.latest5Orders().subscribe(orders => {
      this.orders = orders as [];
    });
  }
  public headerText: Object = [
    { text: "Total Sales" },
    {text:"Low Stock"}
  ];
}
