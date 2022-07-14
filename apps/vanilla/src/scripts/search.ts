/**
 * Initialize select.
 * @param selectContainer The block where the search is located.
 * @param sendSearch Send the search order.
 */
export function initializeSearch(
  selectContainer: HTMLSelectElement,
  sendSearch: Function,
): void {
  addSearch(selectContainer, sendSearch);
}

/**
 * Create and add select to the page.
 * @param selectContainer The block where the sort is located.
 * @param sendSearch Send the search order.
 */
function addSearch(selectContainer: HTMLSelectElement, sendSearch: Function): void {
  selectContainer.addEventListener('change', () => {
    const searchTextInput = selectContainer.value;
    sendSearch(searchTextInput);
  }, { once: true });
}
