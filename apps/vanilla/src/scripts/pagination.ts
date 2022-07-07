import { assertNonNull } from '@js-camp/core/utils/functions';

import { renderAnimeTable } from '../pages/animeTable';

import { IGetPaginationOptions, IRenderPaginationOptions } from './interfaces';

import { getAnime } from './requests';

/**
 * Implementation of pagination.
 * @param paginationOptions The base parameters for the implementation of pagination.
 */
export function getPagination(paginationOptions: IGetPaginationOptions): void {
  let currentPage = paginationOptions.startPage;
  paginationOptions.container.addEventListener('click', event => handlePageButtonClick(event));
  const selectElement = document.querySelector<HTMLSelectElement>('.anime__sort');
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
        maxStepsSelectedPage: paginationOptions.maxStepsSelectedPage,
        container: paginationOptions.container,
        startPage: currentPage,
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
  const reportStart = 1;
  const numberDisplayedPages = paginationOptions.maxStepsSelectedPage * 2;
  if (paginationOptions.startPage !== reportStart) {
    divContent += addButton('&#9668;', 'previous_page');
  }
  if (paginationOptions.startPage < numberDisplayedPages) {
    for (let i = 1; i <= numberDisplayedPages; i++) {
      divContent += addButton(i);
    }
    divContent += span + addButton(paginationOptions.countPages);
  } else if (paginationOptions.countPages - paginationOptions.startPage < numberDisplayedPages - 1) {
    divContent += addButton(reportStart) + span;
    for (let i = 1; i <= numberDisplayedPages; i++) {
      const numberPage = paginationOptions.countPages + i - numberDisplayedPages;
      divContent += addButton(numberPage);
    }
  } else {
    divContent += addButton(reportStart) + span;
    for (let i = -paginationOptions.maxStepsSelectedPage; i <= paginationOptions.maxStepsSelectedPage; i++) {
      const numberPage = paginationOptions.startPage + i;
      divContent += addButton(numberPage);
    }
    divContent += span + addButton(paginationOptions.countPages);
  }
  if (paginationOptions.startPage !== paginationOptions.countPages) {
    divContent += addButton('&#9658;', 'next_page');
  }
  paginationOptions.container.innerHTML = divContent;
  highlightstartPage(paginationOptions.container, paginationOptions.startPage);
}

/**
 * Highlights the selected page.
 * @param container Where is the pagination located.
 * @param startPage Current page.
 */
function highlightstartPage(container: Element, startPage: number): void {
  const buttonPagination = Array.from(container.children);
  for (const elem of buttonPagination) {
    if (Number(elem.innerHTML) === Number(startPage)) {
      elem.className = 'pagination__page--current';
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
