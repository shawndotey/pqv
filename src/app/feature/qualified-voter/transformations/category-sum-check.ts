import { Pipe, PipeTransform } from '@angular/core';
import { WardRow, WardRowSumCheck } from '../model/interface/WardRow.interfaces';
import { wardPrimaryCategories } from '../model/wardPrimaryCategories.model';

/**
 * Traverses each segment and compares the total provided against the 
    Total calculated per category
@Param WardDataTable
@Returns SegmentInfo
 */
@Pipe({
  name: 'categorySumCheck',
  standalone: true, 
  pure: true
})
export class PqvCategorySumCheckPipe implements PipeTransform {
  transform(wardTable: WardRow[]): WardRowSumCheck[] {
    const totals = this.doSumCheck(wardTable);
    return totals;
  }
  //calculate the differnce in any category not adding to the provided total
  doSumCheck(originalWardTable: WardRow[]): WardRowSumCheck[] {
    const tableResult: WardRowSumCheck[] = [];
    //traverse table rows
    originalWardTable.forEach((orignalWardRow) => {
      const wardRowResult = {
        'dem': 0,
        'rep': 0,
        'other_party': 0,
        'total': 0,
        'white': 0,
        'black': 0,
        'hispanic': 0,
        'other_race': 0,
        'male': 0,
        'female': 0,
        'unknown_sex': 0,
        'race-delta': 0,
        'gender-delta': 0,
        'party-delta': 0,
        'race-sumcheck': 0,
        'gender-sumcheck': 0,
        'party-sumcheck': 0,
      } as any;

      const originalTotal = orignalWardRow['total'];
      const ward = orignalWardRow['ward'];
      //gather by category
      for (const categoryName in wardPrimaryCategories) {
        const fields = wardPrimaryCategories[categoryName].fields;
        //traverse field columns by category 
        let sumCheckTotal = 0;
        fields.forEach((fieldName) => {
          const fieldValue:number = orignalWardRow[fieldName as keyof WardRow];
          sumCheckTotal = sumCheckTotal + fieldValue;
          wardRowResult[fieldName] = fieldValue;
        });
        wardRowResult['total'] = originalTotal;
        wardRowResult['ward'] = ward;
        wardRowResult[categoryName + '-sumcheck'] = sumCheckTotal;
       
        wardRowResult[categoryName + '-delta'] = originalTotal - sumCheckTotal;
      }
      tableResult.push(wardRowResult);
    });

    return tableResult;
  }
}
