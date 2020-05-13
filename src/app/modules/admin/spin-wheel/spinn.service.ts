import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonService } from "../../../shared/services/common.service";

@Injectable({
  providedIn: 'root'
})

export class spinnService {
  constructor( private http: HttpClient) { }
  data = new CommonService();
  baseuri = this.data.getUri();
  getMood() {
    return this.http.get(this.baseuri + 'Spinner/getMoods');
  }
  updateSpinnerOptions(model:any) {
    return this.http.post(this.baseuri + 'Spinner/updateSpinnerOptions',model);
  }
  SaveSpinnerOptions(model:any) {
    return this.http.post(this.baseuri + 'Spinner/SaveSpinnerOptions',model);
  }
  DeleteSpinnerOption(Id:any ) {
    return this.http.get(this.baseuri + 'Spinner/DeleteSpinnerOption?Id='+Id);
  }
  EditSpinnerOption(Id:any){
    return this.http.get(this.baseuri + 'Spinner/DeleteSpinnerOption?Id='+Id);
  }
  getSpinnerOptions(){
    return this.http.get(this.baseuri+'Spinner/SpinnerOptions')
  }
  deletespinnerOptionDuration(Id:any){
    return this.http.get(this.baseuri + 'Spinner/deleteSpinnerDurationOption?Id='+Id);

  }
  SaveSpinnerOptionsDuration(model:any){
    return this.http.post(this.baseuri+'Spinner/SaveSpinnerOptionsDuration',model)
  }
  getSpinnerDurations(){
    return this.http.get(this.baseuri+'Spinner/getSpinnerDurations')

  }
  checkSpinnerOption(Id:any){
    return this.http.get(this.baseuri + 'Spinner/checkSpinnerOption?Id='+Id);

  }
  getSpinnerOptiondetails(Id:any){
    return this.http.get(this.baseuri + 'Spinner/getSpinnerOptionDetails?Id='+Id);

  }
  getSpinnerReport(){
    return this.http.get(this.baseuri + 'Spinner/getSpinnerReport');
  }
  getSpinnerFilter(filter:string){
    return this.http.get(this.baseuri + 'Spinner/getSpinnerReportFilter?filter='+filter);

  }
  getspinnerCounts(){
    return this.http.get(this.baseuri + 'Spinner/Countresults');

  }
  
}
