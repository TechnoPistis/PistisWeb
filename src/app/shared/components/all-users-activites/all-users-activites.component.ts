import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CommonService } from "../../../shared/services/common.service";
import { ToastrService } from 'ngx-toastr';
import { UseractivityService } from 'src/app/modules/admin/user-activity/useractivity.service';
@Component({
  selector: 'app-all-users-activites',
  templateUrl: './all-users-activites.component.html',
  styleUrls: ['./all-users-activites.component.css']
})

export class AllUsersActivitesComponent implements OnInit {

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
    this.srevice.refreshList1(this.page, this.pageSize, this.SearchName).subscribe(
      (res: any) => {
          
        this.dataList = res.data;
        console.log(this.dataList)
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
