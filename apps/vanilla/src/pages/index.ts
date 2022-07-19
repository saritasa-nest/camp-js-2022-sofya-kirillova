import { AnimeSort } from '@js-camp/core/models/animeSort';
import { AnimeType } from '@js-camp/core/models/animeType';
import { assertNonNull } from '@js-camp/core/utils/assertNonNull';

import { getAnimeList } from '../requests/animeList';
import { renderAnimeTable } from '../scripts/animeTable';
import { PaginationConfig, PaginationParameters } from '../scripts/interfaces';
import { renderPagination } from '../scripts/pagination';
import { initializeSort } from '../scripts/sort';
import { initializeTypeFiltering } from '../scripts/typeFilter';

const paginationContainer = document.querySelector('.anime__pagination');
const sortContainer = document.querySelector<HTMLSelectElement>('.anime__sort');
const typeFilterContainer = document.querySelector('.anime__filter');
const pageSize = 30;
let currentPage = 1;
let sortOrder: AnimeSort = 'titleEng';
let typeFilterValue: AnimeType | null = null;

/**  Render sorting, anime table and pagination. */
async function renderAnime(): Promise<void> {
  assertNonNull(paginationContainer);
  assertNonNull(sortContainer);
  assertNonNull(typeFilterContainer);

  const paginationConfig: PaginationConfig = { pageSize, currentPage, order: sortOrder, type: typeFilterValue };
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
  initializeTypeFiltering(typeFilterContainer, String(typeFilterValue), setTypeFilter);
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
 * Set the filter value by type.
 * @param value The filter value by type.
 */
function setTypeFilter(value: AnimeType | null): void {
  typeFilterValue = value;
  renderAnime();
}

renderAnime();
