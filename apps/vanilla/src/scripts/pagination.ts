import { renderAnimeTable } from '../pages/animeTable';

import { isNull } from './functions';

import { getAnime } from './requests';

/**
 * Implementation of pagination.
 * @param position Where is the pagination located.
 * @param pageNumber Number of results to return per page.
 * @param step Pages before and after current.
 * @param page Current page.
 */
export function getPagination(position: Element, pageNumber = 25, step = 3, page = 1): void {
  let currentPage = page;
  position.addEventListener('click', event => handlePageButtonClick(event));
  const selectElement = document.querySelector('.sort-anime-table');
  isNull(selectElement !== null);
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
  function resetPagination(apiAddress: string | undefined = undefined): void {
    const animePromise = getAnime(pageNumber, currentPage, order, apiAddress);
    renderAnimeTable(animePromise);
    animePromise.then(animeData => {
      const countPage = Math.ceil(animeData.count / pageNumber);
      renderPagination(animeData.previous, animeData.next, countPage, currentPage, step, position);
    });
  }

  /**
   * Page rendering on click.
   * @param event The pressed button.
   */
  function handlePageButtonClick(event: Event): void {
    scrollTo(0, 0);
    const target = event.target as HTMLButtonElement;
    if (target.value === 'next_page') {
      currentPage++;

    } else if (target.value === 'previous_page') {
      currentPage--;
    } else {
      currentPage = Number(target.innerHTML);
      resetPagination();
    }
  }

  resetPagination();
}

/**
 * @param previous The request address of the previous page.
 * @param next The request address of the next page.
 * @param countPages Count pages.
 * @param currentPage Current page.
 * @param step Pages before and after current.
 * @param position Where is the pagination located.
 */
function renderPagination(previous: string | null,
  next: string | null,
  countPages: number,
  currentPage: number,
  step: number,
  position: Element): void {
  let divHTML = ``;
  if (currentPage < step + 3) {
    for (let i = 1; i < step * 2 + 3; i++) {
      divHTML += `
            <button type="button">${i}</button>`;
    }
    divHTML += `
            <span>...</span>
            <button type="button">${countPages}</button>
            <button type="button" id='next_page' value='${next}'>&#9658;</button>`;
    position.innerHTML = divHTML;
  } else if (countPages - currentPage < step + 3) {
    const countViewNumberPage = step * 2;
    divHTML += `
            <button type="button" id='previous_page' value='${previous}'>&#9668;</button>
            <button type="button">1</button>
            <span>...</span>`;
    for (let i = 0; i <= countViewNumberPage; i++) {
      const numberPage = countPages + i - countViewNumberPage;
      divHTML += `
            <button type="button">${numberPage}</button>`;
    }
    position.innerHTML = divHTML;
  } else {
    divHTML += `
            <button type="button" id='previous_page' value='${previous}'>&#9668;</button>
            <button type="button">1</button>
            <span>...</span>`;
    for (let i = -step; i <= step; i++) {
      const numberPage = currentPage + i;
      divHTML += `
            <button type="button">${numberPage}</button>`;
    }
    divHTML += `
            <span>...</span>
            <button type="button">${countPages}</button>
            <button type="button" id='next_page' value='${next}'>&#9658;</button>`;
    position.innerHTML = divHTML;
  }
  highlightCurrentPage(position, currentPage);
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
