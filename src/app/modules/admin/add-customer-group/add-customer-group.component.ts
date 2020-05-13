import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Group } from "./group";
import { GroupService } from "./group.service";
import { stringify } from 'querystring';
@Component({
  selector: 'app-add-customer-group',
  templateUrl: './add-customer-group.component.html',
  styleUrls: ['./add-customer-group.component.css']
})
export class AddCustomerGroupComponent implements OnInit {
id:number
 oneData:any
 dropdownlist:boolean=true
  cat: Group;
dataList:Group[]
  constructor(private toastr : ToastrService ,private Router: Router,private route: ActivatedRoute,
    public service:GroupService
    ) { }

  ngOnInit() {
    
    this.route.queryParams.subscribe(params => {
      this.id= params['Id'];
        
      if(this.id>0){
       
        this.dropdownlist=false
        this.service.getGroupName(this.id).subscribe(
          (res:any)=>{console.log(res.GroupName.toString())
            this.service.formData.GroupName=res.GroupName.toString()
          }
        )
        // .subscribe(res=>
        //  {
        //      
        //     this.oneData=res
        //     console.log(this.oneData)
        //     alert(this.oneData)
        // } 
        //   )
              }else{
                this.dropdownlist=true
              }
    this.resetForm()
    this.service.refreshList().then(data=>{ 
      this.dataList=data as Group[]
    
    

      //this.cat= this.service.getProduct(id);
  
  })
})

}

  //reset
  resetForm(form?: NgForm) {
    if (form != null)
      form.resetForm();
      this.service.formData={
        Id:null,
     GroupName:"",
     CustomerId:null
      }
  }
  onSubmit(form: NgForm) {
  if(this.id){
    form.value.Id=this.id
  }
    if (form.value.Id == null )
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
        this.toastr.warning('Deleted successfully');
      });
    }
  
  }
  
  //updateRecord
  updateRecord(form: NgForm) {
  
    this.service.updateCategory(form.value)
    .subscribe(res => {
      this.toastr.info('Updated successfully', 'Customer-Group !');
      this.Router.navigate(['/admin/CustomerGroupList']);
      
    });
  }
  populateForm(cat:  Group) {
    //alert(JSON.stringify(cat));
    
    this.service.formData.GroupName=this.oneData
  
  }
  //insertRecord 
  insertRecord(form: NgForm) {
//alert(stringify(form.value))
  
  this.service.saveCategory(form.value).subscribe(res => {
    if(res==1){
      this.toastr.warning('Group with this name is already created');
    }else{
    this.toastr.success('Data added successfully');
  this.Router.navigate(['/admin/CustomerGroupList']);
    }
  });
  }
}
