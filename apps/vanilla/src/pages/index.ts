import { assertNonNull } from '@js-camp/core/utils/functions';

import { getPagination } from '../scripts/pagination';

const pageSize = 30;
const numberPage = 1;
const step = 3;
const paginationDiv = document.querySelector('.pagination');
assertNonNull(paginationDiv);
getPagination({
  container: paginationDiv,
  pageSize,
  currentPage: numberPage,
  step,
});
