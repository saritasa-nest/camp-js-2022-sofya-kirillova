/**
 * The function formats date to 'dd.mm.yyyy' or 'no date'.
 * @param dateReceived Date.
 * @returns Formats date to 'dd.mm.yyyy' or 'no date.
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
 * Function for verifying invariants.
 * @param condition Check the condition.
 * @param msg Output a message.
 */
export function isNull(condition: any, msg?: string): asserts condition {
  if (!condition) {
    throw new Error(msg ?? 'no element');
  }
}
