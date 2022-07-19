
import { AnimeType, checkIsType } from '@js-camp/core/models/animeType';
import { assertNonNull } from '@js-camp/core/utils/assertNonNull';

import { FieldOptions } from './interfaces';

/**
 * Initialize filtering by type.
 * @param filterContainer The block where the filter is located.
 * @param valueFilter Filter value.
 * @param sendValue Send the filter value.
 */
export function initializeTypeFiltering(
  filterContainer: Element,
  valueFilter: string,
  sendValue: (sort: AnimeType | null) => void,
): void {
  addInputRadio(filterContainer, valueFilter);
  addListenersToSort(filterContainer, sendValue);
}

/**
 * Create and add inputs to the page.
 * @param filterContainer The block where the filter is located.
 * @param valueFilter Filter value.
 */
function addInputRadio(filterContainer: Element, valueFilter: string): void {
  const typeContent: readonly FieldOptions<AnimeType | null>[] = [
    {
      value: null,
      showTitle: 'All',
    },
    {
      value: AnimeType.Tv,
      showTitle: 'TV',
    },
    {
      value: AnimeType.Ova,
      showTitle: 'OVA',
    },
    {
      value: AnimeType.Movie,
      showTitle: 'Movie',
    },
    {
      value: AnimeType.Ona,
      showTitle: 'ONA',
    },
    {
      value: AnimeType.Special,
      showTitle: 'Special',
    },
    {
      value: AnimeType.Music,
      showTitle: 'Music',
    },
  ];

  const filterContent = typeContent.reduce((body, current) => {
    const optionContent = `
      <label>
        <input type="radio" name="type" ${String(current.value) === valueFilter ? 'checked' : ''} value="${current.value}">
         ${current.showTitle}
      </label>`;

    return body + optionContent;
  }, ``);
  filterContainer.innerHTML = filterContent;
}

/**
 * Add a change event to the filter.
 * @param filterContainer The block where the filter is located.
 * @param sendValue Send the filter value.
 */
function addListenersToSort(filterContainer: Element, sendValue: (sort: AnimeType | null) => void): void {
  filterContainer.addEventListener('change', () => {
    const typeContainer = document.querySelector<HTMLInputElement>('input[name="type"]:checked');
    assertNonNull(typeContainer);
    let type: AnimeType | null;
    if (checkIsType(typeContainer.value)) {
      type = typeContainer.value;
    } else {
      type = null;
    }
    sendValue(type);
  }, { once: true });
}
