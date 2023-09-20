import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
// NEED TO IMPORT YOUR SERVICE
import { CalcService } from '../calc.service';

@Component({
  selector: 'screen-num',
  templateUrl: './screen-num.component.html',
  styleUrls: ['./screen-num.component.css']
})

export class ScreenNumComponent implements OnInit {
  // local variable
  myTest: any = "";

  private subscription: Subscription = new Subscription;

  // Inject service to constructor
  constructor (public calc: CalcService) {}

  // A Lifecycle Hook
  // Runs every time component is initialized but after constructor is ran
  ngOnInit(): void {
    this.subscription = this.calc.getMainNumStr().subscribe((nextValue:string) => {
      // IMPORTANT! Handle variable changes here
      this.myTest = nextValue;
    });

    // IMPORTANT !!!
    // Need this to call method from the service and to display on screen
    this.calc.setMainNumStr("0");
  }

  // A Lifecycle Hook
  ngOnDestroy() {
    // Unsubscribe to ensure no memory leaks
    this.subscription.unsubscribe();
  }


}
