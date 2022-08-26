import { AnimeSort as Order } from '@js-camp/core/models/animeSort';
import { assertNonNull } from '@js-camp/core/utils/assertNonNull';

import { getAnimeList } from '../requests/animeList';
import { renderAnimeTable } from '../scripts/animeTable';
import { PaginationConfig, PaginationParameters } from '../scripts/interfaces';
import { renderPagination } from '../scripts/pagination';
import { initializeSort } from '../scripts/sort';

const paginationContainer = document.querySelector<HTMLDivElement>('.anime__pagination');
const sortContainer = document.querySelector<HTMLSelectElement>('.anime__sort');
const pageSize = 30;
let currentPage = 1;
let sortOrder: Order = 'titleEnglish';

/**  Render sorting, anime table and pagination. */
async function renderAnime(): Promise<void> {
  assertNonNull(paginationContainer);
  assertNonNull(sortContainer);

  const paginationConfig: PaginationConfig = { pageSize, page: currentPage, order: sortOrder };
  const animeData = await getAnimeList(paginationConfig);
  const pagesCount = Math.ceil(animeData.count / pageSize);
  const paginationParameters: PaginationParameters = {
    paginationContainer,
    startPage: currentPage,
    pagesCount,
    returnCurrentPage: setCurrentPage,
  };

  renderPagination(paginationParameters);
  initializeSort(sortContainer, sortOrder, setSortOrder);
  renderAnimeTable(animeData.results);
}

/**
 * Set the current pagination page.
 * @param page Current pagination page.
 */
function setCurrentPage(page: number): void {
  currentPage = page;
  renderAnime();
}

/**
 * Set the anime sorting order.
 * @param order Anime sorting order.
 */
function setSortOrder(order: Order): void {
  sortOrder = order;
  renderAnime();
}

renderAnime();
