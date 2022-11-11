import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatInputModule
  ],
  exports: [
    CommonModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatInputModule
  ]
})
export class PqvCommonSharedModule { }