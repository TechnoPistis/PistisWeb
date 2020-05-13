import { Component, OnInit } from '@angular/core';
import { spinnService } from "../spinn.service";
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {
  data: any;
  counts:any
  constructor(private service:spinnService,
    private toastr: ToastrService,
    private _router: Router) { 

  }

  ngOnInit() {
   this.refereshlist()
    this.getCounts()
  }
  refereshlist(){
      
    this.service.getSpinnerReport().subscribe(x=>{
      this.data=x as []
    })
  }
  getCounts(){
    this.service.getspinnerCounts().subscribe(x=>{
      this.counts=x
      console.log(x)
    })
  }
  onChangeEvent(ev){
      
    this.service.getSpinnerFilter(ev).subscribe(x=>{
      this.data=x as []
    })
  }
}
