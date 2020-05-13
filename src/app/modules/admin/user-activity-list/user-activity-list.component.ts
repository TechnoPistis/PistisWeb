import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CommonService } from "../../../shared/services/common.service";
@Component({
  selector: 'app-user-activity-list',
  templateUrl: './user-activity-list.component.html',
  styleUrls: ['./user-activity-list.component.css']
})
export class UserActivityListComponent implements OnInit {
  dataList: []
  hasChild: boolean;
  data = new CommonService();
  url = this.data.getUri();
  constructor(private Router: Router, private route: ActivatedRoute, private http: HttpClient) { }
  id:any;
  count: number = 0; page: number = 1; perPage: number = 10; pagesToShow: number = 10;
  SearchName: any;
  pageSize: any;


  ngOnInit() {
    this.page = 1;
    this.pageSize = 10;
    this.SearchName = "";
    this.route.queryParams.subscribe(params => {
      this.id = params['Id']
    })
    this.getUserActivities();
  }


  getUserActivities() {
    this.refreshList().subscribe((res:any) => {
      this.dataList = res.data;
      this.count=res.count
      console.log(this.dataList)
      if (this.dataList.length > 0) {
        this.hasChild = true;
      } else {
        this.hasChild = false
      }
    }
    )
  }
  

  refreshList() {
    return this.http.get(this.url + "UserLog/getuser?Id=" + this.id+'&page=' + this.page + '&pageSize=' + this.pageSize + '&search=' + this.SearchName)
  }

  onClick() {
    this.Router.navigate(['/admin/UserActivity']);
  }

  prevPage() {
    this.page = this.page - 1;
    this.getUserActivities();
  }
  nextPage() {
    this.page = this.page + 1;
    this.getUserActivities();
  }
  goToPage(event) {
    this.page = event;
    this.getUserActivities();
  }

  newPageSize(e) {
    if (e == 0) {
      e = this.count;
    }
    this.perPage = e;
    this.getUserActivities();
  }

  searchProduct(){
    this.page=1;
    this.getUserActivities();
  }

}
