import { DatePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

/** Format date pipe. */
@Pipe({ name: 'formatDate' })
export class FormatDatePipe implements PipeTransform {
  public constructor(private datePipe: DatePipe) {}

  /**
   * The function formats date to 'dd.mm.yyyy' or 'no date'.
   * @param value Date.
   */
  public transform(value: Date | null): string | null {
    const date = this.datePipe.transform(value, 'dd.MM.yyyy');
    if (date === null) {
      return 'No date';
    }
    return date;
  }
}
