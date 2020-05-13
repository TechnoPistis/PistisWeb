import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { FooterService } from './footer.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Footer } from "./footer";
import { from } from 'rxjs';
@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  cat: Footer;
  dataList: any;
  id: number;
  FormValid:boolean=false;
  constructor(
    private toastr: ToastrService,
    private Router: Router,
    private route: ActivatedRoute,
    public service: FooterService
  ) { }

  ngOnInit() {
    this.FormValid=false
    this.resetForm();
    this.service.refreshList().then(res => {
      this.dataList = res as []
      this.route.queryParams.subscribe(params => {
        this.id = params['Id'];
if(this.id>0){
        this.service.getOneFooterdata(this.id).subscribe(
          x => {
            this.cat = x as Footer
            console.log(this.cat)
            this.populateForm(this.cat)
          }
        )
        }

      })
    })
    this.service.formData.FooterHeaderId = 0
  }
  populateForm(cat: Footer) {
    this.service.formData = Object.assign({}, cat);
  }
  validate(){
      
    this.FormValid==true;
  }
  //reset
  resetForm(form?: NgForm) {
    if (form != null)
      form.resetForm();
    this.service.formData = {
      Id: null,
      FooterHeaderId: 0,
      Name: "",
      Url: "",
    }
  }

  onClick() {
    this.Router.navigate(['/admin/footer-url-list']);
  }

  onSubmit(form: NgForm) {
      
   
      if (form.value.Id == null)
        this.insertRecord(form);
      else
        this.updateRecord(form);
    
  }


  //delete
  onDelete(id: number) {
    if (confirm('Are you sure you want to delete this record?')) {
      this.service.deleteCategory(id).subscribe(res => {
        this.service.refreshList();
        this.toastr.warning('Deleted successfully', 'Footer Url !');
      });
    }
  }


  //updateRecord
  updateRecord(form: NgForm) {
    this.service.updateCategory(form.value)
      .subscribe(res => {
        this.toastr.info('Updated successfully', 'Footer Url !');
        this.Router.navigate(['/admin/footer-url-list']);
      });
  }
  //insertRecord 
  insertRecord(form: NgForm) {
    this.service.postCategory(form.value).subscribe(res => {
      this.toastr.success('Inserted successfully', 'Footer Url !');
      this.Router.navigate(['/admin/footer-url-list']);
    });
  }
}
