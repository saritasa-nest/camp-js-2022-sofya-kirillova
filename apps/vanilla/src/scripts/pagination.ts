import { assertNonNull } from '@js-camp/core/utils/functions';

import { renderAnimeTable } from '../pages/animeTable';

import { IGetPaginationOptions, IRenderPaginationOptions } from './interfaces';

import { getAnime } from './requests';

/**
 * Implementation of pagination.
 * @param paginationOptions The base parameters for the implementation of pagination.
 */
export function getPagination(paginationOptions: IGetPaginationOptions): void {
  let { currentPage } = paginationOptions;
  paginationOptions.position.addEventListener('click', event => handlePageButtonClick(event));
  const selectElement = document.querySelector<HTMLSelectElement>('.sort-anime-table');
  assertNonNull(selectElement);
  let order = 'title_eng';
  selectElement.addEventListener('change', (event: Event) => {
    const target = event.target as HTMLSelectElement;
    order = target.value;
    resetPagination();
  });

  /** Requests the anime table and calls the rendering. */
  function resetPagination(): void {
    const paginationConfig = {
      pageSize: paginationOptions.pageSize,
      currentPage,
      order,
    };
    const animePromise = getAnime(paginationConfig);
    animePromise.then(animeData => renderAnimeTable(animeData));
    animePromise.then(animeData => {
      const countPage = Math.ceil(animeData.count / paginationOptions.pageSize);
      const renderPaginationOptions = {
        countPages: countPage,
        step: paginationOptions.step,
        position: paginationOptions.position,
        currentPage,
      };
      renderPagination(renderPaginationOptions);
    });
  }

  /**
   * Page rendering on click.
   * @param event The pressed button.
   */
  function handlePageButtonClick(event: Event): void {
    if (!(event.target instanceof HTMLButtonElement)) {
      return;
    }

    scrollTo(0, 0);
    const { target } = event;
    if (target.value === 'next_page') {
      currentPage++;

    } else if (target.value === 'previous_page') {
      currentPage--;
    } else {
      currentPage = Number(target.innerHTML);
    }
    resetPagination();
  }
  resetPagination();
}

/**
 * Render pagination on the page.
 * @param paginationOptions Pagination options: count pages, current page, pages before and after current, pagination located.
 */
function renderPagination(paginationOptions: IRenderPaginationOptions): void {
  const span = `<span>...</span>`;
  let divContent = ``;
  const REPORT_START = 1;
  const numberDisplayedPages = paginationOptions.step * 2;
  if (paginationOptions.currentPage !== REPORT_START) {
    divContent += addButton('&#9668;', 'previous_page');
  }
  if (paginationOptions.currentPage < numberDisplayedPages) {
    for (let i = 1; i <= numberDisplayedPages; i++) {
      divContent += addButton(i);
    }
    divContent += span + addButton(paginationOptions.countPages);
  } else if (paginationOptions.countPages - paginationOptions.currentPage < numberDisplayedPages - 1) {
    divContent += addButton(REPORT_START) + span;
    for (let i = 1; i <= numberDisplayedPages; i++) {
      const numberPage = paginationOptions.countPages + i - numberDisplayedPages;
      divContent += addButton(numberPage);
    }
  } else {
    divContent += addButton(REPORT_START) + span;
    for (let i = -paginationOptions.step; i <= paginationOptions.step; i++) {
      const numberPage = paginationOptions.currentPage + i;
      divContent += addButton(numberPage);
    }
    divContent += span + addButton(paginationOptions.countPages);
  }
  if (paginationOptions.currentPage !== paginationOptions.countPages) {
    divContent += addButton('&#9658;', 'next_page');
  }
  paginationOptions.position.innerHTML = divContent;
  highlightCurrentPage(paginationOptions.position, paginationOptions.currentPage);
}

/**
 * Highlights the selected page.
 * @param position Where is the pagination located.
 * @param currentPage Current page.
 */
function highlightCurrentPage(position: Element, currentPage: number): void {
  const buttonPagination = Array.from(position.children);
  for (const elem of buttonPagination) {
    if (Number(elem.innerHTML) === Number(currentPage)) {
      elem.className = 'current-page';
    }
  }
}

/**
 * Return a string with a button in the form of HTML.
 * @param innerHTML Content of the button tag.
 * @param value Value of the button tag.
 */
function addButton(innerHTML: string | number, value = innerHTML): string {
  const button = `<button type="button" value=${value}>${innerHTML}</button>`;
  return button;
}
