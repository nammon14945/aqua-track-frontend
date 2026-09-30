import { Pipe, PipeTransform } from '@angular/core';
import { formatThb } from '../utils/format';

@Pipe({ name: 'thb' })
export class ThbPipe implements PipeTransform {
  transform(value: number | null | undefined, decimals: 0 | 2 = 2): string {
    return formatThb(value, { decimals });
  }
}
