import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CategoryService } from './category.service';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-main-category',
  templateUrl: './main-category.component.html',
  styleUrls: ['./main-category.component.css']
})
export class MainCategoryComponent implements OnInit {
fileToUpload: File = null;
  
  constructor(public service:CategoryService,private toastr: ToastrService, private Router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.resetForm()
  }
 //reset
 resetForm(form?: NgForm) {
  if (form != null)
    form.resetForm();
    this.service.formData.Id=0
    this.service.formData.Name=''
    this.service.formData.SpanishName=''
    this.service.formData.ActualIcon=''
this.service.formData.Icon=''
}

insertRecord(form: NgForm) {
    
  form.value.ActualIcon= this.service.formData.ActualIcon
form.value.Icon=this.service.formData.Icon
form.value.IsAdult=this.IsAdult
  this.service.postCategory(form.value).subscribe(res => {
      
    if(res==1){
    this.toastr.success('Inserted successfully');
    this.resetForm()
   this.Router.navigate(['/admin/AddSubMenu']);
    }else{
    this.toastr.info('Already inserted.');

    }
  });
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
onSubmit(form: NgForm) {
 if(!this.service.formData.ActualIcon){
  this.toastr.warning('Kindly add Icon.');
  return false;
 }
  else if(!this.service.formData.Icon)
  {
    this.toastr.warning('Kindly add Image.')
    return false;
  }
  else
    this.insertRecord(form);
}

Open(){
  $('#fileDialog').trigger('click');
}
onSelectFile(event) {
  const file = event.target.files[0];
  const typeFile = file.type.split('/');
  if(typeFile[1] === 'png' || typeFile[1] === 'jpg' || typeFile[1] === 'jpeg' || typeFile[1] === 'gif'){ 
  if (event.target.files && event.target.files[0]) {
    var filesAmount = event.target.files.length;
    for (let i = 0; i < filesAmount; i++) {
      var reader = new FileReader();
      reader.onload = (event: any) => {
        this.service.formData.ActualIcon=event.target.result;
      }
      this.fileToUpload = event.target.files[i]
      reader.readAsDataURL(this.fileToUpload);
    }
  
  }}else{
    this.toastr.error('Please select valid Image !');
  }

}
Open1(){
  $('#fileDialog1').trigger('click');
}
onSelectFile1(event) {
  const file = event.target.files[0];
  const typeFile = file.type.split('/');
  if(typeFile[1] === 'png' || typeFile[1] === 'jpg' || typeFile[1] === 'jpeg' || typeFile[1] === 'gif'){ 
  if (event.target.files && event.target.files[0]) {
    var filesAmount = event.target.files.length;
    for (let i = 0; i < filesAmount; i++) {
      var reader = new FileReader();
      reader.onload = (event: any) => {
        this.service.formData.Icon=event.target.result;
      }
      this.fileToUpload = event.target.files[i]
      reader.readAsDataURL(this.fileToUpload);
    }
  
  }}else{
    this.toastr.error('Please select valid Image !');
  }

}
}
