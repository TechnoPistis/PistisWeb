import { Component, OnInit } from '@angular/core';
import { DealsService } from '../deal.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.css']
})
export class PreviewComponent implements OnInit {

  constructor(
    private _service: DealsService,
    private _router: Router,
    private toastr: ToastrService
  ) { }

  model: any;
  SelectedProducts: any[] = [];
  ButtonHide: boolean = false;
  DealId;
  ngOnInit() {
      
    this.model = JSON.parse(localStorage.getItem('DealData'));
    this.SelectedProducts = JSON.parse(localStorage.getItem('SelectedProducts'));
    this.DealId = this.SelectedProducts[0].DealId;

    if (localStorage.getItem('Add')) {
      this.ButtonHide = false;
    }
    else {
      this.ButtonHide = true
    }
  }

  onSubmit() {
      
    this.model.DealProduct = [];
    this.SelectedProducts.map(m => {
      this.model.DealProduct.push({ ProductId: m.ProductId, ProductVariantId: m.Id });
      if (m.DealId) {
        this.DealId = m.DealId;
      }
    });

    this._service.addDeal(this.model).subscribe((data: any) => {
      if (data === true)
        this.toastr.success('Deal added successfully !');
      localStorage.removeItem('DealData');
      localStorage.removeItem('SelectedProducts');
      this._router.navigate(['/admin/deals']);
    })
  }

  Update() {
      
    this.model.DealProduct = [];
    this.SelectedProducts.map(m => {
      this.model.DealProduct.push({ ProductId: m.ProductId, ProductVariantId: m.Id });
    });

    this._service.updateDeal(this.model).subscribe((data: any) => {
      if (data === true)
        this.toastr.success('Deal added successfully !');
      localStorage.removeItem('DealData');
      localStorage.removeItem('SelectedProducts');
      this._router.navigate(['/admin/deals']);
    })
  }

  editDeal() {
    this._router.navigate(['/admin/deals/edit'], { queryParams: { Id: this.DealId } });
  }
}
