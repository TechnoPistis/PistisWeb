import { Component, OnInit } from '@angular/core';
import { CategorycommissionService } from '../categorycommission.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
  ProductCategories: any[]=[];
  addForm: FormGroup;
  constructor(private service:CategorycommissionService,private toastr:ToastrService,private _router:Router) { }

  ngOnInit() {
    this.addForm = this.createFormGroup();
    this.getCategories();
  }
  getCategories() {
    this.service.getCategories().subscribe((data: any[]) => {
      if (data.length > 0) {
        this.ProductCategories = data;
      }
    })
  }
  createFormGroup() {
    return new FormGroup({
      //Id: new FormControl(''),
      ProductCategoryId: new FormControl('', [Validators.required]),
      Commission: new FormControl('',[Validators.required])
    });
  }
  onSubmit(event: any) {
      
    if (!this.addForm.valid) {
      this.toastr.clear();
      this.toastr.error('Fill the form first !');
      return false;
    }
      
    var model = this.addForm.value;
    this.service.add(model).subscribe(data=>{
      if(data==true)
      {
        
        this.toastr.success("Data saved successfully.")
        this._router.navigate(['/admin/commission']);
      }
      else{
        this.toastr.error("Something went wrong.Please try again")
        //this._router.navigate(['/admin/commission']);
      }
    })
   
  }
  
}
