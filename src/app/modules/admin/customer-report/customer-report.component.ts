import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { DatePipe } from "@angular/common";
import { CommonService } from 'src/app/shared/services/common.service';
import { HttpClient } from '@angular/common/http';
import { ReportService } from "./report.service";
@Component({
  selector: 'app-customer-report',
  templateUrl: './customer-report.component.html',
  styleUrls: ['./customer-report.component.css']
})
export class CustomerReportComponent implements OnInit {
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
    this.service.getCustomers(first, scnd).subscribe(x => {
      this.Data = x
    })
  }
  moment(val: string) {
    this.service.getCustomersday(val).subscribe(x => {
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
