import { Component, OnInit } from '@angular/core';
import { TrackService } from '../track.service';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-live-traffic',
  templateUrl: './live-traffic.component.html',
  styleUrls: ['./live-traffic.component.css']
})
export class LiveTrafficComponent implements OnInit {
data:any
  realData: any;
  Users: any;
  date2:any
  date:any
  country:any
  constructor(
    public service:TrackService,
    private datepipe:DatePipe,
  ) {
    
   }

  ngOnInit() {
    debugger
    this.service.getCountry().subscribe(x=>{
      this.country=x as []
        })
    this.getdata()
   // this.getCountry()
  }
  getdata(){
    debugger
    this.service.getFilter().subscribe(x=>{
this.data=x as []
    })
  }
  Filter2(event:any,val){
    debugger
    var userId=event.target.value
    var filter= new Date(val)
    var newDate=this.datepipe.transform(filter,'yyyy-MM-dd HH:mm:ss')
    //var filterData= this.data.filter(x=>new Date(x.ActionDateTime)==new Date(newDate))
this.service.getLiveDataFilter(newDate,userId).subscribe(x=>{
  debugger
    this.data=x as []
});

}
getDates(date1,date2){
debugger
  var fisrtdate= new Date(date1)
  var seconedDate= new Date(date2)
  var newDate=this.datepipe.transform(fisrtdate,'yyyy-MM-dd HH:mm:ss')
  var seconedDate2=this.datepipe.transform(seconedDate,'yyyy-MM-dd HH:mm:ss')
  
  //var filterData= this.data.filter(x=>new Date(x.ActionDateTime)==new Date(newDate))
this.service.getLiveDataFilter(newDate,seconedDate2).subscribe(x=>{
debugger
  this.data=x as []
});

}
Filter3(event:any){
  debugger
  var country=event.target.value
 // this.data.find

  var array=this.data.filter(x=>x.Country==country)
  this.data=array
}
}