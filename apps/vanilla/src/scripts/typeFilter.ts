import { Type } from "@js-camp/core/models/anime";

/**
 * Initialize filtering by type.
 * @param sortContainer The block where the sort is located.
 * @param sortOrder Sort order.
 * @param sendSortOrder Send the sort order.
 */
export function initializationTypeFilter(
  typeContainer: Element,
  type: string,
  sendType: Function,
): void {
  addInputRadio(typeContainer, type);
  addListenersToSort(typeContainer, sendType);
}

/**
 * Create and add select to the page.
 * @param sortContainer The block where the sort is located.
 * @param order Sort order.
 */
function addInputRadio(typeContainer: Element, type: string): void {
  const filterContentArray = [
    {
      value: undefined,
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


  const filterContent = filterContentArray.reduce((body, current) => {
    // console.log(current.value, type)
    // console.log(String(current.value), type)
    // if(String(current.value) === type ){
    //   console.log(87)
    // }else{
    //   console.log(8777)
    // }
    // checked="false" checked=${String(current.value) === type ? true: false} 

    const optionContent = `
      <label>
        <input type="radio" name="type" ${String(current.value) === type ? 'checked': ''} value="${current.value}">
         ${current.showTitle}
      </label>`;

    return body + optionContent;
  }, ``);
  typeContainer.innerHTML = filterContent;

}

/**
 * Add a change event to the select.
 * @param sortContainer The block where the sort is located.
 * @param sendSortOrder Send the sort order.
 */
function addListenersToSort(sendType: Function): void {
  const typeContainer = document.querySelector('input[name="type"]')
  typeContainer.addEventListener('click', () => {

    const order = sortContainer.value as AnimeSort;
    sendSortOrder(order);
  }, { once: true });
}

/** Available attributes for the option. */
interface OptionAttributes {

  /** Option value. */
  readonly value: AnimeSort;

  /** Option title. */
  readonly showTitle: string;
}
