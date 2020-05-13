import { Component, OnInit } from '@angular/core';
import { SildersListService } from './silders-list.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
@Component({
  selector: 'app-sliders-list',
  templateUrl: './sliders-list.component.html',
  styleUrls: ['./sliders-list.component.css']
})
export class SlidersListComponent implements OnInit {

  public dataList: any = [];
  selectedVal: string;
  constructor(private srevice: SildersListService, private toastr: ToastrService
    , private Router: Router) {

  }

  count: number = 0; page: number = 1; perPage: number = 10; pagesToShow: number = 10;
  SearchName: any;
  pageSize: any;

  ngOnInit() {
    this.page = 1;
    this.pageSize = 10;
    this.SearchName = "";
    this.getSliders();
  }
  getSliders() {
    this.srevice.refreshList(this.page, this.pageSize, this.SearchName).subscribe((data: any) => {
      this.dataList = data.data;
      this.count = data.count;
    }
    );
  }



  onDelete(id: number) {
    if (confirm('Are you sure you want to delete this record?')) {
      this.srevice.deleteCategory(id).subscribe(res => {
        this.getSliders();
        this.toastr.warning('Deleted successfully', 'Slider Image !');
      });
    }
  }
  onEdit(id: number) {
      
    this.Router.navigate(['/admin/sliders/'], { queryParams: { Id: id } });
  }
  onClick() {
    this.Router.navigate(['/admin/sliders']);
  }


  prevPage() {
    this.page = this.page - 1;
    this.getSliders();
  }
  nextPage() {
    this.page = this.page + 1;
    this.getSliders();
  }
  goToPage(event) {
    this.page = event;
    this.getSliders();
  }

  newPageSize(e) {
    if (e == 0) {
      e = this.count;
    }
    this.perPage = e;
    this.getSliders();
  }

  searchProduct() {
    this.page = 1;
    this.getSliders();
  }

}
