import { Component, OnInit } from '@angular/core';
import { CheckService } from "./check.service";
import { TrackService } from '../track/track.service'
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
 display = 'none';
 display1='none'
  Users: any;
  sessions: any;
  date:any
  constructor(private service:CheckService,
    public trackService:TrackService,
    public datepipe:DatePipe) { }
data:any
Result:any
Action:any
address:any[]
realData;
  ngOnInit() {
    this.service.getUserIds().subscribe(x=>{
      this.Users=x as []
          })
    debugger
    this.service.getCategories().subscribe(x=>{
      debugger
this.data=x as []
this.realData=this.data
    })
  }
  getValue(val:number){
    debugger
//    var abc= this.data.find(x=>x.Id==val)
//  this.Result=  abc.Result as []
//  this.Action=abc.Action  'STEP-3-Billing address'
this.service.getCategories1(val).subscribe((x:any)=>{
  debugger
  if(x.ActionName=="STEP-1-Get User Address" ||x.ActionName=="STEP-1-Add shipping Address"  ||
  x.ActionName=="Step-3-Add billing address"  || x.ActionName=="STEP-1-Get User billing address"){
  this.Result=JSON.parse(x.Res)
  this.Action=x.ActionName
  this.display='block'
  }
  if(x.ActionName=="STEP-3-Billing address"){
    //this.address.push(JSON.parse(x.Res ) )
    this.Result=x.Res
    this.Action=x.ActionName
    this.display='block'
  }
 else if(x.ActionName=="STEP-1-Check shipping charges"){
    this.Result=JSON.parse(x.Res)
    this.Action=x.ActionName
    this.display='block'
  }
else
  if(x.ActionName=="STEP-1-Time taken by shipping charges")
 {
  this.Result=x.Res
  this.Action=x.ActionName
  this.display='block'
 }else
 if(x.ActionName=="STEP-3 clicked on pay button")
 {
  this.Result=JSON.parse(x.Res)
  this.Action=x.ActionName
  this.display='block'
 }else
 if(x.ActionName=="STEP-3 clicked on Emi pay button")
 {
  this.Result=JSON.parse(x.Res)
  this.Action=x.ActionName
  this.display='block'
 }else
 if(x.ActionName=="STEP-1-Cart items")
 {
  this.Result=JSON.parse(x.Res)
  this.Action=x.ActionName
  this.display='block'
 }
 else if(x.ActionName=="STEP-1-Change Shipping Address"){
   debugger
  this.Result=JSON.parse(x.Res)
  this.Action=x.ActionName
  this.display='block'
 }
})
  }


  close(){
    this.display='none'
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
//   Filter2(event:any){
//     debugger
//     this.data=this.realData
// var value=+event.target.value
// var array=this.data.filter(x=>x.UserId==value)
// this.data=array
//   }
  Filter2(event:any,val){
    debugger
    var filter= new Date(val)
    var newDate=this.datepipe.transform(filter,'yyyy-MM-dd HH:mm:ss')
    //var filterData= this.data.filter(x=>new Date(x.ActionDateTime)==new Date(newDate))
this.trackService.getFilterAccordingDate(newDate,"/checkout-process/checkout").subscribe(x=>{
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
}

