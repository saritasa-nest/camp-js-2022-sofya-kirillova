import { AnimeSort } from '@js-camp/core/models/animeSort';
import { assertNonNull } from '@js-camp/core/utils/assertNonNull';

import { getAnimeList } from '../requests/animeList';
import { renderAnimeTable } from '../scripts/animeTable';
import { Pagination } from '../scripts/pagination';
import { initializeSearch } from '../scripts/search';
import { initializeSort } from '../scripts/sort';

const SEARCH_INPUT = 'anime__search';

const paginationContainer = document.querySelector('.anime__pagination');
const sortContainer = document.querySelector<HTMLSelectElement>('.anime__sort');
const selectContent = document.querySelector<HTMLSelectElement>(`.${SEARCH_INPUT}`);
const pageSize = 30;
let currentPage = 1;
let sortOrder: AnimeSort = 'titleEng';
let search = '';

/**  Render sorting, anime table and pagination. */
async function renderAnime(): Promise<void> {
  assertNonNull(paginationContainer);
  assertNonNull(selectContent);
  assertNonNull(sortContainer);
  const paginationConfig = { pageSize, currentPage, order: sortOrder, search };
  const animeData = await getAnimeList(paginationConfig);
  const pagesCount = Math.ceil(animeData.count / pageSize);
  const pagination = new Pagination(paginationContainer, currentPage, pagesCount, setCurrentPage);

  pagination.renderPagination();
  initializeSort(sortContainer, sortOrder, setSortOrder);
  initializeSearch(selectContent, setSearch);
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

/**
 * Set the anime search.
 * @param searchTextInput Anime search text.
 */
function setSearch(searchTextInput: string): void {
  search = searchTextInput;
  renderAnime();
}

renderAnime();
