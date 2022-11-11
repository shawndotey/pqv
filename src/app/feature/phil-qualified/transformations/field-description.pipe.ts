import { Pipe, PipeTransform } from '@angular/core';
import { wardRowDecription } from './model/wardRowDecription.model';

@Pipe({
  name: 'fieldDescription',
  standalone: true
})
export class PqvFieldDescriptionPipe implements PipeTransform {

  transform(field: string): string {
   return (wardRowDecription as any)[field] || 'Unknown';
  }

}
