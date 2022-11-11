import { Pipe, PipeTransform } from '@angular/core';
import { WardRow } from '../data/model/WardRow.interface';
import { wardPrimaryCategories } from './model/wardPrimaryCategories.model';

@Pipe({
  name: 'wardTotals',
  standalone: true, 
  pure: true
})
export class PqvWardTotalsPipe implements PipeTransform {
  transform(wardTable: WardRow[]): WardRow[] {
    const totals = this.getAllTotals(wardTable);
    console.log('totals', totals);
    return totals;
  }
  getAllTotals(wardTable: WardRow[]): WardRow[] {
    const tableResult: WardRow[] = [];

    //traverse table row
    wardTable.forEach((orignalWardRow) => {
      const wardRowResult = {
        the_geom: undefined,
        the_geom_webmercator: undefined,
        ward: '',
        dem: 0,
        rep: 0,
        other_party: 0,
        total: 0,
        white: 0,
        black: 0,
        hispanic: 0,
        other_race: 0,
        male: 0,
        female: 0,
        unknown_sex: 0,
        'race-delta': 0,
        'gender-delta': 0,
        'party-delta': 0,
        'race-total': 0,
        'gender-total': 0,
        'party-total': 0,
      } as any;

      const originalTotal = orignalWardRow['total'];
      //gather by category
      for (const categoryName in wardPrimaryCategories) {
        const fields = wardPrimaryCategories[categoryName].fields;
        //category column
        let categoryTotal = 0;
        fields.forEach((fieldName) => {
          const fieldValue = orignalWardRow[fieldName as keyof WardRow];
          categoryTotal = categoryTotal + fieldValue;
          wardRowResult[fieldName] = fieldValue;
        });
        wardRowResult['total'] = originalTotal;
        wardRowResult[categoryName + '-total'] = categoryTotal;
        //race does not seem to have the correct totals
        //show the differnce in any category not adding to the total
        wardRowResult[categoryName + '-delta'] = originalTotal - categoryTotal;
        
      }
      tableResult.push(wardRowResult);
    });

    return tableResult;
  }
}
