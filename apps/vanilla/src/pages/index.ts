import { assertNonNull } from '@js-camp/core/utils/functions';

import { getPagination } from '../scripts/pagination';

addSelect();

const pageSize = 30;
const numberPage = 1;
const maxStepsSelectedPage = 3;
const paginationDiv = document.querySelector('.pagination');
assertNonNull(paginationDiv);
getPagination({
  container: paginationDiv,
  pageSize,
  startPage: numberPage,
  maxStepsSelectedPage,
});

/** Create and add select to the page. */
function addSelect(): void {
  const selectOptions = [
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
