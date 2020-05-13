import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-terms',
  templateUrl: './terms.component.html',
  styleUrls: ['./terms.component.css']
})
export class TermsComponent implements OnInit {
englishlang=true
  constructor() { }

  ngOnInit() {
    var lang = localStorage.getItem("browseLang");
      if (lang == "english") {
        this.englishlang=true
      } else {
        this.englishlang=false

      }
  }

}
