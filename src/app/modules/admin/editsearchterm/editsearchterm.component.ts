import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Service } from '../sub-category/service';
import { SearchTermService } from '../../../shared/components/searchterm/search-term.service';
import { Searchtermmodel } from 'src/app/shared/components/searchterm/searchtermmodel';
import { NgModel } from '@angular/forms';

@Component({
  selector: 'app-editsearchterm',
  templateUrl: './editsearchterm.component.html',
  styleUrls: ['./editsearchterm.component.css']
})
export class EditsearchtermComponent implements OnInit {
  id: any;
  data: any;
  err: boolean;
  model: Searchtermmodel;

  constructor(private route:ActivatedRoute,public service:SearchTermService,private router:Router) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.id= params['Id'];
      this.service.getbById(this.id).subscribe(data=>{
        
        this.data=data;
      })
    })
  }
  update(e)
  {
    if(!this.data.Name){
      this.err=true;
    }
    else{
      this.model=new Searchtermmodel();
     this.model.Name=this.data.Name
     this.model.IsDisplay=this.data.IsDisplay
     this.model.Id=this.id;
      this.service.update(this.model).subscribe(data=>{
      this.router.navigate(['/admin/searchterm'])
      })
    }
  }
  removeerr(){
    this.err=false;
  }
}