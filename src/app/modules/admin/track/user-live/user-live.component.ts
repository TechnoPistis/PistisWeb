import { Component, OnInit } from '@angular/core';
import { TrackService } from "../track.service";
import { debug } from 'util';
@Component({
  selector: 'app-user-live',
  templateUrl: './user-live.component.html',
  styleUrls: ['./user-live.component.css']
})
export class UserLiveComponent implements OnInit {
visitedPage:any
val:string
visistedProduct:any
subs:any
  constructor(
private service:TrackService
  ) { }

  ngOnInit() {
this.getmostVistedpage("Y")
this.getmostVisitedProduct("Y")
this.getSubNreg("Y")
  }
  getmostVistedpage(val:string){
    this.service.getmostVistedpage(val).subscribe(x=>{
this.visitedPage=x as []
    })
  }
  getmostVisitedProduct(val:string){
    this.service.getmostVisitedProduct(val).subscribe(x=>{
      this.visistedProduct=x as []
    })
  }
  getSubNreg(val:string){
    debugger
    this.service.getSubNreg(val).subscribe(x=>{

      this.subs=x
    })
  }
  getValVisitedPro(val:string){
    debugger
this.val
this.getmostVisitedProduct(val)
  }

  getValVisitedPage(val:string){
    debugger
this.val
this.getmostVistedpage(val)
  }
  getSubcut(val:string){
    debugger
this.val
this.getSubNreg(val)
  }
  getUnSub(val:string){
    debugger
this.val
this.getSubNreg(val)
  }

}
