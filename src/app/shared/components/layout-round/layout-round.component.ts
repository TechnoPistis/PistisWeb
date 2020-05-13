import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-layout-round',
  templateUrl: './layout-round.component.html',
  styleUrls: ['./layout-round.component.css']
})
export class LayoutRoundComponent implements OnInit {
  @Input() list: any;
  constructor() { }

  ngOnInit() {
  }
 
}
