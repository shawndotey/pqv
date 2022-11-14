import { Pipe, PipeTransform } from '@angular/core';
import { WardRow } from '../model/interface/WardRow.interfaces';
import { SegmentInfo } from '../model/interface/SegmentInfo.interface';

/**
 * Traverses a specified segment and returns segment totals
@Param WardDataTable - Ward table
@Param fieldName - Field Name
@Returns SegmentInfo
 */
@Pipe({
  name: 'totalsBySegment',
  standalone: true,
  pure: true,
})
export class PqvTotalsBySegmentPipe implements PipeTransform {
  transform(wardTable: WardRow[], segment: string): SegmentInfo {
    const fieldInfo = this.getSegmentSum(wardTable, segment);
    return fieldInfo;
  }
  getSegmentSum(originalWardTable: WardRow[], fieldName: string): SegmentInfo {
    let sumTotal = 0;
    let fieldTotal = 0;

    originalWardTable.forEach((originalWardRow) => {
      const fieldValue = originalWardRow[fieldName as keyof WardRow];
      sumTotal = sumTotal + originalWardRow['total'];
      fieldTotal = fieldTotal + fieldValue;
    });

    const percent = parseFloat(((fieldTotal / sumTotal) * 100).toFixed(2)) ;
    
    return {
      name:fieldName,
      percent,
      count:fieldTotal
    };
  }
}
