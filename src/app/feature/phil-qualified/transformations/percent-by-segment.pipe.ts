import { Pipe, PipeTransform } from '@angular/core';
import { WardRow } from '../data/model/WardRow.interface';

@Pipe({
  name: 'totalsBySegment',
  standalone: true,
  pure: true,
})
export class PqvTotalsBySegmentPipe implements PipeTransform {
  transform(wardTable: WardRow[], segment: string): any {
    const fieldInfo = this.getSegmentPercent(wardTable, segment);
    return fieldInfo;
  }
  getSegmentPercent(originalWardTable: WardRow[], fieldName: string): any {
    let sumTotal = 0;
    let fieldTotal = 0;

    originalWardTable.forEach((originalWardRow) => {
      const fieldValue = originalWardRow[fieldName as keyof WardRow];
      sumTotal = sumTotal + originalWardRow['total'];
      fieldTotal = fieldTotal + fieldValue;
    });

    const percent = parseFloat(((fieldTotal / sumTotal) * 100).toFixed(2)) ;
    return {
      percent,
      count:fieldTotal
    };
  }
}
