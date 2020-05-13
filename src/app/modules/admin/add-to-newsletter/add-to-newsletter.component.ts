import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { NewsletterService } from "./newsletter.service";
import { Newsletter } from "./newsletter";
@Component({
  selector: 'app-add-to-newsletter',
  templateUrl: './add-to-newsletter.component.html',
  styleUrls: ['./add-to-newsletter.component.css']
})
export class AddToNewsletterComponent implements OnInit {
  datalist: any;
  emailCheck:boolean;
  cat: Newsletter;
  textboxes:boolean=true;
dropdown:boolean=true;
id:number;
userList:any;
validButt:boolean=true
  constructor(private toastr : ToastrService ,private Router: Router,private route: ActivatedRoute,
    public service:NewsletterService) { }


    
  ngOnInit() {
    this.resetForm();
    
    this.service.refreshList().subscribe(res=>
      {
        this.service.getCustomers().subscribe(x=>{
          this.userList=x as []
        })
        this.datalist=res as []
console.log(this.datalist)
this.route.queryParams.subscribe(params => {
  this.id = params['Id'];
  if(this.id>0){
  this.cat= this.service.getProduct(this.id);
this.populateForm(this.cat);
  }
})
      })
  }
  
  //submit
  onSubmit(form: NgForm) {
      
    
      this.insertRecord(form);
    // else
      // this.updateRecord(form);
  }

   
  onChange(){
    this.textboxes=false;
    this.validButt=false
  }
  onKey1(aa){
    this.emailCheck = false;
this.dropdown=false;
this.validButt=false;
  
var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
if(emailReg.test(aa)){
  this.emailCheck = true;
}else {
  this.emailCheck = false;
}

  }
onKey(){
  this.dropdown=false;
this.validButt=false;
}
 populateForm(cat:  Newsletter) {
//  alert(JSON.stringify(cat));
  
  this.service.formData = Object.assign({}, cat);
 
}
 //reset
 resetForm(form?: NgForm) {
  if (form != null)
    form.resetForm();
    this.service.formData={
      Id:0,
    Email:null,
    IpAddress:null,
    UserId:null
    }
}
//updateRecord
// updateRecord(form: NgForm) {

//   this.service.updateCategory(form.value)
//   .subscribe(res => {
//     this.toastr.info('Updated successfully', 'Feature Product !');
//     this.resetForm(form);
//     this.service.refreshList();
//     this.Router.navigate(['/admin/FeatureProducts']);
    
//   });
// }
//insertRecord 
insertRecord(form: NgForm) {
 
this.service.postCategory(form.value).subscribe(res => {
  if(res==1){
  this.toastr.success('Data added successfully');

this.Router.navigate(['/admin/NewsLetterList']);
  }else{
    this.toastr.info('Already added');
  }
});
}



}
