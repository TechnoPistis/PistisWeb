import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';
import { CategoryService } from '../product-category/category.service';
import { Category } from './category';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-product-category',
  templateUrl: './product-category.component.html',
  styleUrls: ['./product-category.component.css']
})
export class ProductCategoryComponent implements OnInit {
  imageUrl: string = "https://images.app.goo.gl/HgK5jFyWuno6M8nj9";
  fileToUpload: File = null;
  cat: Category
  cSelected: number;
  products: any;
  Countries: any;
  status: boolean;
  base64textString: any;
  dataList: any;
  id: any;
  constructor(public service: CategoryService,
    private toastr: ToastrService, private Router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
      
    this.resetForm();
    this.service.refreshList().then(data => {
      this.dataList = data;
      //const id = +this.route.snapshot.paramMap.get('Id');
      this.route.queryParams.subscribe(params => {
        this.id = params['Id'];
        this.cat = this.dataList.find(e => e.Id == this.id);
        this.imageUrl = this.cat.Icon;
        this.populateForm(this.cat);
      });
    }
    );


  }
  onClick() {
    this.Router.navigate(['/admin/category-list']);
  }
  clickEvent() {
    this.status = !this.status;
  }
  onSubmit(form: NgForm) {
      
    if (form.value.Id == null) {
      form.value.Id = 0;
      form.value.Icon = this.imageUrl;
      this.insertRecord(form);
    }
    else
      this.updateRecord(form);
  }



  resetForm(form?: NgForm) {
    if (form != null)
      form.resetForm();
    this.service.formData = {
      Id: null,
      Name: '',
      ParentId: null,
      IsActive: false,
      Icon: ""
    }
  }

  updateRecord(form: NgForm) {
      
    var model=form.value;
    model.Icon=this.imageUrl;
    this.service.updateCategory(model)
      .subscribe(res => {
        this.toastr.info('Updated successfully', 'Category !');
        this.Router.navigate(['/admin/category-list']);
      });
  }
  populateForm(cat: Category) {
    //  alert(JSON.stringify(cat));
    this.service.formData.ParentId = this.id;
    this.service.formData = Object.assign({}, cat);
  }


  insertRecord(form: NgForm) {

    //alert(JSON.stringify(form.value))
    this.service.postCategory(form.value).subscribe(res => {
      this.toastr.success('Inserted successfully', 'Menu !');

      this.Router.navigate(['/admin/category-list']);
    });
  }

  handleFileInput(event) {
      
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      reader.onload = (event: any) => {
        this.imageUrl = event.target.result;
      }
      this.fileToUpload = event.target.files[0]
      reader.readAsDataURL(this.fileToUpload);
    }
  }

  onDelete(id: number) {
    if (confirm('Are you sure you want to delete this record?')) {

      this.service.deleteCategory(id).subscribe(res => {
        this.service.refreshList();
        this.toastr.warning('Deleted successfully', 'Category !');
      });
    }
  }
}