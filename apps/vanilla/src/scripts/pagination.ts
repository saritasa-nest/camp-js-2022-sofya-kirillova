import { assertNonNull } from '@js-camp/core/utils/functions';

import { renderAnimeTable } from '../pages/animeTable';

import { IGetPaginationOptions, IRenderPaginationOptions } from './interfaces';

import { getAnime } from './requests';

/**
 * Implementation of pagination.
 * @param paginationOptions Pagination options:
 * Number of results to return per page, current page, pages before and after current, pagination located.
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

  /**
   * Requests the anime table and calls the rendering.
   * @param apiAddress Request address.
   */
  function resetPagination(apiAddress = ''): void {
    const paginationConfig = {
      pageSize: paginationOptions.pageSize,
      currentPage,
      order,
    };
    const animePromise = getAnime(paginationConfig, apiAddress ?? undefined);
    animePromise.then(animeData => renderAnimeTable(animeData));
    animePromise.then(animeData => {
      const countPage = Math.ceil(animeData.count / paginationOptions.pageSize);
      const requestAddress = {
        previous: animeData.previous,
        next: animeData.next,
      };
      const renderPaginationOptions = {
        countPages: countPage,
        currentPage,
        step: paginationOptions.step,
        position: paginationOptions.position,
      };
      renderPagination(requestAddress, renderPaginationOptions);
    });
  }

  /**
   * Page rendering on click.
   * @param event The pressed button.
   */
  function handlePageButtonClick(event: Event): void {
    scrollTo(0, 0);
    const target = event.target as HTMLButtonElement;
    if (target.id === 'next_page') {
      currentPage++;

    } else if (target.id === 'previous_page') {
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
 * @param requestAddress The request address of the previous and next page.
 * @param paginationOptions Pagination options: count pages, current page, pages before and after current, pagination located.
 */
function renderPagination(requestAddress: {
  previous: string;
  next: string;
},
paginationOptions: IRenderPaginationOptions): void {
  let divHTML = ``;
  const NUMBER_ADDITIONAL_PAGES = 3;
  if (paginationOptions.currentPage < paginationOptions.step + NUMBER_ADDITIONAL_PAGES) {
    for (let i = 1; i < paginationOptions.step * paginationOptions.step + NUMBER_ADDITIONAL_PAGES; i++) {
      divHTML += `
            <button type="button">${i}</button>`;
    }
    divHTML += `
            <span>...</span>
            <button type="button">${paginationOptions.countPages}</button>
            <button type="button" id='next_page' value='${requestAddress.next}'>&#9658;</button>`;
    paginationOptions.position.innerHTML = divHTML;
  } else if (paginationOptions.countPages - paginationOptions.currentPage < paginationOptions.step + NUMBER_ADDITIONAL_PAGES) {
    const countViewNumberPage = paginationOptions.step * paginationOptions.step;
    divHTML += `
            <button type="button" id='previous_page' value='${requestAddress.previous}'>&#9668;</button>
            <button type="button">1</button>
            <span>...</span>`;
    for (let i = 0; i <= countViewNumberPage; i++) {
      const numberPage = paginationOptions.countPages + i - countViewNumberPage;
      divHTML += `
            <button type="button">${numberPage}</button>`;
    }
    paginationOptions.position.innerHTML = divHTML;
  } else {
    divHTML += `
            <button type="button" id='previous_page' value='${requestAddress.previous}'>&#9668;</button>
            <button type="button">1</button>
            <span>...</span>`;
    for (let i = -paginationOptions.step; i <= paginationOptions.step; i++) {
      const numberPage = paginationOptions.currentPage + i;
      divHTML += `
            <button type="button">${numberPage}</button>`;
    }
    divHTML += `
            <span>...</span>
            <button type="button">${paginationOptions.countPages}</button>
            <button type="button" id='next_page' value='${requestAddress.next}'>&#9658;</button>`;
    paginationOptions.position.innerHTML = divHTML;
  }
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
