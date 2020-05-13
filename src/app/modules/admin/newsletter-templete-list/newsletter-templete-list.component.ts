import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NewsListService } from "./news-list.service";
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { typeWithParameters } from '@angular/compiler/src/render3/util';
@Component({
  selector: 'app-newsletter-templete-list',
  templateUrl: './newsletter-templete-list.component.html',
  styleUrls: ['./newsletter-templete-list.component.css']
})
export class NewsletterTempleteListComponent implements OnInit {

  constructor(private service:NewsListService,private toastr: ToastrService, private Router: Router) { }
  dataList:any
  search:string=""
  ngOnInit() {
    this.refersehList()
    
  }
//reset
resetForm(form?: NgForm) {
  if (form != null)
    form.resetForm();
    this.service.formData={
      Id:0,
      SenderEmail:'',
      SenderName:'',
      TemplateContent:'',
      TemplateSubject:'',
      Templatetype:''
    }
}
refersehList(){
  this.service.refreshList().subscribe(x=>{
    console.table(x);
    this.dataList=x as []
  })
}
onDelete(id:number){
  if (confirm('Are you sure you want to delete this record?')) {
  this.service.delete(id).subscribe(x=>{
    this.refersehList()
    this.toastr.success("Newsletter successfully deleted.")
  })}
}
onEdit(id:number){
  this.Router.navigate(['/admin/newsTemp/'],{ queryParams: { Id:id }});
}
SentEmail(Id:number){
  this.service.sentEmail(Id).subscribe(x=>{
    this.toastr.success("Email sent successfully to all.")
  })
}
searchnews(){
this.service.searchnews(this.search).subscribe(x=>{
  this.dataList=x as []
})
}
}
