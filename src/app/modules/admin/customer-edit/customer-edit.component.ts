import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';
import { Customer } from "./customer";
import { CustomerService } from "./customer.service";
import { DatePipe } from "@angular/common";
@Component({
  selector: 'app-customer-edit',
  templateUrl: './customer-edit.component.html',
  styleUrls: ['./customer-edit.component.css']
})
export class CustomerEditComponent implements OnInit {
  cat: Customer;
  dataList: any;
id:number;
genderList:any;
stateList:any;
countryList:any;
languageList:any;
  data: string;

  constructor(private toastr : ToastrService ,private Router: Router,private route: ActivatedRoute
    ,public service:CustomerService,private datePipe:DatePipe ) { }

  ngOnInit() {
this.resetForm();
// this.service.refreshList().then(data=>{ 
  // this.dataList=data;

   this.route.queryParams.subscribe(params => {
    this.service.getCountry().subscribe(res=>
      this.countryList=res as []
      )
      this.service.getState().subscribe(res=>
        this.stateList=res as []
        )
        this.service.getLanguage().subscribe(res=>
          this.languageList=res as []
          )
          this.service.getGender().subscribe(res=>
            this.genderList=res as []
            )
  this.id = params['Id'];
  
  this.service.getProduct(this.id).subscribe(res=>
 {
  this.cat =res as Customer
  console.log(this.cat)
  this.populateForm(this.cat);
 }
  )
})
// })
  }
  populateForm(cat:  Customer) {
   // alert(this.service.formData = Object.assign({}, cat));
    
    this.service.formData = Object.assign({}, cat);
    
    this.data=this.datePipe.transform(new Date(this.cat.DOB),"EEEE, MMMM d, y, h:mm:ss a zzzz");
    this.service.formData.DOB=new Date(this.data)
    // this.service.formData.CountryId=cat.CountryId;
    // this.service.formData.
  }
    //reset
    resetForm(form?: NgForm) {
      if (form != null)
        form.resetForm();
        this.service.formData={
          Id:null,
        Address:"",
        City:"",
        CountryId:0,
        DOB:null,
        DisplayName:"",
        Email:"",
        FacebookId:"",
        FirstName:"",
        GenderId:null,
        LanguageId:null,
        LastName:"",
        Phone:null,
        PostalCode:null,
        StateId:0,
        TwitterId:"",
        UserName:"",
        MiddleName:""
        }
    }

    onClick(){
      this.Router.navigate(['/admin/CustomersList']);
    }
    //submit
    onSubmit(form: NgForm) {
  
        this.updateRecord(form);
    }
    //updateRecord
updateRecord(form: NgForm) {

  this.service.updateCustomer(form.value)
  .subscribe(res => {
    this.toastr.info('Updated successfully', 'Customer !');
    this.resetForm(form);
  
    this.Router.navigate(['/admin/CustomersList']);
    
  });
}
//insertRecord 

}



