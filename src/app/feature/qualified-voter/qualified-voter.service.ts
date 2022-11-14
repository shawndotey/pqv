import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { PqvCategorySumCheckPipe } from './transformations/category-sum-check';
import { WardRow, WardRowSumCheck } from './model/interface/WardRow.interfaces';
import { OverviewInfo } from './model/interface/OverviewInfo.interface';
import { WARD_DATA } from './data/WARD_DATA';

@Injectable({
  providedIn: 'root',
})
export class PqvQualifiedVoterService {
  private _wardList$!:BehaviorSubject<WardRow[]>;
  private _overview$!:BehaviorSubject<OverviewInfo>;
  constructor(
    private wardSumCheckPipe: PqvCategorySumCheckPipe,
    @Inject(WARD_DATA) private wardData: any 
  ) { 
    this.initData();
  }

  public initData(){
    this._wardList$ = new BehaviorSubject(this.wardData.rows as WardRow[]);
    this._overview$ = new BehaviorSubject({
      title: 'Philadelphia Qualified Voter Listing 2018'
    });
  }

  public data$(): Observable<WardRow[]>{
    return this._wardList$;
  }

  public dataWithSumCheck$(): Observable<WardRowSumCheck[]>{
    return this.data$().pipe(map(dataTable=> this.wardSumCheckPipe.transform(dataTable)))
  }

  public overview$(): BehaviorSubject<OverviewInfo>{
    return this._overview$;
  } 
}
