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

// /**
//  * Function for verifying invariants.
//  * @param condition Check the condition.
//  * @param msg Output a message.
//  */
// export function isNull(condition: any, msg?: string): void {
//   if (condition === null) {
//     throw new Error(msg ?? 'no element');
//   }
// }
