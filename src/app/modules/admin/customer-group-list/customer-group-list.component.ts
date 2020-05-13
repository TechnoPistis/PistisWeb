import { Component, OnInit } from '@angular/core';
import { CustomerService } from "./customer.service";
import { Customer } from "./customer";
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-customer-group-list',
  templateUrl: './customer-group-list.component.html',
  styleUrls: ['./customer-group-list.component.css']
})
export class CustomerGroupListComponent implements OnInit {
  public dataList: any = [];
  list: any = []
  selectedVal: string;
  Activate: boolean = true;
  constructor(private srevice: CustomerService, private toastr: ToastrService
    , private Router: Router) { }

  count: number = 0; page: number = 1; perPage: number = 10; pagesToShow: number = 10;
  SearchName: any;
  pageSize: any;

  ngOnInit() {
    this.page = 1;
    this.pageSize = 10;
    this.SearchName = "";
    this.getGroups();
  }

  getGroups() {
    this.srevice.getGroups(this.page,this.pageSize,this.SearchName).subscribe((data: any) => {
      this.dataList = data.data;
      this.count = data.count;
    });
  }


  //delete
  onDelete(id: number) {
    if (confirm('Are you sure you want to delete this record?')) {
      this.srevice.deleteGroup(id).subscribe(res => {
        if (res == 1) {
          this.toastr.warning('Deleted successfully', 'Category !');
          this.ngOnInit()
        }
        else
          this.toastr.warning('Not Deleted successfully', 'Category !');
      });
    }
  }
  onEdit(id: number) {
    this.Router.navigate(['/admin/AddCustomerGroup/'], { queryParams: { Id: id } });
  }
  onClick() {
    this.Router.navigate(['/admin/AddCustomerGroup']);
  }
  manageUsers(id: number) {
    this.Router.navigate(['/admin/manageGroupUsers'], { queryParams: { Id: id } });
  }


  
  prevPage() {
    this.page = this.page - 1;
    this.getGroups();
  }
  nextPage() {
    this.page = this.page + 1;
    this.getGroups();
  }
  goToPage(event) {
    this.page = event;
    this.getGroups();
  }

  newPageSize(e) {
    if (e == 0) {
      e = this.count;
    }
    this.perPage = e;
    this.getGroups();
  }

  search(){
    this.page=1;
    this.getGroups();
  }
}
