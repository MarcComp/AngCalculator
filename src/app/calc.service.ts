import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { Injectable, OnInit } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class CalcService {

  // Put Subject Here
  public mySubject: Subject<string>;

  // PUT YOUR INSTANCE VARIABLES HERE FIRST!!!!
  // Initial Setup
  public mainNum:number = 0;
  public mainNumStr:string = this.mainNum.toString();
  // Calculator Width / Precision constraints
  // Static: belongs to the class itself and not instances
  public static readonly maxDigits = 12;

  // storing temporary calculation numbers
  temp1:number = 0;
  temp2:number = 0;
  tempAdd:number = 0;
  tempMinus:number = 0;
  tempMultiply:number = 0;
  tempDivide:number = 0;
  tempExp:number = 0;
  tempPercent:number = 0;

  operator1:string = "?";
  startOfChain:boolean = true;
  tempArray: string[] = [];




  // This runs first!
  constructor() {
    // Emits a string
    /* An EventEmitter, extends Subject. When you use next, you fire off an event that all subscribers will listen too. See here. emit is the preferred alternative. */
    this.mySubject = new Subject<string>();
    // Need to assign in constructor
    this.setMainNumStr("0");
  }

  // Setter
  setMainNumStr(newValue: string):void {
    // Set actual variable in the Service
    this.mainNumStr = newValue;
    // IMPORTANT !!!
    // The .next() method is used to send messages to an observable which are then sent to all Angular components that are subscribers (a.k.a. observers) of that observable
    this.mySubject.next(newValue);
  }

  // Getter
  getMainNumStr(): Observable<string> {
    // Return as an Observable
    return this.mySubject.asObservable();
  }

  // Test method
  clearScreen(): void {
    // Have to use getters and setters
    this.mainNum = 0;
    this.stringifyNum();
    this.temp1 = 0;
    this.temp2 = 0;
    this.tempAdd = 0;
    this.tempMinus = 0;
    this.tempMultiply = 0;
    this.tempDivide = 0;
    this.tempExp = 0;
    this.tempPercent = 0;
    this.startOfChain = true;
    this.operator1 = "?"
  }

  mySecondTest(): void {
    // Have to use getters and setters
    this.setMainNumStr(this.mainNumStr + "1");
  }

  // A Lifecycle Hook
  ngOnInit() {
    this.setMainNumStr("0");
  }

  public stringifyNum():void {
    this.setMainNumStr(this.mainNum.toString());

    if (this.mainNumStr.length > CalcService.maxDigits) {
      this.setMainNumStr(this.mainNumStr.substring(0,CalcService.maxDigits));
    }
  }

  public numifyString():void {
    if ( parseFloat(this.mainNumStr) == Math.round(parseFloat(this.mainNumStr) ) ) {
      this.mainNum = parseInt(this.mainNumStr, 10);
    }
    else {
      this.mainNum = parseFloat(this.mainNumStr);
    }
  }

  public addDigitToScreen(digit:string) {
    // If just a zero on screen
    if (this.mainNumStr.length == 12) return;
    if (this.mainNumStr == "0" && digit != ".") {
      this.setMainNumStr(digit);
    }
    // Prevents extra decimals from being added
    else {
      if (digit == "." && this.mainNumStr.indexOf(".") != -1) return;
      this.setMainNumStr(this.mainNumStr + digit);
      if (digit != '.') {
        //numifyString();
        //stringifyNum();
      }
    }
  }

  public removeDigitToScreen() {
    if (this.mainNumStr == "0") return;
    if (this.mainNumStr.length == 1) {
      this.mainNum = 0;
      this.stringifyNum();
    }
    else {
      // Removes last digit from string
      this.setMainNumStr(this.mainNumStr.slice(0, -1));
      this.numifyString();
    }
  }

  private receiveInput() {
    this.numifyString();
    return this.mainNum;
  }

  public tryAddition(): void {
    this.operator1 = "+";
    this.tempAdd = this.receiveInput();
    if (this.startOfChain == true) {
      this.temp1 = this.tempAdd;
      this.startOfChain = false;
    }
    else {
      this.temp1 += this.tempAdd;
    }
    // reset
    this.mainNum = 0;
    this.stringifyNum();
  }

  public trySubtraction(): void {
    this.operator1 = "-";
    this.tempMinus = this.receiveInput();
    if (this.startOfChain == true) {
      this.temp1 = this.tempMinus;
      this.startOfChain = false;
    }
    else {
      this.temp1 -= this.tempMinus;
    }
    // reset
    this.mainNum = 0;
    this.stringifyNum();
  }

  public tryMultiply(): void {
    this.operator1 = "*";
    this.tempMultiply = this.receiveInput();
    if (this.startOfChain == true) {
      this.temp1 = this.tempMultiply;
      this.startOfChain = false;
    }
    else {
      this.temp1 *= this.tempMultiply;
    }
    // reset
    this.mainNum = 0;
    this.stringifyNum();
  }

  public tryDivide(): void {
    this.operator1 = "/";
    this.tempDivide = this.receiveInput();
    if (this.startOfChain == true) {
      this.temp1 = this.tempDivide;
      this.startOfChain = false;
    }
    else {
      this.temp1 /= this.tempDivide;
    }
    // reset
    this.mainNum = 0;
    this.stringifyNum();
  }

  public tryExp(): void {
    this.operator1 = "**";
    this.tempExp = this.receiveInput();
    if (this.startOfChain == true) {
      this.temp1 = this.tempExp;
      this.startOfChain = false;
    }
    else {
      this.temp1 = this.temp1 ** this.tempExp;
    }
    // reset
    this.mainNum = 0;
    this.stringifyNum();
  }

  public tryPercent(): void {
    console.log(this.temp1);
    if (this.operator1 != "/") return;
    this.operator1 = "%"
    this.tempPercent = this.receiveInput();
    if (this.startOfChain == true) {
      this.temp1 = this.tempPercent;
      this.startOfChain = false;
    }
    else {
      this.numifyString();
      this.mainNum = (this.temp1 / this.tempPercent) * 100;
      this.stringifyNum();
    }

    // reset
    this.temp1 = 0;
    this.temp2 = 0;
    this.tempPercent = 0;
  }

  public evalExpression(): void {
    if (this.operator1 == "+") {
      this.tempAdd = this.receiveInput();
      this.temp1 += this.tempAdd;
    }
    else if (this.operator1 == "-") {
      this.tempMinus = this.receiveInput();
      this.temp1 -= this.tempMinus;
    }
    else if (this.operator1 == "*") {
      this.tempMultiply = this.receiveInput();
      this.temp1 *= this.tempMultiply;
    }
    else if (this.operator1 == "/") {
      this.tempDivide = this.receiveInput();
      this.temp1 /= this.tempDivide;
    }
    else if (this.operator1 == "**") {
      this.tempExp = this.receiveInput();
      this.temp1 = this.temp1 ** this.tempExp;
    }

    // Change screen
    this.mainNum = this.temp1;
    this.stringifyNum();
    // Reset temps
    this.temp1 = 0;
    this.temp2 = 0;
    // Reset Start of chain
    this.startOfChain = true;
  }


  public flipNumber() {
    if (this.mainNumStr == "0" ||  this.mainNumStr == "0.") return;
    if (this.mainNumStr.charAt(0) == "-") {
      this.setMainNumStr(this.mainNumStr.substring(1,CalcService.maxDigits));
    }
    else {
      this.setMainNumStr("-" + this.mainNumStr);
    }
  }

  public turnOff() {
    this.setMainNumStr("");
  }

  public trySqrt() {
    if (this.mainNumStr.charAt(0) == "-") {
      this.setMainNumStr("E");
    }
    else {
      this.numifyString();
      this.mainNum = Math.sqrt(this.mainNum);
      this.stringifyNum();
    }
  }




}

