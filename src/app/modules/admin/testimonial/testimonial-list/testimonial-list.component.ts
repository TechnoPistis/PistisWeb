import { Component, OnInit } from '@angular/core';
import { TestimonialService } from 'src/app/shared/components/testimonial/testimonial.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-testimonial-list',
  templateUrl: './testimonial-list.component.html',
  styleUrls: ['./testimonial-list.component.css']
})
export class TestimonialListComponent implements OnInit {

  constructor(
    private _service: TestimonialService,
    private tostr: ToastrService
  ) { }
search:string=""
  TestimonialList: any[] = [];
  ngOnInit() {
    this.GetTestimonialList()
  }

  GetTestimonialList() {
    this._service.GetAll().subscribe((response: any[]) => {
      this.TestimonialList = response;
    });
  }

  Approved(id: number, Approved) {
    this._service.Update(id, Approved).subscribe((Response: any) => {
        
      this.tostr.success("Approved");
      this.GetTestimonialList();
    });
  }
  clickSearch(){
if(this.search!=""){
  this._service.search(this.search).subscribe((response: any[])=>{
    this.TestimonialList = response;
  })
}
  }

}
