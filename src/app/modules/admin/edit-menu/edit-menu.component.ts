import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Edit } from "./edit";
import {  EditService} from "./edit.service";

@Component({
  selector: 'app-edit-menu',
  templateUrl: './edit-menu.component.html',
  styleUrls: ['./edit-menu.component.css']
})
export class EditMenuComponent implements OnInit {
  id: any;
menuName:boolean=false;
SubMenu:boolean=false;
MenuId:boolean=false;
editClass:Edit;
dataList:[];

  constructor(private toastr : ToastrService ,private Router: Router,private route: ActivatedRoute,public service:EditService) { }

  ngOnInit() {
    
    this.route.queryParams.subscribe(params => {
      this.id= params['Id'];
        
      if(this.id>0){
this.service.getEditMenu(this.id).then((res:any)=>{

  if(res.subId==0){
this.editClass=res as Edit
    this.menuName=true;
this.populateForm(this.menuName)
  }else{
    this.menuName=false;
    this.editClass=res as Edit
    this.MenuId=true;
    this.SubMenu=true;
    this.populateForm(this.menuName)
}})

      }
    })

  }
  
    //reset
    resetForm(form?: NgForm) {
      if (form != null)
        form.resetForm();
        this.service.formData={
          Id:0,
          MenuName:"",
          SubMenuName:"",
    ProductId:0
        }
    }

    onSubmit(form: NgForm) {
   
          this.updateRecord(form);
      }
  
  //updateRecord
  updateRecord(form: NgForm) {
  
    this.service.updateCategory(form.value)
    .subscribe(res => {
      this.toastr.info('Menu updated successfully');
      this.Router.navigate(['/admin/MenuList']);
      
    });
  }
  
  populateForm(cat:  any) {
     this.service.formData = Object.assign({}, cat);
   }
}
