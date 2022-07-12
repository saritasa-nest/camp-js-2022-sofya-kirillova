import { SortDTO } from "@js-camp/core/dtos/sort.dto";

export function sortInitialization(
  sortContainer: Element,
  changeSortOrder: Function
): void {
  addSelect(sortContainer);
  addListenersToSort(sortContainer, changeSortOrder)
}

/** Create and add select to the page. */
function addSelect(sortContainer: Element): void {
  const selectOptions: OptionAttributes[] = [
    {
      value: 'title_eng',
      title: 'eng_title',
    },
    {
      value: 'aired__startswith',
      title: 'aired start',
    },
    {
      value: 'status',
      title: 'status',
    },
  ];


  const selectContent = selectOptions.reduce((body, current) => {
    const optionContent = `
      <option value="${current.value}">${current.title}</option>`;
    return body + optionContent;
  }, ``);

  sortContainer.innerHTML = selectContent;
}


function addListenersToSort(sortContainer: Element, changeSortOrder: Function) {
  sortContainer.addEventListener('change', (event: Event) => {
    if (!(event.target instanceof HTMLSelectElement)) {
      return;
    }
    const { target } = event;
    const order = target.value as SortDTO;
    changeSortOrder(order);
  }, { once: true, }
  );
}


/** Available attributes for the option. */ //mapper
interface OptionAttributes {

  /** Option value. */
  readonly value: SortDTO;

  /** Option title. */
  readonly title: string;
}