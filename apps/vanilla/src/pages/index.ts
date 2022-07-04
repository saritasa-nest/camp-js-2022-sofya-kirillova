import { getPagination } from '../scripts/pagination';

const COUNT_ANIME_PAGE = 30;
const paginationDiv = document.querySelector('.pagination');
if (paginationDiv === null) {
  throw new Error('not element');
}
getPagination(paginationDiv, COUNT_ANIME_PAGE);
