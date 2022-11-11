import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PqvPhilQualifiedComponent } from './feature/phil-qualified/phil-qualified.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    PqvPhilQualifiedComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
