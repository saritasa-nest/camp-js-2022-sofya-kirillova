/**
 * Displays an error message.
 * @param message Error message.
 * @param container Location of the message.
 */
export function displayTheError(message: string, container: Element): void {
  container.innerHTML = message;
  container.classList.remove('display-none');
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
