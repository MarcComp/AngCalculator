import { Component, Input, Output, OnInit, EventEmitter, Injectable } from '@angular/core';
import { ScreenNumComponent } from '../screen-num/screen-num.component';
import { CalcService } from '../calc.service';

@Component({
  selector: 'calc-button',
  templateUrl: './calc-button.component.html',
  styleUrls: ['./calc-button.component.css']
})

export class CalcButtonComponent implements OnInit {
  @Input() buttonConfig: any;
  @Input() dtext:string = "";
  // You have to use the @Output decorator to emit some event (from child to parent)
  // DOn't technically need event evitter

  @Output() buttonClicked: EventEmitter<any> = new EventEmitter<any>();

  constructor(public calc: CalcService) { }

  ngOnInit() {
    // ...
  }

  /*
  onClickButton(event:any) {

    this.buttonClicked.emit(event);

  }*/

  ngClick() {
    this.calc.getMainNumStr().subscribe((result) => {
      console.log(result);
    });
  }

}
