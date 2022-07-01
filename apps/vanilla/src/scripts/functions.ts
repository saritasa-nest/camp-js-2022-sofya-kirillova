/**
 * Formatted dates in dd.mm.yyyy or 'no date'.
 * @param dateReceived Date.
 * @returns Date in the format dd.mm.yyyy or 'no date'.
 */
export function formatDate(dateReceived: string | null): string {
  if (dateReceived === null) {
    return 'no date';
  }
  const date = new Date(dateReceived);
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  };
  return date.toLocaleString('ru', options);
}
