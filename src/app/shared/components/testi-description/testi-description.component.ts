import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-testi-description',
  templateUrl: './testi-description.component.html',
  styleUrls: ['./testi-description.component.css']
})
export class TestiDescriptionComponent implements OnInit {
  @Input() listPost:any='';
  constructor() { }

  ngOnInit() {
  }

}
