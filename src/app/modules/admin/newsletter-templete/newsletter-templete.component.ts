import { Component, OnInit } from '@angular/core';
import { CKEditor4 } from 'ckeditor4-angular/ckeditor';
import { NgForm } from '@angular/forms';
import { NewsService } from "./news.service";
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { News } from './news';
@Component({
  selector: 'app-newsletter-templete',
  templateUrl: './newsletter-templete.component.html',
  styleUrls: ['./newsletter-templete.component.css']
})
export class NewsletterTempleteComponent implements OnInit {
  id: any;
  cat: any;
  re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  result: boolean;
emailValid:boolean=false
  constructor(public service:NewsService,private toastr: ToastrService, private Router: Router,private route: ActivatedRoute,) { }

  ngOnInit() {
    this.resetForm()
    this.route.queryParams.subscribe(params => {
      this.id = params['Id'];
      if(this.id>0){
    this.service.getnewsletter(this.id).subscribe(x=>{
     
        this.cat= x
      this.populateForm(this.cat)
    })
  }
    })

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
populateForm(cat:  News) {
  //  alert(JSON.stringify(cat));
    
    this.service.formData = Object.assign({}, cat);
   
  }
  onEntry(val:string){
      
    this.result = this.re.test(String(val).toLowerCase());
    if(!this.result)
this.emailValid=true
else
this.emailValid=false
  }
onSubmit(form: NgForm) {
  this.insertRecord(form);
}
insertRecord(form: NgForm) {
  this.service.postCategory(form.value).subscribe((res:any) => {
    if(res==2)
    this.toastr.success('Newsletter template inserted successfully');
    else
    this.toastr.success('Newsletter template updated successfully');


   this.Router.navigate(['/admin/newsTempList']);
  });
}

}
