import { Component, OnInit } from '@angular/core';
import { TrackService } from '../track.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-track-footer',
  templateUrl: './track-footer.component.html',
  styleUrls: ['./track-footer.component.css']
})
export class TrackFooterComponent implements OnInit {

 
  Result:any
  Action:any
  address:any[]
  display = 'none';
  display1='none'
  data: any;
  realData: any;
Users:any
date:any
  sessions: any;
  constructor(
    public service:TrackService,
    public datepipe:DatePipe
  ) {
  debugger

   }

  ngOnInit() {
    debugger
    this.service.getUserIds().subscribe(x=>{
this.Users=x as []
    })
  debugger
  this.service.getCategories4().subscribe(x=>{
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
this.service.getFilterAccordingDate(newDate,"footer").subscribe(x=>{
  debugger
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
    
   var array=this.data.filter(x=>x.Id==val)
   this.Result=JSON.parse(array[0].Res)
    this.Action=array.ActionName
    this.display='block'
   this.data=array
  }



}
