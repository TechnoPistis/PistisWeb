import { Component, OnInit } from '@angular/core';
import * as Highcharts from "highcharts";
import { TabComponent } from "@syncfusion/ej2-angular-navigations";

import { yearsPerPage } from "@angular/material";
import { toArray } from "rxjs/operators";
import { DashboardService } from '../../dashboard/dashboard.service';
import { TrackService } from '../track.service'
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-product-track',
  templateUrl: './product-track.component.html',
  styleUrls: ['./product-track.component.css']
})
export class ProductTrackComponent implements OnInit {
  public headerText:object[]=[];
  sessions: any;
  Users: any;
 date:any
 pageName:string
 firstGraph:boolean
 SeconedGraph:boolean=true
 ActionData:any
thridGraph:boolean=false
  realData: any;
  data: any;
  constructor(public service: DashboardService,
    public tracklog:TrackService,
    private datepipe:DatePipe) {

  }
ngOnInit(){
this.getGraphs()
}
Dashboard(val){
  var filter= new Date(val)
  var newDate=this.datepipe.transform(filter,'yyyy-MM-dd HH:mm:ss')
  this.tracklog.getPageDateFilter2(newDate).subscribe(x=>{
    debugger
   // if (x != null) localStorage.setItem('failedTransactions', JSON.stringify(x))
  //  Highcharts.chart("transactionStatus", JSON.parse(localStorage.getItem('failedTransactions')))

    if (x != null) Highcharts.chart("bestSellers", x);

    debugger
  });
}
getGraphs(){
  debugger
  this.tracklog.getPageDateFilter1().subscribe(x=>{
    debugger
   // if (x != null) localStorage.setItem('failedTransactions', JSON.stringify(x))
  //  Highcharts.chart("transactionStatus", JSON.parse(localStorage.getItem('failedTransactions')))

    if (x != null) Highcharts.chart("bestSellers", x);

    debugger
  });
}

}
