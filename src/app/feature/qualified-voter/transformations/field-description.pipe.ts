import { Pipe, PipeTransform } from '@angular/core';
import { wardRowDecription } from '../model/wardRowDecription.model';

/**
 * Converts field name to human readable description
@Param field - string of field name
@Returns string - converted text
 */
@Pipe({
  name: 'fieldDescription',
  standalone: true
})
export class PqvFieldDescriptionPipe implements PipeTransform {
  transform(field: string): string {
   return (wardRowDecription as any)[field] || 'Unknown';
  }
}
