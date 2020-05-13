import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonService } from '../../services/common.service';
import { ProductService } from '../product-details/product.service';
import { Router } from '@angular/router';
import { TestimonialService } from './testimonial.service';
import { ToastrService } from 'ngx-toastr';
import { UserLogService } from '../../services/user-log.service';

@Component({
  selector: 'app-testimonial',
  templateUrl: './testimonial.component.html',
  styleUrls: ['./testimonial.component.css']
})
export class TestimonialComponent implements OnInit {
  validate: boolean
  Rating: number
  id: any;
  Review = {
    UserId: 0,
    ProductId: 1,
    Review: '',
    Rating: 0
  }
  stars: any
  message: boolean
  DescriptionValidation: boolean = false;
  UserId: number
  rate: number = 0
  description: string = ''
  hidemainDiv: boolean = false;
  UserName: string;
  Url: string;
  data:any;
  constructor(
    private route: ActivatedRoute,
    private _service: TestimonialService,
    private Router: Router,
    private tostr: ToastrService,private userLog:UserLogService
  ) { }


  currentUser: any;

  ngOnInit() {
    this.UserName = localStorage.getItem('UserName')
    const UserId = localStorage.getItem('UserId');
    this.currentUser=UserId;
    if (UserId == undefined || UserId == null) {
      this.hidemainDiv = false
    } else {
      this.hidemainDiv = true
    }
    this.validate = false;
    this.message = false;
    this.Url = this.Router.url;
      this.userLog.UserLog(0, 1, this.Url, 1);
      this.getUsertestimonial();
  }
  getUsertestimonial(){
    this._service.getUserTestimonial().subscribe(x=>{
        
if(x){
  this.data=x
  this.description=this.data.Description
  this.rate=this.data.Rating

}
    })
  }
  logout() {
    localStorage.removeItem('UserName')
    localStorage.removeItem('UserId')
    this.Router.navigate(['/customer/UserLogin'])
  }
  focusFunction() {
      
    if(this.description==""){
    //  this.message = true
      this.DescriptionValidation = true;
      return false;
    }else{
      this.DescriptionValidation = false;

    }
   // if (this.validate == false) {
     // this.message = true
      //this.DescriptionValidation = true;
   // }
  }

  OnSumbmit() {
      
    if(this.description=="" && this.Rating){
      this.message = true
      this.DescriptionValidation = true;
      return false;
    }
    // if (this.validate == false) {
    //   this.message = true
    //   this.DescriptionValidation = true;
    // }
    var model = {
      UserId: +this.currentUser,
      Rating: this.Rating,
      Description: this.description,
    };

    this._service.Add(model).subscribe((response: any) => {
      var lang = localStorage.getItem('browseLang')
      if (lang == 'english') {
        this.tostr.success("Save successfully.");
      } else {
        this.tostr.success("Ahorra exitosamente.");
      }

    });
  }

  getRating(val: number) {
      
    this.Rating = val;
    this.validate = true;
  }

}
