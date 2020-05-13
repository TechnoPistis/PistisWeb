import { Component, OnInit } from "@angular/core";
import { VendorsService } from "./vendors.service";
import { ToastrService } from "ngx-toastr";
import { Router } from "@angular/router";

@Component({
  selector: "app-vendorlist",
  templateUrl: "./vendorlist.component.html",
  styleUrls: ["./vendorlist.component.css"]
})
export class VendorlistComponent implements OnInit {
  public dataList: any = [];
  selectedVal: string;

  constructor(
    private service: VendorsService,
    private toaster: ToastrService,
    private router: Router
  ) {}

  count: number = 0;
  page: number = 1;
  perPage: number = 10;
  pagesToShow: number = 10;
  SearchName: any;
  pageSize: any;

  ngOnInit() {
    this.page = 1;
    this.pageSize = 10;
    this.SearchName = "";
    this.getVendors();
  }

  //To get all vendors who are verified
  getVendors() {
    this.service
      .refreshList(this.page, this.pageSize, this.SearchName)
      .toPromise()
      .then((data: any) => {
        this.dataList = data.data;
        this.count = data.count;
      });
  }

  //to delete vendor (make IsVerified: false)
  onDelete(id: number) {
    if (confirm("Are you sure to delete this vendor?")) {
      this.service.deleteVendor(id).subscribe(res => {
        this.getVendors();
        this.toaster.warning("Deleted successfully", "vendor !");
      });
    }
  }

  //onActivate
  onActivate(id: number, val: number) {
      
    if (val == 1) {
      if (confirm("Are you want to Activate this vendor?")) {
        this.service.deactivateVendor(id).subscribe(res => {
          this.getVendors();
          this.toaster.warning("Activated successfully", "vendor !");
        });
      }
    } else {
      if (confirm("Are you want to Deactivate this vendor?")) {
        this.service.deactivateVendor(id).subscribe(res => {
          this.getVendors();
          this.toaster.warning("Deactivated successfully", "vendor !");
        });
      }
    }
  }

  //add vendor
  addVendor() {
     
    this.router.navigate(["/admin/Vendoradd"]);
  }

  //edit vendor
  editVendor(id: number) {
    this.router.navigate(["/admin/Vendoredit"], { queryParams: { Id: id } });
  }

  prevPage() {
    this.page = this.page - 1;
    this.getVendors();
  }
  nextPage() {
    this.page = this.page + 1;
    this.getVendors();
  }
  goToPage(event) {
    this.page = event;
    this.getVendors();
  }

  newPageSize(e) {
    if (e == 0) {
      e = this.count;
    }
    this.perPage = e;
    this.getVendors();
  }

  search() {
    this.page = 1;
    this.getVendors();
  }

  //to reset password
  onResetPassword(id: number) {
    this.service.ResetPassword(id).subscribe(res => {
      this.getVendors();
      this.toaster.info("Reset link send successfully");
    });
  }
}
