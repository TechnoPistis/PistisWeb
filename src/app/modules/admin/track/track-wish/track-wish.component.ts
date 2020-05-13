import { Component, OnInit } from '@angular/core';
import { TrackService } from "../track.service";
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-track-wish',
  templateUrl: './track-wish.component.html',
  styleUrls: ['./track-wish.component.css']
})
export class TrackWishComponent implements OnInit {
  data: any;
  realData: any;
  date:any
Users:any
  sessions: any;
  constructor(
    public service:TrackService,
    private datepipe:DatePipe
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
this.service.getFilterAccordingDate(newDate,"wishlist").subscribe(x=>{
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
    
   // var array=this.data.filter(x=>x.Id==val)
   // this.data=array
  }

}
