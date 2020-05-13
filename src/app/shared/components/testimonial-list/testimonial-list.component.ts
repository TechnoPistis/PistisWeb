import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { TestiService } from "./testi.service";
import {MatDialog} from '@angular/material/dialog';
import { TestiDescriptionComponent } from '../testi-description/testi-description.component';
@Component({
  selector: 'app-testimonial-list',
  templateUrl: './testimonial-list.component.html',
  styleUrls: ['./testimonial-list.component.css']
})
export class TestimonialListComponent implements OnInit {
star1:number;
  data: any;
  @Output() postData = new EventEmitter();
  constructor(private service:TestiService,private dialog:MatDialog) { }

  ngOnInit() {
this.service.getTestimonials().subscribe(x=>{
  this.data=x as []
  console.log(this.data)
})
  }
  // openDialog(val:any) {
  //   alert(val)
  //   const dialogRef = this.dialog.open(TestiDescriptionComponent);

  //   dialogRef.afterClosed().subscribe(result => {
  //     console.log(`Dialog result: ${result}`);
  //   });
  // }
}



