/**
 * The function formats date to 'dd.mm.yyyy' or 'no date'.
 * @param date Date.
 */
 export function formatDate(date: Date): string {
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  };
  return date.toLocaleString('ru', options);
}
