import { Component, OnInit } from '@angular/core';
import { NewsletterService } from "./newsletter.service";
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
@Component({
  selector: 'app-newsletter-list',
  templateUrl: './newsletter-list.component.html',
  styleUrls: ['./newsletter-list.component.css']
})
export class NewsletterListComponent implements OnInit {
  public dataList: any = [];
  selectedVal: string;
  constructor(private service: NewsletterService, private toastr: ToastrService
    , private Router: Router) { }


  count: number = 0; page: number = 1; perPage: number = 10; pagesToShow: number = 10;
  SearchName: any = '';
  pageSize: any;


  ngOnInit() {
    this.page = 1;
    this.pageSize = 10;
    this.getAll();
  }


  getAll() {
    this.service.refreshList(this.page, this.pageSize, this.SearchName).subscribe((response: any) => {
        
      this.dataList = response.data;
      this.count = response.count;
    });
  }

  //delete
  onDelete(id: number) {
    if (confirm('Are you sure you want to delete this record?')) {
      this.service.deletenewsLetter(id).subscribe(res => {
        this.getAll();
        this.toastr.warning('Deleted successfully', 'NewsLetter !');
      });
    }
  }

  //onActivate
  onActivate(id: number, val: number) {
    if (val == 0) {
      if (confirm('Are you want to subscribe this customer?')) {
        this.service.onSubscribe(id).subscribe(res => {
          this.ngOnInit();
          this.toastr.info('Subscribed Successfully!');
        })
      }
    } else {
      if (confirm('Are you want to  unsubscribe this customer?')) {
        this.service.onSubscribe(id).subscribe(res => {
          this.ngOnInit();
          this.toastr.info('Unsubscribed Successfully');
        })
      }
    }
  }

  onEdit(id: number) {
    this.Router.navigate(['/admin/AddNewsLetter/'], { queryParams: { Id: id } });
  }

  onClick() {
    this.Router.navigate(['/admin/AddNewsLetter']);
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

  search() {
    this.page = 1;
    this.getAll();
  }

}
