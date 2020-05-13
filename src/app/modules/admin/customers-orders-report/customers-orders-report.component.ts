import { Component, OnInit } from '@angular/core';

import { ToastrService } from 'ngx-toastr';
import { DatePipe } from "@angular/common";
import { CommonService } from 'src/app/shared/services/common.service';
import { HttpClient } from '@angular/common/http';
import { ReportService } from '../customer-report/report.service';
@Component({
  selector: 'app-customers-orders-report',
  templateUrl: './customers-orders-report.component.html',
  styleUrls: ['./customers-orders-report.component.css']
})
export class CustomersOrdersReportComponent implements OnInit {
  spot: any = 'option'

  data = new CommonService();
  first: any
  scnd: any
  Data: any
  private url = this.data.getUri();
  constructor(
    private toastr: ToastrService
    , private datePipe: DatePipe,
    private service: ReportService
  ) { }

  ngOnInit() {
    this.resetForm()
  }
  getTariks(first: string, scnd: string) {
      
    this.first = first
    this.scnd = scnd
    this.service.getCustomersOrders(first, scnd).subscribe(x => {
      this.Data = x as []
      console.log(x)
    })
  }
  moment(val: string) {
    this.service.getCustomersOrdersday(val).subscribe(x => {
      console.log(x)
      this.Data = x
      this.first = ''
      this.scnd = ''
    })
  }
  resetForm() {
    this.Data = null
    this.first = ''
    this.scnd = ''
  }
}
