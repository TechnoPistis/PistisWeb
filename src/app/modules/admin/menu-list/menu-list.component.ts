import { Component, OnInit } from '@angular/core';
import { Service } from "../sub-category/service";
import { ListService } from "./list.service";
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
@Component({
  selector: 'app-menu-list',
  templateUrl: './menu-list.component.html',
  styleUrls: ['./menu-list.component.css']
})
export class MenuListComponent implements OnInit {

  list: Service[]
menListData:any={
  subCategoryId:0,
  MenuName:''
}
  public dataList: any = [];
  selectedVal: string;

  count: number = 0; page: number = 1; perPage: number = 10; pagesToShow: number = 10;
  SearchName: any;
  pageSize: any;

  constructor(private srevice: ListService, private toastr: ToastrService
    , private Router: Router) {

  }

  ngOnInit() {
    this.page = 1;
    this.pageSize = 10;
    this.SearchName = "";
    this.getMenuList();
  }

  getMenuList() {
    this.srevice.refreshList(this.page,this.pageSize,this.SearchName).subscribe((res:any) => {
      this.list=res.data;
      console.log(this.list)
      this.count=res.count;
    });
  }
 

  resetForm(form?: NgForm) {
    if (form != null)
      form.resetForm();
    this.srevice.formData


  }
  //delete
  onDelete(id: number) {
    debugger
    if (confirm('Are you sure you want to delete this record?')) {
      this.srevice.deleteMenu(id).subscribe(res => {
        this.getMenuList();
        this.toastr.warning('Deleted successfully');
      });
    }
  }
  onEdit(SubCategoryId: number,menUName:string) {
//    this.menListData ={
//       subCategoryId:0,
//       MenuName:''
//     }
//     this.menListData.subCategoryId=SubCategoryId
// this.menListData.MenuName=menUName
// localStorage.setItem('MenuList',JSON.stringify(this.menListData))
// this.Router.navigate(['/admin/EditmenuList']);
this.Router.navigate(['/admin/EditmenuList'], { queryParams: { Id: SubCategoryId} });
  }

  onMainMenuEdit(catId:number){
  
this.Router.navigate(['/admin/editMainmenu'], { queryParams: { Id: catId} });
  }
  onSubMenuEdit(SubId:number){
      
    this.Router.navigate(['/admin/editSubMainmenu'], { queryParams: { Id: SubId} });
  }
  // onClick() {
  //   this.Router.navigate(['/admin/add_Feature_product']);
  // }

  prevPage() {
    this.page = this.page - 1;
    this.getMenuList();
  }
  nextPage() {
    this.page = this.page + 1;
    this.getMenuList();
  }
  goToPage(event) {
    this.page = event;
    this.getMenuList();
  }

  newPageSize(e) {
    if (e == 0) {
      e = this.count;
    }
    this.perPage = e;
    this.getMenuList();
  }

  search(){
    this.page=1;
    this.getMenuList();
  }
}


