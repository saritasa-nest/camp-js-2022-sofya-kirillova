import { Pipe, PipeTransform } from '@angular/core';

/** Format date pipe. */
@Pipe({ name: 'formatDate' })
export class FormatDatePipe implements PipeTransform {

  /**
   * The function formats date to 'dd.mm.yyyy' or 'no date'.
   * @param date Date.
   */
  public transform(date: Date | null): string {
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    };
    if (date === null) {
      return 'No date';
    }
    return date.toLocaleString('ru', options);
  }
}
