import { Component, OnInit, AfterViewChecked, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-paypal',
  templateUrl: './paypal.component.html',
  styleUrls: ['./paypal.component.css']
})
export class PaypalComponent implements OnInit{
  
  spinOnce:number=1
  colors = [
    "#e32129",
    "#eb4225",
    "#f37425",
    "#f8a41e",
    "#fdd10e",
    "#a8c23a",
    "#51a246",
    "#2ea4a4",
    "#2481c4",
    "#3a2462",
    "#662b65",
    "#8e275f",
    
  ];
  //10, 9, 6 ,2

  prizeToWin:any
  prizes = [
    "Gand Prize",
    "10% off",
    "20% off",
    "Iphone X",
    "5% off",
    "Beauty Products",
    "Free shipping",
    "20% off",
    "Spin to win",
    "Iphone X Max",
    "Oops",
    "Almost"
    
  ];

  ngOnInit(): void {
    this.random()

    }
  random(){
    let rand = this.prizes[Math.floor(Math.random() * this.prizes.length)];
      
    if(rand=="Spin to win"){
      rand =  "Almost";
    }
    this.prizeToWin=rand;
  }
 constructor(){}
 beforeSpinFn()  {
     

};

afterSpinFn () {
    
  // alert("after");
};

    
  }


