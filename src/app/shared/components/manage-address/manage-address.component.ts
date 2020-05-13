import { Component, OnInit } from "@angular/core";
import { shippingModel } from "./shippingModel";
import { shippingervice } from "./shipping.service";
import { Router } from "@angular/router";
import { FormGroup, FormControl, Validators, AbstractControl } from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import { CheckoutserviceService } from '../checkout/checkoutservice.service';

@Component({
  selector: "app-manage-address",
  templateUrl: "./manage-address.component.html",
  styleUrls: ["./manage-address.component.css"]
})
export class ManageAddressComponent implements OnInit {
  hidemainDiv: boolean = false;
  IsExists: boolean = false;
  constructor(
    public _service: shippingervice,
    public _router: Router,
    public _toastr: ToastrService,
    private Router: Router,
    public service: CheckoutserviceService,
  ) {}
  UserName: any;
  UserId: number;
  IpAddress: any;
  UserAddress: shippingModel[] = [];
  Address: shippingModel;
  shippingRegisterForm: any;
  NewAddress: boolean;
  IsEdit: boolean;
  Countries: any[] = [];
  States: any[] = [];

  ngOnInit() {
      
    this.UserId = parseInt(window.localStorage.getItem("UserId"));
    const UserId = localStorage.getItem("UserId");
    if (UserId == undefined || UserId == null) {
      this.hidemainDiv = false;
    } else {
      this.hidemainDiv = true;
    }
    this.UserName = localStorage.getItem("UserName");
    this.IsEdit = false;
    this.NewAddress = false;
    this.UserId = parseInt(window.localStorage.getItem("UserId"));
    this.IpAddress = window.localStorage.getItem("IpAddress");
    this.getCountries();
    if (this.UserId || this.IpAddress) 
    this.checkForUserAddress();
    this.shippingRegisterForm = this.createRegisterFormGroup  ();
  }
   //AddressRegister
   createRegisterFormGroup() {
    return new FormGroup(
      {
        Id: new FormControl(""),
        Name: new FormControl("", [Validators.required]),
        UserId: new FormControl(""),
        IpAddress: new FormControl(""),
       // Address: new FormControl("", [Validators.required]),
        PhoneNo: new FormControl("", [
          Validators.required,
          Validators.pattern("^[0-9]*$")
        ]),
        Pincode: new FormControl("", [Validators.required]),
        City: new FormControl(""),
        StateName: new FormControl("", [Validators.required]),
        LandMark: new FormControl(""),
        //CountryId: new FormControl('', [Validators.required]),
        AddressType: new FormControl("", [Validators.required]),
       // AlternatePhoneNo: new FormControl("", [Validators.pattern("^[0-9]*$")]),
     //   Email: new FormControl("", [Validators.required, Validators.email]),
        Password: new FormControl("", [
        
          Validators.minLength(6)
        ]),
        ConfirmPassword: new FormControl(""),
       // asBillAddress: new FormControl(""),
        Street: new FormControl("", [Validators.required]),
        Street1: new FormControl(""),
        Street2: new FormControl(""),
        InteriorNumber: new FormControl(""),
        OutsideNumber: new FormControl(""),
        Colony: new FormControl("")
      },
      this.passwordConfirming
    );
  }

  passwordConfirming(c: AbstractControl): { invalid: boolean } {
    if (c.get("Password").value !== c.get("ConfirmPassword").value) {
      return { invalid: true };
    }
  }

  withoutNumber: any = false;
  WithoutNum(target) {
     
    if (target.checked) this.withoutNumber = true;
    else this.withoutNumber = false;
  }
  logout() {
    localStorage.removeItem("UserName");
    localStorage.removeItem("UserId");
    this.Router.navigate(["/customer/UserLogin"]);
  }
  getCountries() {
    this._service.getCountry().subscribe((data: any[]) => {
       
      this.Countries = [];
      this.Countries = data;
      console.log(data);
    });
  }

  getState(value: any) {
    this._service.getState(value).subscribe((data: any[]) => {
       
      this.States = [];
      this.States = data;
      console.log(data);
    });
  }

  createFormGroup() {
    return new FormGroup({
      Id: new FormControl(""),
      Name: new FormControl("", [Validators.required]),
      UserId: new FormControl(""),
      IpAddress: new FormControl(""),
      Address: new FormControl("", [Validators.required]),
      PhoneNo: new FormControl("", [
        Validators.required,
        Validators.pattern("^[0-9]*$")
      ]),
      Pincode: new FormControl("", [Validators.required]),
      City: new FormControl(""),
      StateName: new FormControl("", [Validators.required]),
      LandMark: new FormControl(""),
      CountryId: new FormControl("", [Validators.required]),
      AddressType: new FormControl("", [Validators.required]),
      AlternatePhoneNo: new FormControl("", [Validators.pattern("^[0-9]*$")])
    });
  }

  FillAddress() {
     
    this.NewAddress = true;
    this.IsEdit = false;
  }

  checkForUserAddress() {
     
    this.UserId=+localStorage.getItem("UserId")
    this._service
      .getUserAddress(this.UserId, this.IpAddress)
      .subscribe((result: shippingModel[]) => {
         
        if (result) {
          
          this.UserAddress = [];
          this.UserAddress = result;
        }
      });
  }
  
  CheckEmail(email) {
    this.service.checkemail(email).subscribe(data => {
      if (data) {
        var lang = localStorage.getItem("browseLang");
        if (lang == "english") {
          this._toastr.error("this email already exists");
        } else {
          this._toastr.error("Ya existe Este email");
        }

        this.IsExists = true;
        this.shippingRegisterForm.valid = false;
      } else {
        this.IsExists = false;
      }
    });
  }
  onSubmitShippingRegister() {
     
    var model = this.shippingRegisterForm.value;
   // this.CheckEmail(model.Email);
    if (!this.shippingRegisterForm.valid) {
      var lang = localStorage.getItem("browseLang");
      if (lang == "english") {
        this._toastr.error("Fill All required Fields!");
      } else {
        this._toastr.error("Rellene todos los campos obligatorios!");
      }

      return false;
    }
    var model = this.shippingRegisterForm.value;
   // this.CheckEmail(model.Email);
    model.UserId =+localStorage.getItem("UserId")
    model.IpAddress = this.IpAddress;
    if(model.Id==""){
      model.Id=0
    }
    //Register
    var body = {
      FirstName: model.Name.split("")[0],
      //MiddleName:model.Name.split('')[1],
      LastName: model.Name.split("")[1],
      Email: model.Email,
      Phone: model.Phone,
      Password: model.Password
    };
    this._service.addShipAddress1(model).subscribe((data: any) => {
       if(data==1){
         this._toastr.success('Address saved successfully.')
         this.NewAddress=false
          this.checkForUserAddress();
       }else{
        this._toastr.success('Address updated successfully.')
        this.NewAddress=false
         this.checkForUserAddress();
       }
    });

  
  }
  c

  onSubmit() {
     
    if (!this.shippingRegisterForm.valid) {
      var lang = localStorage.getItem("browseLang");
      if (lang == "english") {
        this._toastr.error("Fill address correctly!");
      } else {
        this._toastr.error("¡Rellene la dirección correctamente!");
      }

      return false;
    }
    var model = this.shippingRegisterForm.value;
    model.UserId = this.UserId;
    model.IpAddress = this.IpAddress;
    if (this.IsEdit == false) {
      if (!model.Id) model.Id = 0;
      this._service.addShipAddress(model).subscribe((data: any) => {
         
        if (data.Id > 0) {
          var lang = localStorage.getItem("browseLang");
          if (lang == "english") {
            this._toastr.success("Data added successfully!");
          } else {
            this._toastr.success("Dirección agregada con éxito!");
          }

          this.checkForUserAddress();
          this.NewAddress = false;
          this.shippingRegisterForm.reset();
        }
      });
    }
    if (this.IsEdit == true) {
      this._service.updateShipAddress(model).subscribe((data: any) => {
         
        if (data.Id > 0) {
          var lang = localStorage.getItem("browseLang");
          if (lang == "english") {
            this._toastr.success("Address updated successfully!");
          } else {
            this._toastr.success("Dirección actualizada con éxito!");
          }

          this.checkForUserAddress();
          this.NewAddress = false;
          this.shippingRegisterForm.reset();
        }
      });
    }
  }

  openAgain() {
    this.NewAddress = false;
    this.shippingRegisterForm.reset();
  }

  editAddress(value: any) {
  
    this._service.getById(value).subscribe((data: any) => {
       
      if (data) {
        this.Address = data;
      //  if (data.StateId && data.CountryId)
       //  this.getState(data.StateId);
        this.shippingRegisterForm.patchValue(this.Address);
        this.NewAddress = true;
        this.IsEdit = true;
      }
    });
  }

  deleteAddress(value: any) {
     
    this._service.deleteShipAddress(value).subscribe((data: any) => {
       
      if (data) {
        this.checkForUserAddress();
        var lang = localStorage.getItem("browseLang");
        if (lang == "english") {
          this._toastr.success("Address deleted successfully!");
        } else {
          this._toastr.success("Dirección eliminada con éxito!");
        }
      }
    });
  }
}
