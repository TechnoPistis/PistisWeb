import { Component, OnInit } from '@angular/core';

import { TrackService } from "../track/track.service";
import { DatePipe } from '@angular/common';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-track-product-detail',
  templateUrl: './track-product-detail.component.html',
  styleUrls: ['./track-product-detail.component.css']
})
export class TrackProductDetailComponent implements OnInit {

  data: any;
  realData: any;
Users:any
  sessions: any;
  date:any
  constructor(
    public service:TrackService,
    public datepipe:DatePipe,
    public toaster:ToastrService

  ) { }

  ngOnInit() {
    debugger
    this.service.getUserIds().subscribe(x=>{
this.Users=x as []
    })
  this.service.getCategories6().subscribe(x=>{
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
this.service.getFilterAccordingDate(newDate,"product-details").subscribe((x:any)=>{
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

}
