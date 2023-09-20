import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
// Forms Module
import { FormsModule } from '@angular/forms';
// HTTP
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CalcBodyComponent } from './calc-body/calc-body.component';
import { ScreenComponent } from './screen/screen.component';
import { ButtonsComponent } from './buttons/buttons.component';
import { CalcButtonComponent } from './calc-button/calc-button.component';
import { ScreenNumComponent } from './screen-num/screen-num.component';
// Import services
import { CalcService } from './calc.service';
import { HttpService } from './http.service';

import { MyImageComponent } from './my-image/my-image.component';

@NgModule({
  declarations: [
    AppComponent,
    CalcBodyComponent,
    ScreenComponent,
    ButtonsComponent,
    CalcButtonComponent,
    ScreenNumComponent,
    MyImageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    // Need this here
    FormsModule,
    HttpClientModule
  ],
  // Add services to providers array
  providers: [CalcService, HttpService],
  bootstrap: [AppComponent]
})
export class AppModule { }
