/**
 * Displays an error message.
 * @param message Error message.
 * @param container Location of the message.
 */
export function displayError(message: string, container: Element): void {
  container.innerHTML = message;
  container.classList.remove('display-none');
}
