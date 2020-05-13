import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Data } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { CommonService } from "src/app/shared/services/common.service";
@Component({
  selector: 'app-manage-group-customers',
  templateUrl: './manage-group-customers.component.html',
  styleUrls: ['./manage-group-customers.component.css']
})
export class ManageGroupCustomersComponent implements OnInit {
  Id: any;
  private data = new CommonService();
  url = this.data.getUri();
  dataList: any;
  Data = {
    CustomerId: [],
    Id: Number
  }

  customerList: [];
  selectedCustomers: [];
  constructor(private Router: Router, private route: ActivatedRoute, private http: HttpClient, private toastr: ToastrService) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.Id = params['Id'];
      if (this.Id > 0)
        this.getdata(this.Id)
    })
    this.getFilterCustomers(this.Id).subscribe(x =>
      this.customerList = x as []
    )
  }
  getdata(id: number) {
    return this.getGroupUsers(this.Id).subscribe(res => {
      this.dataList = res
    });
  }
  onclick(id: any) {
      
    if(id!=[] || id!=null || id[0] != 'undefined'){
    this.Data.Id = this.Id
    this.Data.CustomerId = id;
   // alert(JSON.stringify(this.Data))
     
    return this.http.post(this.url + 'CustomerGroup/addtoCustomergroup', this.Data).subscribe(res => {
      if (res == 1) {
        this.toastr.info('Data added successfully');
        this.ngOnInit();
      } else {
        this.toastr.error('Please select the customer');
      }
    })
  }else{
    this.toastr.info('Please select the customer');
  }
  }
  getGroupUsers(id: number) {
    return this.http.get(this.url + 'CustomerGroup/MangegroupCustomers?Id=' + id)
  }
  getFilterCustomers(Id: number) {
    return this.http.get(this.url + 'CustomerGroup/filterGroupCustomers?Id=' + Id)
  }
  onDelete(Id: number) {
    if (confirm('Are you sure you want to delete this record?')) {
    let groupId=  this.Id
      this.deleteCustomer(Id,groupId).subscribe(
        res => {
          this.toastr.info('deleted successfully', 'custromer !');
          this.ngOnInit();
          
        }
      )
    }
  }
  deleteCustomer(id: number,groupId:number) {

    return this.http.get(this.url + 'CustomerGroup/deleteGroupCustomer?Id=' + id+'&groupId='+groupId)
  }
  getCustomers() {

    return this.http.get(this.url + 'Customer/getCustomers')
  }

}

