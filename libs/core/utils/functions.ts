/**
 * The function formats date to 'dd.mm.yyyy' or 'no date'.
 * @param dateReceived Date.
 */
export function formatDate(dateReceived: Date): string {
  const date = new Date(dateReceived);
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  };
  return date.toLocaleString('ru', options);
}
