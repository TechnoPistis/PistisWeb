import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Service } from '../sub-category/service';
import { InvoiceService } from './invoice.service';
import { CommonPrintService } from 'src/app/shared/services/commonprint.service';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css']
})
export class InvoiceComponent implements OnInit {
  Id: any;
  order: any;

  constructor(private route:ActivatedRoute,
    private service:InvoiceService,
    private _printService:CommonPrintService) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params=>{
      this.Id=params['orderno'];
    })
    this.getorder(this.Id);
  }
getorder(id)
{
  this.service.getOrderById(id).subscribe(data=>{
    this.order=data;
  })
}

print() {
  var printContent = document.getElementById("PrintDiv").innerHTML;
  var originalContents = document.body.innerHTML;

     document.body.innerHTML = printContent;

     window.print();

     document.body.innerHTML ="";
     window.location.reload();
  //this._printService.print(printContent);
  
}
}
