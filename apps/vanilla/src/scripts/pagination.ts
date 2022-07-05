import { renderAnimeTable } from '../pages/animeTable';

import { getAnime } from './requests';

/**
 * Implementation of pagination.
 * @param positionPagination Where is the pagination located.
 * @param pageSize Number of results to return per page.
 * @param stepPage Pages before and after current.
 * @param page Current page.
 */
export function getPagination(positionPagination: HTMLDivElement, pageSize = 25, stepPage = 3, page = 1): void {
  let currentPagePagination = page;
  positionPagination.addEventListener('click', event => handlePageButtonClick(event));
  const selectElement = document.querySelector<HTMLSelectElement>('.sort-anime-table');
  if (selectElement === null) {
    throw new Error('not element');
  }
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
    const animePromise = getAnime({ pageSize, currentPage: currentPagePagination, order }, apiAddress ?? undefined);
    animePromise.then(animeData => renderAnimeTable(animeData));
    animePromise.then(animeData => {
      const countPage = Math.ceil(animeData.count / pageSize);
      const requestAddress = {
        previous: animeData.previous,
        next: animeData.next,
      };
      const paginationConfig = {
        countPages: countPage,
        currentPage: currentPagePagination,
        step: stepPage,
        position: positionPagination,
      };
      renderPagination(requestAddress, paginationConfig);
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
      currentPagePagination++;

    } else if (target.id === 'previous_page') {
      currentPagePagination--;
    } else {
      currentPagePagination = Number(target.innerHTML);
    }
    resetPagination();
  }

  resetPagination();
}

/**
 * Render pagination on the page.
 * @param requestAddress The request address of the previous and next page.
 * @param paginationConfig Pagination Config: count pages, current page, pages before and after current, pagination located.
 */
function renderPagination(requestAddress: {
  previous: string;
  next: string;
},
paginationConfig: {
  countPages: number;
  currentPage: number;
  step: number;
  position: Element;
}): void {
  let divHTML = ``;
  const NUMBER_ADDITIONAL_PAGES = 3;
  if (paginationConfig.currentPage < paginationConfig.step + NUMBER_ADDITIONAL_PAGES) {
    for (let i = 1; i < paginationConfig.step * paginationConfig.step + NUMBER_ADDITIONAL_PAGES; i++) {
      divHTML += `
            <button type="button">${i}</button>`;
    }
    divHTML += `
            <span>...</span>
            <button type="button">${paginationConfig.countPages}</button>
            <button type="button" id='next_page' value='${requestAddress.next}'>&#9658;</button>`;
    paginationConfig.position.innerHTML = divHTML;
  } else if (paginationConfig.countPages - paginationConfig.currentPage < paginationConfig.step + NUMBER_ADDITIONAL_PAGES) {
    const countViewNumberPage = paginationConfig.step * paginationConfig.step;
    divHTML += `
            <button type="button" id='previous_page' value='${requestAddress.previous}'>&#9668;</button>
            <button type="button">1</button>
            <span>...</span>`;
    for (let i = 0; i <= countViewNumberPage; i++) {
      const numberPage = paginationConfig.countPages + i - countViewNumberPage;
      divHTML += `
            <button type="button">${numberPage}</button>`;
    }
    paginationConfig.position.innerHTML = divHTML;
  } else {
    divHTML += `
            <button type="button" id='previous_page' value='${requestAddress.previous}'>&#9668;</button>
            <button type="button">1</button>
            <span>...</span>`;
    for (let i = -paginationConfig.step; i <= paginationConfig.step; i++) {
      const numberPage = paginationConfig.currentPage + i;
      divHTML += `
            <button type="button">${numberPage}</button>`;
    }
    divHTML += `
            <span>...</span>
            <button type="button">${paginationConfig.countPages}</button>
            <button type="button" id='next_page' value='${requestAddress.next}'>&#9658;</button>`;
    paginationConfig.position.innerHTML = divHTML;
  }
  highlightCurrentPage(paginationConfig.position, paginationConfig.currentPage);
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
