import { AnimeSort } from '@js-camp/core/models/animeSort';
import { assertNonNull } from '@js-camp/core/utils/assertNonNull';

import { getAnimeList } from '../requests/animeList';
import { renderAnimeTable } from '../scripts/animeTable';
import { Pagination } from '../scripts/pagination';
import { sortInitialization } from '../scripts/sort';

const paginationContainer = document.querySelector('.anime__pagination');
const sortContainer = document.querySelector('.anime__sort');
const pageSize = 30;
let currentPage = 1;
let sortOrder: AnimeSort = 'titleEng';

/**  Render sorting, anime table and pagination. */
async function renderAnime(): Promise<void> {
  // console.log(234)
  assertNonNull(paginationContainer);
  if (!(sortContainer instanceof HTMLSelectElement)) {
    return;
  }

  const paginationConfig = { pageSize, currentPage, order: sortOrder };
  const animeData = await getAnimeList(paginationConfig);
  const pagesCount = Math.ceil(animeData.count / pageSize);
  const pagination = new Pagination(paginationContainer, currentPage, pagesCount, setCurrentPage);

  pagination.renderPagination();
  sortInitialization(sortContainer, sortOrder, setSortOrder);
  renderAnimeTable(animeData.results);
}

/**
 * Set the Current pagination page.
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
function setSortOrder(order: AnimeSort): void {
  sortOrder = order;
  renderAnime();
}

renderAnime();
