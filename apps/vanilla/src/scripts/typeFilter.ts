import { Type } from '@js-camp/core/models/anime';
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
  sendValue: Function,
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
  const typeContent: FieldOptions<Type | null>[] = [
    {
      value: null,
      showTitle: 'All',
    },
    {
      value: Type.Tv,
      showTitle: 'TV',
    },
    {
      value: Type.Ova,
      showTitle: 'OVA',
    },
    {
      value: Type.Movie,
      showTitle: 'Movie',
    },
    {
      value: Type.Ona,
      showTitle: 'ONA',
    },
    {
      value: Type.Special,
      showTitle: 'Special',
    },
    {
      value: Type.Music,
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
 * Check whether the value is Type.
 * @param value Tested value.
 */
function checkIsType(value: string): value is Type {
  return Object.values(Type).includes(value as Type);
}

/**
 * Add a change event to the filter.
 * @param filterContainer The block where the filter is located.
 * @param sendValue Send the filter value.
 */
function addListenersToSort(filterContainer: Element, sendValue: Function): void {
  filterContainer.addEventListener('change', () => {
    const typeContainer = document.querySelector<HTMLInputElement>('input[name="type"]:checked');
    assertNonNull(typeContainer);
    let type: Type | null;
    if (checkIsType(typeContainer.value)) {
      type = typeContainer.value;
    } else {
      type = null;
    }
    sendValue(type);
  }, { once: true });
}
