import { Component, OnInit } from '@angular/core';
import { SearchTermService } from '../../../shared/components/searchterm/search-term.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-searchtermlist',
  templateUrl: './searchtermlist.component.html',
  styleUrls: ['./searchtermlist.component.css']
})
export class SearchtermlistComponent implements OnInit {
  List: any[]
  data: any;
  constructor(public service: SearchTermService, private router: Router) { }

  count: number = 0; page: number = 1; perPage: number = 10; pagesToShow: number = 10;
  SearchName: any = '';
  pageSize: any;

  ngOnInit() {
    this.page = 1;
    this.pageSize = 10;
    this.getAll()
  }

  getAll() {
    this.service.getAll(this.page, this.pageSize).subscribe((response: any) => {
      this.List = response.data;
      this.count = response.count;
    })
  }
  edit(id) {
    this.router.navigate(['/admin/editsearchterm'], { queryParams: { Id: id } })
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
