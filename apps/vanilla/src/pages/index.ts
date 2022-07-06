import { assertNonNull } from '@js-camp/core/utils/functions';

import { getPagination } from '../scripts/pagination';

const NUMBER_OF_ANIME_ONE_PAGE = 30;
const NUMBER_PAGE = 1;
const STEP = 3;
const paginationDiv: HTMLDivElement | null = document.querySelector('.pagination');
assertNonNull(paginationDiv);
getPagination({
  position: paginationDiv,
  pageSize: NUMBER_OF_ANIME_ONE_PAGE,
  currentPage: NUMBER_PAGE,
  step: STEP,
});
