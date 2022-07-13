import { AnimeSort } from '@js-camp/core/models/animeSort';

/**
 * Initialize sorting.
 * @param sortContainer The block where the sort is located.
 * @param sortOrder Sort order.
 * @param sendSortOrder Send the sort order.
 */
export function sortInitialization(
  formContainer: Element,
  sortOrder: AnimeSort,
  sendSortOrder: Function,
): void {
  const sortContainer = document.createElement('select')
  formContainer.replaceWith(sortContainer);
  createOptions(sortContainer, sortOrder);
  addListenersToSort(sortContainer, sendSortOrder);
}

/**
 * Create and add select to the page.
 * @param sortContainer The block where the sort is located.
 * @param order Sort order.
 */
function createOptions(sortContainer: HTMLSelectElement, order: AnimeSort): void {

  const selectOptions: OptionAttributes[] = [
    {
      value: 'titleEng',
      showTitle: 'english title',
    },
    {
      value: 'airedStart',
      showTitle: 'aired start',
    },
    {
      value: 'status',
      showTitle: 'status',
    },
  ];

  const selectContent = selectOptions.reduce((body, current) => {
    const optionContent = `
      <option value="${current.value}">${current.showTitle}</option>`;
    return body + optionContent;
  }, ``);

  sortContainer.innerHTML = selectContent;
  sortContainer.value = order;

}

/**
 * Add a change event to the select.
 * @param sortContainer The block where the sort is located.
 * @param sendSortOrder Send the sort order.
 */
function addListenersToSort(sortContainer: HTMLSelectElement, sendSortOrder: Function): void {
  sortContainer.addEventListener('change', () => {
    const order = sortContainer.value as AnimeSort;
    sendSortOrder(order);
  });
}

/** Available attributes for the option. */
interface OptionAttributes {

  /** Option value. */
  readonly value: AnimeSort;

  /** Option title. */
  readonly showTitle: string;
}
