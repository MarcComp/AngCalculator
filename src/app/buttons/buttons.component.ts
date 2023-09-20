import { Component } from '@angular/core';
// NEED TO IMPORT YOUR SERVICE
import { CalcService } from '../calc.service';

@Component({
  selector: 'buttons',
  templateUrl: './buttons.component.html',
  styleUrls: ['./buttons.component.css']
})

export class ButtonsComponent {

  constructor (public calc: CalcService) {}

  // For testing
  /*
  functioncall(event:any) {
    alert("Hello World" + event);
  }
  */
}
