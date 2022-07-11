import { SortDTO } from '@js-camp/core/dtos/sort.dto';
import { assertNonNull } from '@js-camp/core/utils/functions';

import { MainPage } from '../scripts/mainPage';

/** Available attributes for the option. */
interface OptionAttributes{

  /** Option value. */
  readonly value: SortDTO;

  /** Option title. */
  readonly title: string;
}
addSelect();

const pageSize = 30;
const firstPageNumber = 1;
const maxStepsSelectedPage = 3;
const paginationDiv = document.querySelector('.pagination');
assertNonNull(paginationDiv);

const pagination = new MainPage(firstPageNumber, paginationDiv, pageSize, maxStepsSelectedPage);
pagination.addEventHandlers();

/** Create and add select to the page. */
function addSelect(): void {
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

  const divElement = document.querySelector('.anime');
  assertNonNull(divElement);

  const select = document.createElement('select');
  select.className = 'anime__sort';

  const selectContent = selectOptions.reduce((body, current) => {
    const optionContent = `
      <option value="${current.value}">${current.title}</option>`;
    return body + optionContent;
  }, ``);

  select.innerHTML = selectContent;
  divElement.prepend(select);
}
