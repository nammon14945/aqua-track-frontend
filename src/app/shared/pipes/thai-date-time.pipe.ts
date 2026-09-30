import { Pipe, PipeTransform } from '@angular/core';
import { formatThaiDateTime, ThaiDateInput } from '../utils/format';

@Pipe({ name: 'thaiDateTime' })
export class ThaiDateTimePipe implements PipeTransform {
  transform(value: ThaiDateInput): string {
    return formatThaiDateTime(value);
  }
}
