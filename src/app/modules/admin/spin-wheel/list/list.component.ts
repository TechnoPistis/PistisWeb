import { Component, OnInit } from '@angular/core';
import {spinnService  } from "../spinn.service";
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  data: any;

  constructor(private spinnservice:spinnService,
    private toastr: ToastrService,
    private _router: Router,) { }

  ngOnInit() {
      
   this.refereshlist()
  }
  check(){
      
    if(this.data.length>10){
      this.toastr.info("Only 10 options can be added")
      return false
    }else{
      this._router.navigate(['/admin/SpinWheel/add']);

    }

  }
refereshlist(){
    
  this.spinnservice.getSpinnerOptions().subscribe(x=>{
    this.data=x as []
  })
}
  delete(id:any){
this.spinnservice.DeleteSpinnerOption(id).subscribe(x=>{
  if(x==1){
    this.toastr.success('Deleted successfully.')
    this.refereshlist()
  }
})
  }
  edit(id: any) {
    if (id) {
      this._router.navigate(['/admin/SpinWheel/add'], { queryParams: { Id: id } });
    }
  }

}
