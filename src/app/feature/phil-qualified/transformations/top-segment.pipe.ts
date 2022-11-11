import { Pipe, PipeTransform } from '@angular/core';
import { WardRow } from '../data/model/WardRow.interface';
import { wardPrimaryCategories } from './model/wardPrimaryCategories.model';

@Pipe({
  name: 'topSegment',
  standalone: true, 
  pure: true
})
export class PqvTopSegmentPipe implements PipeTransform {
  transform(wardTable: WardRow[]): string {
    const highestPrimaryField = this.getHighestSegment(wardTable);
    return highestPrimaryField;
  }
  getHighestSegment(originalWardTable: WardRow[]): string {
    let highestPrimaryField = 'none';
        let highestCount = 0;
    
    originalWardTable.forEach((originalWardRow) => {
      for (const categoryName in wardPrimaryCategories) {
        const fields = wardPrimaryCategories[categoryName].fields;
        let categoryTotal = 0;
        //traverse table row
        
        //category column
        fields.forEach((fieldName) => {
          const fieldValue = originalWardRow[fieldName as keyof WardRow];
          if(fieldValue > highestCount){
            highestCount = fieldValue;
            highestPrimaryField = fieldName;
          }
        });
      }
    });

    return highestPrimaryField;
  }
}