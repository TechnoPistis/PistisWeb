import { Component, OnInit, ViewChild } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { RegistervenderService } from "./registervender.service";
import { ToastrService } from "ngx-toastr";
import { GlobalErrorHandlerService } from "src/app/shared/services/global-error-handler-service.service";
import { ReadVarExpr } from "@angular/compiler";
import {
  DropzoneModule,
  DropzoneConfig,
  DropzoneComponent
} from "ngx-dropzone-wrapper";
import { VendorsService } from "../../../../modules/admin/vendorlist/vendors.service";
import { NgForm, FormControl, FormGroup } from "@angular/forms";
import { Vendor } from "src/app/modules/admin/vendoradd/vendor";
import { startWith, map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: "app-registervendor",
  templateUrl: "./registervendor.component.html",
  styleUrls: ["./registervendor.component.css"]
})
export class RegistervendorComponent implements OnInit {
  options: any;
  selectedState: any;
  constructor(
    private Router: Router,
    public service: VendorsService,
    public vendorService: VendorsService,
    private toaster: ToastrService,
    private error: GlobalErrorHandlerService
  ) {}

  Countries = [];
  States :string[]=[];
  SelectedLogo: File = null;
  SelectedProof: File = null;
  ImageUrl: string = "/assets/img/icon-logo.png";
  ProofUrl: string = "assets/img/icon-document.png";
  Image: any;
  IdProof: any;
  FormData: Vendor;
  myControl = new FormControl();
  filteredOptions: Observable<string[]>;
  ngOnInit() {
     
    this.resetForm();
    this.FormData = this.vendorService.formData;
    this.vendorService.GetCascadingCountries().subscribe(data => {
       
      var result = [];
      result.push(data);
      this.Countries = result[0];
    });
    this.getAllStates();
  }

  resetForm(form?: NgForm) {
    if (form != null) form.resetForm();
    this.vendorService.formData = {
      Id: 0,
      Password: "",
      Company: "",
      Address: "",
      City: "",
      CountryId: 0,
      DOB: null,
      DisplayName: "",
      Email: "",
      FacebookId: "",
      FirstName: "",
      GenderId: null,
      LanguageId: null,
      LastName: "",
      Phone: null,
      PostalCode: null,
      StateId: 0,
      State:"",
      TwitterId: "",
      UserName: "",
      MiddleName: "",
      Image: "",
      Logo: "",
      IdProof: "",
      ConfirmPassword: "",
      RFC:"",
    };
  }

  @ViewChild(DropzoneComponent,{static:false})
  componentRef?: DropzoneComponent;

  // onChangeCountry(countryId: number) {  
  //   this.vendorService.GetStates(countryId).subscribe(data => {
  //      
  //     var result = [];
  //     result.push(data);
  //     this.States = result[0];
  //   });
  // }

  getAllStates(){
    this.vendorService.GetStates().subscribe(data => {
           
          var result = [];
          result.push(data);
          this.States =[]
          result[0].forEach(s => {
            this.States.push(s.Name)
          });
          this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );
        });
  }
  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.States.filter(option => option.toLowerCase().includes(filterValue));
  }
  getSelectedState(state)
  {
    this.selectedState=state;
  }
  onSelectFile(event) {
    this.SelectedLogo = event.target.files[0];

    var reader = new FileReader();
    this.Image = reader.readAsDataURL(this.SelectedLogo);
     
    reader.onload = (data: any) => {
      this.ImageUrl = data.target.result;
       
    };
    reader.readAsDataURL(this.SelectedLogo);
     
  }

  onSelectId(event) {
     
    this.SelectedProof = event.target.files[0];

    var reader = new FileReader();

    reader.onload = (data: any) => {
      this.ProofUrl = data.target.result;
    };

    reader.readAsDataURL(this.SelectedProof);
  }
  
  onSubmit(form: NgForm) {
    if (this.ImageUrl == "/assets/img/icon-logo.png") {
      form.value.Logo = null;
    } else form.value.Logo = this.ImageUrl;
    if (this.ProofUrl == (null || "assets/img/icon-document.png")) {
       
      this.toaster.error("ID Proof", "Please upload");
      return false;
    } else {
      form.value.IdProof = this.ProofUrl;
       
      if (form.value.Password !== form.value.ConfirmPassword) {
        this.toaster.error("Password doesnt match", "Confirm password");
        return false;
      }
      if(this.selectedState!="")
      {
        form.value.state=this.selectedState;
      }
      
      this.vendorService.saveVendor(form.value).subscribe((res:any) => {
        if(res.ReturnCode==0){
        this.toaster.info("Successful!", "Registeration");
        this.resetForm();
        this.Router.navigate(["/UserLogin"]);
        }
        else{
          var lang = localStorage.getItem('browseLang')
          if(lang == 'english'){
            this.toaster.error(res.ReturnMessage,"Registered Vendor");
          }else{
            this.toaster.error(res.ReturnMessage,"Vendedor registrado");
          }
          
        }
      });
    }
  }
}
