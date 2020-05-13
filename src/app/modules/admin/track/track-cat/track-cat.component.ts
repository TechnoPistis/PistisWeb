import { Component, OnInit } from '@angular/core';
import { CatService } from "./cat.service";
import { TrackService } from '../track.service';
import { DatePipe } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-track-cat',
  templateUrl: './track-cat.component.html',
  styleUrls: ['./track-cat.component.css']
})
export class TrackCatComponent implements OnInit {
  data: any;
  realData: any;
Users:any
date:any
  sessions: any;
  constructor(
    public service:CatService,
    private tracklog:TrackService,
    public datepipe:DatePipe,
    public toaster:ToastrService
  ) {
  debugger

   }

  ngOnInit() {
    debugger
    this.service.getUserIds().subscribe(x=>{
this.Users=x as []
    })
  debugger
  this.service.getCategories().subscribe(x=>{
    debugger
    this.data=x as []
    this.realData=this.data
  }
    )
  }
  Filter(event:any){
    debugger
   this.data=this.realData
var value=+event.target.value
var array;
if(value==3)
array=this.data.filter(x=>x.LogtypeId==1)
else if(value==2)
array=this.data.filter(x=>x.LogtypeId==2)
else if(value==1)
array=this.data.filter(x=>x.LogtypeId==3)

this.data=array


  }
  Filter2(event:any,val){
    debugger
    var filter= new Date(val)
    var newDate=this.datepipe.transform(filter,'yyyy-MM-dd HH:mm:ss')
    //var filterData= this.data.filter(x=>new Date(x.ActionDateTime)==new Date(newDate))
this.tracklog.getFilterAccordingDate(newDate,"productcatalogue").subscribe((x:any)=>{
  debugger
  if(x.length==0)
  this.toaster.info("No data on selected date")
else
    this.sessions=x as []
});

    this.data=this.realData
var value=+event.target.value
var array=this.data.filter(x=>x.UserId==value)
this.data=array
  }
  Filter3(event:any){
    debugger
    this.data=this.realData
    var value=event.target.value
    var array=this.data.filter(x=>x.Guid==value)
    this.data=array
  }
  getValue(val:number){
    debugger
    this.data=this.realData

   // var array=this.data.filter(x=>x.Id==val)
   // this.data=array
  }

}
