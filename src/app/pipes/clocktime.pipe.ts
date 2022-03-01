import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'clocktime'
})
export class ClocktimePipe implements PipeTransform {
  transform(value: number | null): string {
    if (value == null) {
      value = 0
    }
    const seconds = value % 60;
    const minutes = Math.floor(value / 60);
    return `${minutes.toLocaleString('en-US', {minimumIntegerDigits: 2})} m ${seconds.toLocaleString('en-US', {minimumIntegerDigits: 2})} s`
  }
}
