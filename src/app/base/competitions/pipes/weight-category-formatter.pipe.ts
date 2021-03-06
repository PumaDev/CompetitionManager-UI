import { Pipe, PipeTransform } from '@angular/core';
import { ICompetitionCategory } from '../models/category.model';
import { formatLowUpperProperties } from '../utils/format.utils';

@Pipe({
  name: 'appWeightCategoryFormat'
})
export class WeightCategoryFormatterPipe implements PipeTransform {

  transform(value: ICompetitionCategory, ...args: any[]): string {
    return formatLowUpperProperties(value, 'Weight');
  }

}
