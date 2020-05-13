import { Component, OnInit } from '@angular/core';
import { GroupsService } from "./groups.service";
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { Groups } from "./groups";
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-manage-customer-groups',
  templateUrl: './manage-customer-groups.component.html',
  styleUrls: ['./manage-customer-groups.component.css']
})
export class ManageCustomerGroupsComponent implements OnInit {
  public dataList: Groups[];
  selectedVal: string;
  Activate:boolean
    
id:number;
  list: any;
  constructor(private srevice: GroupsService, private toastr: ToastrService
    , private Router: Router,private route: ActivatedRoute) { }

  ngOnInit() {
    this.resetForm();
    this.srevice.getGroups().toPromise().then(data => {
      ;
      this.dataList = data as Groups[];
      console.log(this.dataList)

    }
    );
    this.route.queryParams.subscribe(params => {
      this.id = params['GroupId'];
      console.log(this.id)
      this.srevice.usersInGroup(this.id ).subscribe(res=>this.list=res as Groups[])
// this.populateForm(this.list)
    })
  }
  populateForm(cat:  Groups) {
  //  alert(JSON.stringify(cat));
    
    this.srevice.formData = Object.assign({}, cat);
    
  }
  onChange(id:number){
    this.srevice.usersInGroup(id ).subscribe(res=>this.list=res as Groups[])
  }
  onDelete(userId:number,groupId){
   // alert(userId +''+ groupId)
    this.srevice.delete(userId,groupId).subscribe(res=>
      this.srevice.usersInGroup(this.id ).subscribe(res=>this.list=res as Groups[])
    )
  }
  
  manageUsers(id:number){

    
  }
  //reset
  resetForm(form?: NgForm) {
    if (form != null)
      form.resetForm();
      this.srevice.formData={
        GroupId:0,
      GroupName:'',
       UserId:0,
       FirstName:""
      }
  }
}
