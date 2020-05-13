import { Component, OnInit, HostListener } from '@angular/core';
import { UseractivityService } from './useractivity.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { debug } from 'util';
@Component({
  selector: 'app-user-activity',
  templateUrl: './user-activity.component.html',
  styleUrls: ['./user-activity.component.css']
})
export class UserActivityComponent implements OnInit {

  public dataList: []
  constructor(private srevice: UseractivityService, private toastr: ToastrService
    , private Router: Router) { }


  count: number = 0; page: number = 1; perPage: number = 10; pagesToShow: number = 10;
  SearchName: any;
  pageSize: any;

  ngOnInit() {
    this.page = 1;
    this.pageSize = 10;
    this.SearchName = "";
    this.getActivities();
  }

  getActivities() {
    this.srevice.refreshList(this.page, this.pageSize, this.SearchName).subscribe(
      (res: any) => {
          
        this.dataList = res.data;
        this.count = res.count;
      }
    )
  }

  Activity(id: number) {
    this.Router.navigate(['/admin/UserActivityList/'], { queryParams: { Id: id } });
  }


  prevPage() {
    this.page = this.page - 1;
    this.getActivities();
  }
  nextPage() {
    this.page = this.page + 1;
    this.getActivities();
  }
  goToPage(event) {
    this.page = event;
    this.getActivities();
  }

  newPageSize(e) {
    if (e == 0) {
      e = this.count;
    }
    this.perPage = e;
    this.getActivities();
  }

  searchProduct() {
    this.page = 1;
    this.getActivities();
  }

}


export class userlog {
  Id: number;
  UserId: number;
  ActionId: number;
  ProductId: number;
  PageId: number;
  IPAddress: number;
  Url: string;
  LogInDate: Date;
  LogOutDate: Date;
}
