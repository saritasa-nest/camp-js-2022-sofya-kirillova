import { PaginationParameters } from '../scripts/interfaces';

/**
 * Render pagination on the page.
 * @param paginationOptions Pagination options: count pages, current page, pages before and after current, pagination located.
 */
export function renderPagination(paginationOptions: PaginationParameters): void {
  const span = `<span>...</span>`;
  let divContent = ``;
  const reportStart = 1;
  const numberOfDisplayedPages = paginationOptions.maxStepsSelectedPage * 2;

  if (paginationOptions.startPage !== reportStart) {
    divContent += addButton('&#9668;', 'previous_page');
  }
  if (paginationOptions.startPage < numberOfDisplayedPages) {
    for (let i = 1; i <= numberOfDisplayedPages; i++) {
      divContent += addButton(i);
    }
    divContent += span + addButton(paginationOptions.pagesCount);
  } else if (paginationOptions.pagesCount - paginationOptions.startPage < numberOfDisplayedPages - 1) {
    divContent += addButton(reportStart) + span;
    for (let i = 1; i <= numberOfDisplayedPages; i++) {
      const numberPage = paginationOptions.pagesCount + i - numberOfDisplayedPages;
      divContent += addButton(numberPage);
    }
  } else {
    divContent += addButton(reportStart) + span;
    for (let i = -paginationOptions.maxStepsSelectedPage; i <= paginationOptions.maxStepsSelectedPage; i++) {
      const numberPage = paginationOptions.startPage + i;
      divContent += addButton(numberPage);
    }
    divContent += span + addButton(paginationOptions.pagesCount);
  }
  if (paginationOptions.startPage !== paginationOptions.pagesCount) {
    divContent += addButton('&#9658;', 'next_page');
  }

  paginationOptions.container.innerHTML = divContent;
  highlightCurrentPage(paginationOptions.container, paginationOptions.startPage);
}

/**
 * Return a string with a button in the form of HTML.
 * @param innerHTML Content of the button tag.
 * @param value Value of the button tag.
 */
function addButton(innerHTML: string | number, value = innerHTML): string {
  return `<button type="button" value=${value}>${innerHTML}</button>`;
}

/**
 * Highlights the selected page.
 * @param container Where is the pagination located.
 * @param startPage Current page.
 */
function highlightCurrentPage(container: Element, startPage: number): void {
  const buttonPagination = Array.from(container.children);
  for (const elem of buttonPagination) {
    if (Number(elem.innerHTML) === Number(startPage)) {
      elem.className = 'pagination__page--current';
    }
  }
}
