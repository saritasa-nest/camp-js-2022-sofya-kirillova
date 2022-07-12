import { assertNonNull } from '@js-camp/core/utils/assertNonNull';
import { getAnimeList } from '../requests/animeList';
import { renderAnimeTable } from '../scripts/animeTable';
import { Pagination } from '../scripts/pagination';
import { sortInitialization } from '../scripts/sort';

const paginationContainer = document.querySelector('.anime__pagination');
const sortContainer = document.querySelector('.anime__sort');
const pageSize = 30
let currentPage = 1;
let sortOrder = 'title_eng'

async function redrawMainPage() {
  // console.log(234)
  assertNonNull(paginationContainer);
  assertNonNull(sortContainer);

  const paginationConfig = { pageSize, currentPage, order: sortOrder };
  const animeData = await getAnimeList(paginationConfig);
  const pagesCount = Math.ceil(animeData.count / pageSize) 
  const pagination = new Pagination(paginationContainer, currentPage, pagesCount,setCurrentPage)

  pagination.renderPagination()
  sortInitialization(sortContainer, setSortOrder);
  renderAnimeTable(animeData.results)
}

function setCurrentPage(page: number): void {
  currentPage = page;
  console.log(currentPage)
  redrawMainPage();
}

function setSortOrder(order: string): void {
  console.log(9844)
  sortOrder = order;
  redrawMainPage();
}

redrawMainPage()






// /** Available attributes for the option. */ //mapper
// interface OptionAttributes {

//   /** Option value. */
//   readonly value: SortDTO;

//   /** Option title. */
//   readonly title: string;
// }
// addSelect();

// // const pageSize = 30;
// const firstPageNumber = 1;
// const maxStepsSelectedPage = 3;
// const paginationDiv = document.querySelector('.pagination');
// assertNonNull(paginationDiv);

// const pagination = new MainPage(firstPageNumber, paginationDiv, pageSize, maxStepsSelectedPage);
// pagination.paginatorInitialization(paginationDiv, animeList, callback);
// pagination.sortInitialization(sortDiv, callback);

// /** Create and add select to the page. */
// function addSelect(): void {
//   const selectOptions: OptionAttributes[] = [
//     {
//       value: 'title_eng',
//       title: 'eng_title',
//     },
//     {
//       value: 'aired__startswith',
//       title: 'aired start',
//     },
//     {
//       value: 'status',
//       title: 'status',
//     },
//   ];

//   const divElement = document.querySelector('.anime');
//   assertNonNull(divElement);

//   const select = document.createElement('select');
//   select.className = 'anime__sort';

//   const selectContent = selectOptions.reduce((body, current) => {
//     const optionContent = `
//       <option value="${current.value}">${current.title}</option>`;
//     return body + optionContent;
//   }, ``);

//   select.innerHTML = selectContent;
//   divElement.prepend(select);
// }
