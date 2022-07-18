import { AnimeSort } from '@js-camp/core/models/animeSort';

/**
 * Initialize sorting.
 * @param sortContainer The block where the sort is located.
 * @param sortOrder Sort order.
 * @param returnSortOrder Return the sort order.
 */
export function initializeSort(
  sortContainer: HTMLSelectElement,
  sortOrder: AnimeSort,
  returnSortOrder: (sort: AnimeSort) => void,
): void {
  addSelect(sortContainer, sortOrder);
  addListenersToSort(sortContainer, returnSortOrder);
}

/**
 * Create and add select to the page.
 * @param sortContainer The block where the sort is located.
 * @param order Sort order.
 */
function addSelect(sortContainer: HTMLSelectElement, order: AnimeSort): void {

  const selectOptions: OptionAttributes[] = [
    {
      value: 'titleEng',
      label: 'english title',
    },
    {
      value: 'airedStart',
      label: 'aired start',
    },
    {
      value: 'status',
      label: 'status',
    },
  ];

  const selectContent = selectOptions.reduce((body, current) => {
    const optionContent = `
      <option value="${current.value}">${current.label}</option>`;
    return body + optionContent;
  }, ``);

  sortContainer.innerHTML = selectContent;
  sortContainer.value = order;
}

/**
 * Add a change event to the select.
 * @param sortContainer The block where the sort is located.
 * @param returnSortOrder Send the sort order.
 */
function addListenersToSort(sortContainer: HTMLSelectElement, returnSortOrder: (sort: AnimeSort) => void): void {
  sortContainer.addEventListener('change', () => {

    const order = sortContainer.value as AnimeSort;
    returnSortOrder(order);
  }, { once: true });
}

/** Available attributes for the option. */
interface OptionAttributes {

  /** Option value. */
  readonly value: AnimeSort;

  /** Option title. */
  readonly label: string;
}
