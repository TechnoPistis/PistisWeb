import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { spinnService } from '../spinn.service';
import { SpinnerOptions } from './spinner-options';

@Component({
  selector: 'app-spinner-options-period',
  templateUrl: './spinner-options-period.component.html',
  styleUrls: ['./spinner-options-period.component.css']
})
export class SpinnerOptionsPeriodComponent implements OnInit {
  addForm: FormGroup;
  spinnerOptions: any;
  spinner: any;
  constructor(private toastr: ToastrService,
    public _spinService:spinnService,
    ) { }

  ngOnInit() {
    
    this.addForm = this.createFormGroup();
    this.getSpinnerOptions()
    this.getspinneroptionsDuration()
  }
  createFormGroup() {
    return new FormGroup({
      Id: new FormControl(''),
      DescriptionId: new FormControl('', [Validators.required]),
     PeriodId: new FormControl('', [Validators.required]),
      Chances: new FormControl('', [Validators.required]),
     
    });
  }
  checkOptionDuration(id:any){
      
    this._spinService.checkSpinnerOption(id).subscribe(x=>{
    if(x==1){
      this.toastr.success("Chances already added for this option")

    }
    })
  }
getSpinnerOptions(){
  this._spinService.getSpinnerOptions().subscribe(x=>{
    this.spinnerOptions=x as []
  })

}
getspinneroptionsDuration(){
  this._spinService.getSpinnerDurations().subscribe(x=>{
    this.spinner=x as []
  })
}
  onSubmit(event: any) {
      
    if (!this.addForm.valid) {
      this.toastr.clear();
      this.toastr.error('Fill the form first !');
      return false;
    }
  let  formValues=this.addForm.value
var model= new SpinnerOptions()
model.Chances=formValues.Chances
if(formValues.PeriodId==1)
model.Period='Day'
else if(formValues.PeriodId==2)
model.Period='Month'
else if(formValues.PeriodId==3)
model.Period='Year'

model.SpinnerPromotionId=formValues.DescriptionId
this._spinService.SaveSpinnerOptionsDuration(model).subscribe(x=>{
  this.toastr.success("Saved successfully.")
  this.createFormGroup()
  
  this.addForm.reset()
  this.getspinneroptionsDuration()
})

  }
  delete(id:any){
    this._spinService.deletespinnerOptionDuration(id).subscribe(x=>{
      if(x==1){
        this.toastr.success("Deleted successfully.")
        this.getspinneroptionsDuration()
      }
    })
  }
}
