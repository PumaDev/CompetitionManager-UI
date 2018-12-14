import { Pipe, PipeTransform } from '@angular/core';
import { ICompetitionCategory } from '../models/category.model';
import { formatLowUpperProperties } from '../utils/format.utils';

@Pipe({
  name: 'appAgeCategoryPipe'
})
export class AgeCategoryPipe implements PipeTransform {

  transform(category: ICompetitionCategory, ...args: any[]): String {
    return formatLowUpperProperties(category, 'Age');
  }
}

