import { Component, OnInit } from '@angular/core';
import { ServiceService } from "./service.service";
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';
import { Service } from "./service";
@Component({
  selector: 'app-sub-category',
  templateUrl: './sub-category.component.html',
  styleUrls: ['./sub-category.component.css']
})
export class SubCategoryComponent implements OnInit {
datalist:Service[]
list:Service[]
SpanishMenu:Service[]
filter:any

  constructor(public service:ServiceService,private toastr: ToastrService, private Router: Router, private route: ActivatedRoute) { }

  

  ngOnInit() {
    this.resetForm()
    this.service.getMenulist().then(x=>
      {this.datalist=x as Service[]
    // 
   
    console.log(this.datalist)
    }

    )
    console.log(this.filter)
    //this.getspanishMenu()
  }
  getspanishMenu(){
    this.service.getSpanishMenulist().subscribe(x=>{
this.SpanishMenu=x as Service[]
    })
  }
  IsAdult:boolean=false
handleSelected(event:any){
  debugger
  //var val =event.target.value
if(this.IsAdult){
  this.IsAdult=false
}else{
  this.IsAdult=true
}
}
  //reset
  resetForm(form?: NgForm) {
    if (form != null)
      form.resetForm();
      this.service.formData={
        Id:0,
   Name:"",
   subId:0,
 SpanishName:""
,IsAdult:false
      }
  }
  // onChange(subId:number){
  //   alert(subId)
  // }
insertRecord(form: NgForm) {
  form.value.IsAdult=this.IsAdult
  this.service.saveCategory(form.value).subscribe(res => {

    this.toastr.success('Inserted successfully');

   this.Router.navigate(['/admin/MenuList']);
  });
}
onSubmit(form: NgForm) {
    this.insertRecord(form);
}

}
