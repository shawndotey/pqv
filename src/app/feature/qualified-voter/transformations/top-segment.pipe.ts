import { Pipe, PipeTransform } from '@angular/core';
import { WardRow } from '../model/interface/WardRow.interfaces';
import { PqvTotalsBySegmentPipe } from './totals-by-segment.pipe';
import { wardPrimaryFields } from '../model/wardPrimaryFields.model';

/**
 * Traverses each segment and returns the top segment by count
@Param WardDataTable
@Returns SegmentInfo
 */
@Pipe({
  name: 'topSegment',
  standalone: true,
  pure: true,
})
export class PqvTopSegmentPipe implements PipeTransform {
  constructor(private totalsBySegmentPipe:PqvTotalsBySegmentPipe){}

  transform(wardTable: WardRow[]): any {
    const primaryFieldTopValues = this.getHighestSegment(wardTable);
    return primaryFieldTopValues;
  }

  getHighestSegment(originalWardTable: WardRow[]): any {
    let highestSegment:any = {};
    let highestCount = 0;
    
    wardPrimaryFields.forEach(field=>{
      const segmentInfo =  this.totalsBySegmentPipe.transform(originalWardTable, field.name);
      if(segmentInfo.count > highestCount){
        highestSegment = segmentInfo;
        highestCount = segmentInfo.count;
      }
    });
    
    return highestSegment;
  }
}
