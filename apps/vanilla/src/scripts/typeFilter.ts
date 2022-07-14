import { Type } from "@js-camp/core/models/anime";
import { assertNonNull } from "@js-camp/core/utils/assertNonNull";

/**
 * Initialize filtering by type.
 * @param filterContainer The block where the filter is located.
 * @param valueFilter Filter value.
 * @param sendValue Send the filter value.
 */
export function initializationTypeFilter(
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
  const typeContent: FilterOptions[] = [
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
 * Add a change event to the filter.
 * @param filterContainer The block where the filter is located.
 * @param sendValue Send the filter value.
 */
function addListenersToSort(filterContainer: Element, sendValue: Function): void {
  filterContainer.addEventListener('change', () => {
    const typeContainer = document.querySelector<HTMLInputElement>('input[name="type"]:checked')
    assertNonNull(typeContainer);
    let type: Type | null = Type.Movie
    if (Object.values(Type).includes(typeContainer.value as any)) {
      type = typeContainer.value as Type
    } else {
      type = null;
    }
    sendValue(type);
  }, { once: true });
}

/** Available attributes for the filter fields. */
interface FilterOptions {

  /** Option value. */
  readonly value: Type | null;

  /** Option title. */
  readonly showTitle: string;
}
