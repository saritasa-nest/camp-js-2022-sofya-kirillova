/**
 * The function checks for the presence of an element.
 * @param value Check the value.
 */
 export function assertNonNull<T>(value: T | undefined | null): asserts value is NonNullable<T> {
  if (value === null || value === undefined) {
    throw new Error('Value can not be null or undefined');
  }
}