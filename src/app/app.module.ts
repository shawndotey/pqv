import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PqvQualifiedVoterComponent } from './feature/qualified-voter/qualified-voter.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    PqvQualifiedVoterComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
