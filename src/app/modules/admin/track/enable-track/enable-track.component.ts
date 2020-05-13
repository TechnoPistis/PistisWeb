import { Component, OnInit } from '@angular/core';
import { TrackService } from "../track.service";
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-enable-track',
  templateUrl: './enable-track.component.html',
  styleUrls: ['./enable-track.component.css']
})
export class EnableTrackComponent implements OnInit {
checked:boolean
  constructor(private service:TrackService,
    private toaster:ToastrService
    ) { }

  ngOnInit() {
this.handleSelected1()
  }
  handleSelected(){
    debugger
    this.service.enable().subscribe(x=>{
      if(x==true){
        this.checked=true
      this.toaster.info("Service started")}
      else{
        this.checked=false
      this.toaster.info("Service stopped")
      }
    })
  }
  handleSelected1(){
    debugger
    this.service.enable().subscribe(x=>{
      if(x==true){
        this.checked=true
     // this.toaster.info("Service started")}
      }
      else{
        this.checked=false
    //  this.toaster.info("Service stopped")
      }
    })
  }
}
