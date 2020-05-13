import { Component, OnInit } from '@angular/core';
import { HomeService   } from "./home.service";
import { DatePipe } from '@angular/common';
import { TrackService } from '../track/track.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-trackhome',
  templateUrl: './trackhome.component.html',
  styleUrls: ['./trackhome.component.css']
})
export class TrackhomeComponent implements OnInit {
  data: any;
  realData: any;
  display = 'none';
 display1='none'
Users:any
Result:any
Action:any
address:any[]
today: any = new Date();
date:any
sessions:any
  constructor(
    public service:HomeService
    ,private datepipe:DatePipe,
    private traclog:TrackService,
    public toaster:ToastrService
  ) { }

  ngOnInit() {

    this.service.getUserIds().subscribe(x=>{
      debugger
this.Users=x as []
    })
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
this.traclog.getFilterAccordingDate(newDate,"home page").subscribe((x:any)=>{
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

   var array=this.data.filter(x=>x.Id==val)
   this.Result=JSON.parse(array[0].Res)
    this.Action=array.ActionName
    this.display='block'
   this.data=array
  }
  focusOutFunction(val){
    debugger
var date =this.date
  }
}
