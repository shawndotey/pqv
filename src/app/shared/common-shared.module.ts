import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatTableModule} from '@angular/material/table';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatTableModule,
    MatInputModule
  ],
  exports: [
    CommonModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatTableModule,
    MatInputModule
  ]
})
export class PqvCommonSharedModule { }