import { Component, OnInit } from '@angular/core';
import { TrackingService } from '../Track.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {
  editForm: any;
  formData: any;
  formDataUser: any;
  formDataBillAddress: any;
  formDataShippingAddress: any;

  constructor(
    private _service: TrackingService,
    private _router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService
  ) { }


  Id: any;

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.Id = +params['Id'] || 0;
    });
    this.editForm = this.createFormGroup();
    if (this.Id && this.Id > 0) {
      this.getData();
    }
  }

  getData() {
    if (+this.Id) {
      this._service.getById(this.Id).subscribe((data: any) => {
          
        if (data && data.TrackOrder) {
          this.formData = data.TrackOrder;
          this.formData.UpdatedDate = this.formData.UpdatedDate.toString();
          this.editForm.patchValue(this.formData);
        }
        if (data && data.UserInfo) {
          this.formDataUser = data.UserInfo;
        }
        if (data && data.BillingInfo) {
          this.formDataBillAddress = data.BillingInfo;
        }
        if (data && data.ShippingInfo) {
          this.formDataShippingAddress = data.ShippingInfo;
        }
      })
    }
  }


  onSubmit(event: any) {
      
    if (!this.editForm.valid) {
      this.toastr.clear();
      this.toastr.error('Fill the form first !');
      return false;
    }
      
    var model = this.editForm.value;
    if (model.TrackId) {
      this._service.updateOrder(model).subscribe((data: any) => {
          
        if (data === true) {
          this.toastr.success('Order updated successfully !');
          this._router.navigate(['/admin/tracking']);
        }
      })
    }
  }

  createFormGroup() {
    return new FormGroup({
      Id: new FormControl(''),
      OrderId: new FormControl(''),
      Status: new FormControl(''),
      UpdatedDate: new FormControl(''),
      TrackId: new FormControl('', [Validators.required]),
    });
  }
}
