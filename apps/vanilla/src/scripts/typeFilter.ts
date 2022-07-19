
import { AnimeType, checkIsType } from '@js-camp/core/models/animeType';
import { assertNonNull } from '@js-camp/core/utils/assertNonNull';

import { FieldOptions } from './interfaces';

/**
 * Initialize filtering by type.
 * @param filterContainer The block where the filter is located.
 * @param valueFilter Filter value.
 * @param returnValue Return the filter value.
 */
export function initializeTypeFiltering(
  filterContainer: Element,
  valueFilter: string,
  returnValue: (sort: AnimeType | null) => void,
): void {
  addInputRadio(filterContainer, valueFilter);
  setCurrentValueFilter(filterContainer, returnValue);
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
      label: 'All',
    },
    {
      value: AnimeType.Tv,
      label: 'TV',
    },
    {
      value: AnimeType.Ova,
      label: 'OVA',
    },
    {
      value: AnimeType.Movie,
      label: 'Movie',
    },
    {
      value: AnimeType.Ona,
      label: 'ONA',
    },
    {
      value: AnimeType.Special,
      label: 'Special',
    },
    {
      value: AnimeType.Music,
      label: 'Music',
    },
  ];

  const filterContent = typeContent.reduce((body, current) => {
    const optionContent = `
      <label>
        <input type="radio" name="type" ${String(current.value) === valueFilter ? 'checked' : ''} value="${current.value}">
         ${current.label}
      </label>`;

    return body + optionContent;
  }, ``);
  filterContainer.innerHTML = filterContent;
}

/**
 * Add a change event to the filter.
 * @param filterContainer The block where the filter is located.
 * @param returnValue Send the filter value.
 */
function setCurrentValueFilter(filterContainer: Element, returnValue: (sort: AnimeType | null) => void): void {
  filterContainer.addEventListener('change', () => {
    const typeContainer = document.querySelector<HTMLInputElement>('input[name="type"]:checked');
    assertNonNull(typeContainer);
    let type: AnimeType | null;
    if (checkIsType(typeContainer.value)) {
      type = typeContainer.value;
    } else {
      type = null;
    }
    returnValue(type);
  }, { once: true });
}
