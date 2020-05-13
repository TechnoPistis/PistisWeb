import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DealsService } from '../deal.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {


  dealsList:any[]=[];

  constructor(
    private _router: Router,
    private toastr: ToastrService,
    public _service:DealsService
  ) { }

  ngOnInit() {
    this.getAllDeals();
    localStorage.removeItem('DealData');
    localStorage.removeItem('SelectedProducts');
    localStorage.removeItem('Add');
localStorage.removeItem('Update');
  }


  getAllDeals() {
    this._service.getAlldeal().subscribe((data: any) => {
        
      this.dealsList = [];
      this.dealsList = data;
    });
  }

  editDeal(id: any) {
    if (id) {
      this._router.navigate(['/admin/deals/edit'], { queryParams: { Id: id } });
    }
  }

  deleteDeal(id: any) {
    if (id) {
      if (confirm('Are you sure want to delete !')) {
        this._service.deleteDeal(id).subscribe((data: any) => {
            
          this.toastr.success('Deleted successfully !');
          this.getAllDeals();
        })
      }
    }
  }
}
