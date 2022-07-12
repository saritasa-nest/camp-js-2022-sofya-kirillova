import { ButtonParameters, PaginationParameters } from './interfaces';

/**
 * Render pagination on the page.
 * @param paginationOptions Parameters for pagination.
 */
export function renderPagination(paginationOptions: PaginationParameters): void {
  const rangePlaceholder = `<span>...</span>`;
  let paginationContent = ``;
  const reportStart = 1;
  const numberOfDisplayedPages = paginationOptions.maxStepsSelectedPage * 2;

  if (paginationOptions.startPage !== reportStart) {
    paginationContent += addButton({ content: '&#9668;', value: 'previous_page' });
  }
  if (paginationOptions.startPage < numberOfDisplayedPages) {
    for (let i = 1; i <= numberOfDisplayedPages; i++) {
      if (paginationOptions.startPage === i) {
        paginationContent += addButton({ content: i, className: 'pagination__page--current' });
      } else {
        paginationContent += addButton({ content: i });
      }
    }
    paginationContent += rangePlaceholder + addButton({ content: paginationOptions.pagesCount });
  } else if (paginationOptions.pagesCount - paginationOptions.startPage < numberOfDisplayedPages - 1) {
    paginationContent += addButton({ content: reportStart }) + rangePlaceholder;
    for (let i = 1; i <= numberOfDisplayedPages; i++) {
      const numberPage = paginationOptions.pagesCount + i - numberOfDisplayedPages;
      if (paginationOptions.startPage === numberPage) {
        paginationContent += addButton({ content: numberPage, className: 'pagination__page--current' });
      } else {
        paginationContent += addButton({ content: numberPage });
      }
    }
  } else {
    paginationContent += addButton({ content: reportStart }) + rangePlaceholder;
    for (let i = -paginationOptions.maxStepsSelectedPage; i <= paginationOptions.maxStepsSelectedPage; i++) {
      const numberPage = paginationOptions.startPage + i;
      if (paginationOptions.startPage === numberPage) {
        paginationContent += addButton({ content: numberPage, className: 'pagination__page--current' });
      } else {
        paginationContent += addButton({ content: numberPage });
      }
    }
    paginationContent += rangePlaceholder + addButton({ content: paginationOptions.pagesCount });
  }
  if (paginationOptions.startPage !== paginationOptions.pagesCount) {
    paginationContent += addButton({ content: '&#9658;', value: 'next_page' });
  }

  paginationOptions.container.innerHTML = paginationContent;
}

/**
 * Return a string with a button in the form of HTML.
 * @param parameters Parameters for button.
 */
function addButton(parameters: ButtonParameters): string {
  const dataAttribute = parameters.content;
  return `
    <button
      class="${parameters.className}"
      type="button"
      ${parameters.value === undefined ? `date-page-number=${dataAttribute}` : `value=${parameters.value}`}>
        ${parameters.content}
    </button>`;
}
