import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { FooterService } from "./footer.service";
import { Footer } from './footer';
@Component({
  selector: 'app-footer-header',
  templateUrl: './footer-header.component.html',
  styleUrls: ['./footer-header.component.css']
})
export class FooterHeaderComponent implements OnInit {
  cat: Footer;

  constructor(private toastr : ToastrService ,private Router: Router,private route: ActivatedRoute,public service: FooterService
    ) { }

  ngOnInit() {
    this.resetForm();
    this.service.refreshList().then(data=>{ 
    
    this.route.queryParams.subscribe(params => {
      const id = params['Id'];
      this.cat= this.service.getProduct(id);
    this.populateForm(this.cat);
  })
})

}
  //reset
  resetForm(form?: NgForm) {
    if (form != null)
      form.resetForm();
      this.service.formData={
        Id:null,
      Name:"",
  
    
      }
  }
  onSubmit(form: NgForm) {
    
    if (form.value.Id == null)
      this.insertRecord(form);
    else
      this.updateRecord(form);
  }

  onClick(){
    this.Router.navigate(['/admin/Footer-header-list']);
  }
  //delete
  onDelete(id: number) {
    if (confirm('Are you sure you want to delete this record?')) {
    
      this.service.deleteCategory(id).subscribe(res => {
        this.service.refreshList();
        this.toastr.warning('Deleted successfully', 'Category !');
      });
    }
  
  }
  
  //updateRecord
  updateRecord(form: NgForm) {
  
    this.service.updateCategory(form.value)
    .subscribe(res => {
      this.toastr.info('Updated successfully', 'Footer-header !');
      this.resetForm(form);
      this.service.refreshList();
      this.Router.navigate(['/admin/Footer-header-list']);
      
    });
  }
  populateForm(cat:  Footer) {
   // alert(JSON.stringify(cat));
    
    this.service.formData = Object.assign({}, cat);
  
  }
  //insertRecord 
  insertRecord(form: NgForm) {

  this.service.saveCategory(form.value).subscribe(res => {
    this.resetForm(form);
    this.toastr.success('Inserted successfully', 'Footer-header !');
  
  this.service.refreshList();
  this.Router.navigate(['/admin/Footer-header-list']);
  });
  }

}
