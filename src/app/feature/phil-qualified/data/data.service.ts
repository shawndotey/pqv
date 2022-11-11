import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import {default as wardData} from './model/qualified_voter_listing_2018_primary_by_ward.json';
import { WardRow } from './model/WardRow.interface';
@Injectable({
  providedIn: 'root'
})
export class PqvDataService {
  private wardList!:BehaviorSubject<WardRow[]>;
  constructor() { 
    this.initData();
  }
  initData(){
    this.wardList = new BehaviorSubject(wardData.rows as any);
  }
  getData$(){
    return this.wardList;
  }
}
