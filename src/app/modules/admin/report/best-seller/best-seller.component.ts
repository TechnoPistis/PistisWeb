import { Component, OnInit } from '@angular/core';
import { ReportService } from '../report.service';

@Component({
  selector: 'app-best-seller',
  templateUrl: './best-seller.component.html',
  styleUrls: ['./best-seller.component.css']
})
export class BestSellerComponent implements OnInit {

  constructor(private _service: ReportService) { }

  BestSellers: any[] = [];
  ProductCategories: any[] = [];
  VendorsList: any[]=[];
  VendorId = null;
  CategoryId = null;

  ngOnInit() {
    this.GetBestSellerData();
    this.GetCategory();
    this.GetVendorList();
  }

  GetBestSellerData() {
    var model = {
      VendorId: this.VendorId,
      CategoryId: this.CategoryId
    }

    this._service.BestSeller(model).subscribe((response: any[]) => {
      this.BestSellers = response;
    });

  }

  GetVendorList()
  {
    this._service.GetVendors().subscribe((response: any[])=>{
        
      this.VendorsList = response;
    });
  }

  GetCategory() {
    this._service.getSubcategories().subscribe((response: any[]) => {
        
      this.ProductCategories = response;
    },
      Error => {
          
      }
    );
  }

  DeleteBestSeller(id: number) {
    this._service.DeleteBestSeller(id).subscribe((response:any)=>{
      
    });
  }



}
