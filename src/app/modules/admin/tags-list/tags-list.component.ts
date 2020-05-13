import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { TagsService } from "./-tags.service";
@Component({
  selector: 'app-tags-list',
  templateUrl: './tags-list.component.html',
  styleUrls: ['./tags-list.component.css']
})
export class TagsListComponent implements OnInit {
  public dataList: any = [];
  selectedVal: string;
  firstDiv: boolean = false
  Tagname: string;
  productId: any;
  constructor(private srevice: TagsService, private toastr: ToastrService
    , private Router: Router) { }

  count: number = 0; page: number = 1; perPage: number = 10; pagesToShow: number = 10;
  SearchName: any = '';
  pageSize: any;

  ngOnInit() {
    this.pageSize=10;
    this.page=1;
    this.getAll();
  }


  getAll() {
    this.srevice.refreshList(this.page,this.pageSize,this.SearchName).toPromise().then((response:any) => {
      this.dataList = response.data;
      this.count =response.count;
    })
  }


  //onActivate
  onActivate(id: number, val: number) {
    if (val == 1) {
      if (confirm('Are you want to Activate this tag?')) {
        this.srevice.deactivateCustomer(id).subscribe(res => {
          this.srevice.getProd(this.productId).subscribe(data => {
            this.dataList = data;
          });
          this.toastr.warning('Activated successfully', 'Tag !');
        });
      }
    } else {
      if (confirm('Are you want to Deactivate this tag?')) {

        this.srevice.deactivateCustomer(id).subscribe(res => {
          this.srevice.getProd(this.productId).subscribe(data => {

            this.dataList = data;
          });
          this.toastr.warning('Deactivated successfully', 'Tag !');
        });
      }
    }
  }
  //ondelete
  onDelete(id: number) {

    if (confirm('Are you sure to delete this tag?')) {

      this.srevice.deleteCustomer(id).subscribe(res => {
        this.srevice.getProd(this.productId).subscribe(data => {
          ;
          this.dataList = data;
        });
        this.toastr.warning('Deleted successfully', 'Tag !');
      });
    }

  }

  goBackSymon() {
    this.firstDiv = false
    this.getAll();
  }
  onEdit(id: number) {

    this.Router.navigate(['/admin/EditCustomer'], { queryParams: { Id: id } });
  }
  getProducts(val: any, tagName: string) {
    this.firstDiv = true
    this.productId = val;
    this.Tagname = tagName
    this.srevice.getProd(val).subscribe(x => {
        
      this.dataList = x;
      console.log(this.dataList)
    })
  }

  
prevPage() {
  this.page = this.page - 1;
  this.getAll();
}
nextPage() {
  this.page = this.page + 1;
  this.getAll();
}
goToPage(event) {
  this.page = event;
  this.getAll();
}

newPageSize(e) {
  if (e == 0) {
    e = this.count;
  }
  this.perPage = e;
  this.getAll();
}

search(){
  this.page=1;
  this.getAll();
}


}
