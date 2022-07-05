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

/**
 * The function checks for the presence of an element.
 * @param value Check the value.
 */
export function assertNonNull<T>(value: T | undefined | null): asserts value is NonNullable<T> {
  if (value === null || value === undefined) {
    throw new Error('Value can not be null or undefined');
  }
}
