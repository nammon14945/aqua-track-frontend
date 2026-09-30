import { Pipe, PipeTransform } from '@angular/core';
import { formatThaiDate, ThaiDateInput } from '../utils/format';

@Pipe({ name: 'thaiDate' })
export class ThaiDatePipe implements PipeTransform {
  transform(value: ThaiDateInput): string {
    return formatThaiDate(value);
  }
}
