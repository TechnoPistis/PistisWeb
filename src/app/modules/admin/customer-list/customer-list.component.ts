import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { CustomersService } from "./customers.service";
@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css']
})
export class CustomerListComponent implements OnInit {
  public dataList: any = [];
  selectedVal: string;
  constructor(private srevice: CustomersService, private toastr: ToastrService
    , private Router: Router) { }


  count: number = 0; page: number = 1; perPage: number = 10; pagesToShow: number = 10;
  SearchName: any;
  pageSize: any;


  ngOnInit() {
    this.page = 1;
    this.pageSize = 10;
    this.SearchName = "";

    this.getCustomers();

  }

  getCustomers() {
    this.srevice.refreshList(this.page, this.pageSize, this.SearchName).toPromise().then((data: any) => {
      this.dataList = data.data;
      this.count = data.count;
    })
  }



  //onActivate
  onActivate(id: number, val: number) {
    if (val == 1) {
      if (confirm('Are you want to Activate this customer?')) {
        this.srevice.deactivateCustomer(id).subscribe(res => {
          this.getCustomers();
          this.toastr.warning('Activated successfully', 'customer !');
        });
      }
    } else {
      if (confirm('Are you want to Deactivate this customer?')) {

        this.srevice.deactivateCustomer(id).subscribe(res => {
          this.getCustomers();
          this.toastr.warning('Deactivated successfully', 'customer !');
        });
      }
    }
  }
  //ondelete
  onDelete(id: number) {

    if (confirm('Are you sure to delete this customer?')) {

      this.srevice.deleteCustomer(id).subscribe(res => {
        this.getCustomers();
        this.toastr.warning('Deleted successfully', 'customer !');
      });
    }

  }
  onResetPassword(id: number) {
    this.srevice.ResetPassword(id).subscribe(res => {
      this.getCustomers();
      this.toastr.info('Reset link send successfully');
    });


  }

  onEdit(id: number) {
    this.Router.navigate(['/admin/EditCustomer'], { queryParams: { Id: id } });
  }


  prevPage() {
    this.page = this.page - 1;
    this.getCustomers();
  }
  nextPage() {
    this.page = this.page + 1;
    this.getCustomers();
  }
  goToPage(event) {
    this.page = event;
    this.getCustomers();
  }

  newPageSize(e) {
    if (e == 0) {
      e = this.count;
    }
    this.perPage = e;
    this.getCustomers();
  }

  search() {
    this.page = 1;
    this.getCustomers();
  }

}
