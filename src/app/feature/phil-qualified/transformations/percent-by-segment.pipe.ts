import { Pipe, PipeTransform } from '@angular/core';
import { WardRow } from '../data/model/WardRow.interface';

@Pipe({
  name: 'percentBySegment',
  standalone: true,
  pure: true,
})
export class PqvPercentBySegmentPipe implements PipeTransform {
  transform(wardTable: WardRow[], segment: string): number {
    const fieldPercent = this.getSegmentPercent(wardTable, segment);
    return fieldPercent;
  }
  getSegmentPercent(originalWardTable: WardRow[], fieldName: string): number {
    let sumTotal = 0;
    let fieldTotal = 0;

    originalWardTable.forEach((originalWardRow) => {
      const fieldValue = originalWardRow[fieldName as keyof WardRow];
      sumTotal = sumTotal + originalWardRow['total'];
      fieldTotal = fieldTotal + fieldValue;
    });
    
    const percent = parseFloat(((fieldTotal / sumTotal) * 100).toFixed(2)) ;
    return percent;
  }
}
