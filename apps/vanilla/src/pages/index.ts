import { assertNonNull } from '@js-camp/core/utils/functions';

import { getPagination } from '../scripts/pagination';

const COUNT_ANIME_PAGE = 30;
const paginationDiv: HTMLDivElement | null = document.querySelector('.pagination');
assertNonNull(paginationDiv);
getPagination(paginationDiv, COUNT_ANIME_PAGE);
