import { Component, OnInit } from '@angular/core';
import * as Highcharts from "highcharts";
import { TabComponent } from "@syncfusion/ej2-angular-navigations";

import { yearsPerPage } from "@angular/material";
import { toArray } from "rxjs/operators";
import { DashboardService } from '../../dashboard/dashboard.service';
import { TrackService } from '../track.service'
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-track-dhashboard',
  templateUrl: './track-dhashboard.component.html',
  styleUrls: ['./track-dhashboard.component.css']
})
export class TrackDhashboardComponent implements OnInit {
  public headerText:object[]=[];
  sessions: any;
  Users: any;
 date:any
 pageName:string
 firstGraph:boolean
 SeconedGraph:boolean
 ActionData:any
thridGraph:boolean=false
  realData: any;
  data: any;
  constructor(public service: DashboardService,
    public tracklog:TrackService,
    private datepipe:DatePipe) {

  }

  ngOnInit() {
    this.firstGraph=true
    this.tracklog.getUserIds().subscribe(x=>{
      this.Users=x as []
          })
    this.getFailedTransactions()
    this.getlang()
   // this.getBestSellers()
   // this.setFailedTransactions();
  }
  Dashboard(){
    debugger
    window.location.reload()
    this.firstGraph=true
    this.SeconedGraph=false
    this.thridGraph=false
    //this.setFailedTransactions()
   // Highcharts.chart("transactionStatus",  JSON.parse(localStorage.getItem('failedTransactions')))
this.getFailedTransactions()
  }
  getlang(){

   //
      //this.isSpanish=false;
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
  getFailedTransactions() {
    this.tracklog.getFailedTransactions().subscribe(data => {
      debugger
      if (data != null) localStorage.setItem('failedTransactions', JSON.stringify(data))
    Highcharts.chart("transactionStatus",  JSON.parse(localStorage.getItem('failedTransactions')))
this.setFailedTransactions()
    });
  }

 // async
   setFailedTransactions() {
    Highcharts.chart("transactionStatus",  JSON.parse(localStorage.getItem('failedTransactions')))
   // await this.setSalesAndRefunds();
  }

  // async setSalesAndRefunds() {
  //   Highcharts.chart("salesAndRefund", await JSON.parse(localStorage.getItem('salesAndRefunds')))
  // }
  Filter2(event:any,val){
    debugger
    var filter= new Date(val)
    var newDate=this.datepipe.transform(filter,'yyyy-MM-dd HH:mm:ss')
    var value=+event.target.value
    // this.tracklog.getFilterAccordingDate(newDate,this.pageName).subscribe(x=>{
    //   debugger
    //     this.sessions=x as []
    // });
    //var filterData= this.data.filter(x=>new Date(x.ActionDateTime)==new Date(newDate))
    if(this.firstGraph==true){
this.tracklog.getFilterAccordingDateanduser(newDate,value).subscribe(x=>{
  if (x != null) localStorage.setItem('failedTransactions', JSON.stringify(x))
  Highcharts.chart("transactionStatus", JSON.parse(localStorage.getItem('failedTransactions')))


  debugger
});
    }else if(this.SeconedGraph==true){
      debugger
      this.tracklog.getPageDateFilter1().subscribe(x=>{
        debugger
       // if (x != null) localStorage.setItem('failedTransactions', JSON.stringify(x))
      //  Highcharts.chart("transactionStatus", JSON.parse(localStorage.getItem('failedTransactions')))

        if (x != null) Highcharts.chart("bestSellers", x);

        debugger
      });
    }else{
      debugger
    var value=+event.target.value
    this.tracklog.getThridFilter(this.pageName,this.actionName,newDate,value).subscribe(x=>{
      debugger
      this.ActionData=x as []
    this.realData=this.ActionData
    })
    }
}
Filter(event:any){
  debugger

var value=+event.target.value
if(this.firstGraph==true){
this.tracklog.getFilterAccordingRequest(value).subscribe(x=>{
  if (x != null) localStorage.setItem('failedTransactions', JSON.stringify(x))
  Highcharts.chart("transactionStatus", JSON.parse(localStorage.getItem('failedTransactions')))

})
  }else{
    debugger
    this.tracklog.getFilterAccordingRequestandpage(value,this.pageName).subscribe(x=>{

     // if (x != null) localStorage.setItem('failedTransactions', JSON.stringify(x))
      //Highcharts.chart("transactionStatus", JSON.parse(localStorage.getItem('failedTransactions')))
      if (x != null) localStorage.setItem('bestSellers', JSON.stringify(x))
      Highcharts.chart("bestSellers", JSON.parse(localStorage.getItem('bestSellers')))
      //if (x != null) Highcharts.chart("bestSellers", x);

    })

  }
}
  getBestSellers(pageName:string) {
    this.tracklog.getBestSellers(pageName).subscribe(data => {
      debugger
      if (data != null) Highcharts.chart("bestSellers", data);
    });
  }

onClick(event:any){
  debugger
  this.firstGraph=false
  this.SeconedGraph=true
  this.thridGraph=false
   this.pageName=event.point.name
this.getBestSellers(this.pageName)
}
actionName:string
onClick2(event:any){
  debugger
  this.firstGraph=false
  this.SeconedGraph=false
 this.actionName=event.point.name
  this.tracklog.getOneActionFilterData(this.pageName,this.actionName).subscribe(x=>
    {
this.thridGraph=true

      debugger
    this.ActionData=x as []
    this.realData=this.ActionData

    }
    )
}
Filter3(event:any){
  debugger
  this.data=this.realData
  var value=event.target.value
  var array=this.data.filter(x=>x.Guid==value)
  this.data=array
}
}
