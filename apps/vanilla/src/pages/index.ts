import { assertNonNull } from '@js-camp/core/utils/functions';

import { getPagination } from '../scripts/pagination';

const PAGE_SIZE = 30;
const NUMBER_PAGE = 1;
const STEP = 3;
const paginationDiv = document.querySelector('.pagination');
assertNonNull(paginationDiv);
getPagination({
  position: paginationDiv,
  pageSize: PAGE_SIZE,
  currentPage: NUMBER_PAGE,
  step: STEP,
});
