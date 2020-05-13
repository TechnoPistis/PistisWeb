import { Component, OnInit } from '@angular/core';
import { ReturnListService } from './return-list.service';
import { ReturnListModel } from './return-list-model';

@Component({
  selector: 'app-return-list',
  templateUrl: './return-list.component.html',
  styleUrls: ['./return-list.component.css']
})
export class ReturnListComponent implements OnInit {
  List: any[];

  constructor(public service: ReturnListService) { }


  count: number = 0; page: number = 1; perPage: number = 10; pagesToShow: number = 10;
  SearchName: any = '';
  pageSize: any;


  ngOnInit() {
    this.page = 1;
    this.pageSize = 10;
    this.getReturnData();
  }
  getReturnData() {
    this.service.getReturnData(this.page, this.pageSize).subscribe((response: any) => {
        
      this.List = response.data;
      this.count = response.count;
    })
  }
  refund(amount: any, id) {
    this.service.refund(amount, id).subscribe(data => {
      this.getReturnData();
    })
  }

    

prevPage() {
  this.page = this.page - 1;
  this.getReturnData();
}
nextPage() {
  this.page = this.page + 1;
  this.getReturnData();
}
goToPage(event) {
  this.page = event;
  this.getReturnData();
}

newPageSize(e) {
  if (e == 0) {
    e = this.count;
  }
  this.perPage = e;
  this.getReturnData();
}

search(){
  this.page=1;
  this.getReturnData();
}
}
