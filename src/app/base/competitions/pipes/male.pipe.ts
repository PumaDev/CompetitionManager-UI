import { Pipe, PipeTransform } from '@angular/core';
import { Male } from '../models/sportmen.models';

@Pipe({
  name: 'malePipe'
})
export class MalePipe implements PipeTransform {
  transform(value: Male, ...args: any[]): string {
    if (!value) {
      return '';
    }
    return value === Male.MALE ? 'М' : 'Ж';
  }
}
