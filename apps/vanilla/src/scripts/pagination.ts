import { animeTableOutput } from '../pages/anime_table';

import { apiAnimeTable } from './api';

/**
 * Implementation of pagination.
 * @param position Where is the pagination located.
 * @param size Number of results to return per page.
 * @param step Pages before and after current.
 * @param page Current page.
 */
export function pagination(position: Element, size = 25, step = 3, page = 1): void {
  let currentPage = page;
  position.addEventListener('click', event => onClick(event));
  const selectElement = document.querySelector('#sort-anime-table');
  if (selectElement === null) {
    throw new Error('not element');
  }
  let ordering = 'title_eng';
  selectElement.addEventListener('change', (event: Event) => {
    const target = event.target as HTMLSelectElement;
    sort(target.value);
  });

  /**
   * Requests the anime table and calls the rendering.
   * @param apiAddress API.
   */
  function start(apiAddress: string | undefined = undefined): void {
    const animePromise = apiAnimeTable(size, currentPage, ordering, apiAddress);
    animeTableOutput(animePromise);
    animePromise.then(animeData => {
      const countPage = Math.ceil(animeData.count / size);
      rendering(animeData.previous, animeData.next, countPage);
    });
  }

  /**
   * Changing the sorting of the anime table.
   * @param value Selected sorting type.
   */
  function sort(value: string): void {
    ordering = value;
    start();
  }

  /**
   * Pagination display on the page.
   * @param previous Api of the previous page.
   * @param next Api of the next page.
   * @param countPages Count pages.
   */
  const rendering = ((previous: string | null, next: string | null, countPages: number): void => {
    let divHTML = ``;
    if (currentPage < step + 3) {
      for (let i = 1; i < step * 2 + 3; i++) {
        divHTML += `
            <button>${i}</button>`;
      }
      divHTML += `
            <span>...</span>
            <button>${countPages}</button>
            <button id='next_page' value='${next}'>&#9658;</button>`;
      position.innerHTML = divHTML;
    } else if (countPages - currentPage < step + 3) {
      const countViewNumberPage = step * 2;
      divHTML += `
            <button id='previous_page' value='${previous}'>&#9668;</button>
            <button>1</button>
            <span>...</span>`;
      for (let i = 0; i <= countViewNumberPage; i++) {
        const numberPage = countPages + i - countViewNumberPage;
        divHTML += `
            <button>${numberPage}</button>`;
      }
      position.innerHTML = divHTML;
    } else {
      divHTML += `
            <button id='previous_page' value='${previous}'>&#9668;</button>
            <button>1</button>
            <span>...</span>`;
      for (let i = -step; i <= step; i++) {
        const numberPage = +currentPage + +i;
        divHTML += `
            <button>${numberPage}</button>`;
      }
      divHTML += `
            <span>...</span>
            <button>${countPages}</button>
            <button id='next_page' value='${next}'>&#9658;</button>`;
      position.innerHTML = divHTML;
    }
    highlighting();
  });

  /** Highlights the selected page. */
  function highlighting(): void {
    const buttonPagination = Array.from(position.children);
    for (const elem of buttonPagination) {
      if (+elem.innerHTML === +currentPage) {
        elem.className = 'current-page';
      }
    }
  }

  /**
   * Page rendering on click.
   * @param event The pressed button.
   */
  function onClick(event: Event): void {
    scrollTo(0, 0);
    const target = event.target as HTMLButtonElement;
    if (target.value === 'next_page') {
      currentPage++;

    } else if (target.value === 'previous_page') {
      currentPage--;
    } else {
      currentPage = +target.innerHTML;
      start();
    }
  }
  start();
}
