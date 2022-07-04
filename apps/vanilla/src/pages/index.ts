import { isNull } from '../scripts/functions';
import { getPagination } from '../scripts/pagination';

const COUNT_ANIME_PAGE = 30;
const paginationDiv = document.querySelector('.pagination');
isNull(paginationDiv !== null);
getPagination(paginationDiv, COUNT_ANIME_PAGE);
