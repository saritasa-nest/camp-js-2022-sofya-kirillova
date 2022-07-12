//delete in index
import { SortDTO } from '@js-camp/core/dtos/sort.dto';

import { assertNonNull } from '@js-camp/core/utils/assertNonNull';

import { getAnimeList } from '../requests/animeList';

import { renderAnimeTable } from './animeTable';
import { renderPagination } from './pagination';

/** Render anime table and pagination. */
export class MainPage {

  /** Selected page in the pagination. */
  public currentPage: number;

  /** The block where the pagination is located. */
  public readonly container: Element;

  /** Sorting mode. */
  public order: SortDTO;

  /** The number of results returned per page. */
  public readonly pageSize: number;

  /** Maximum number of steps to the selected page. */
  public readonly maxStepsSelectedPage: number;

  public constructor(firstPageNumber: number, container: Element, pageSize: number, maxStepsSelectedPage: number) {
    this.currentPage = firstPageNumber;
    this.container = container;
    this.order = 'title_eng';
    this.pageSize = pageSize;
    this.maxStepsSelectedPage = maxStepsSelectedPage;
  }

  /** Initialize the pagination. */
  public paginatorInitialization(): void {
    this.container.addEventListener('click', event => this.handlePageButtonClick(event));
    this.addListenersToSorting();
    this.redrawMainPage();
  }

  /** Adds event handlers to elements. */
  private addListenersToSorting(): void {
    const sortContainer = document.querySelector<HTMLSelectElement>('.anime__sort');
    assertNonNull(sortContainer);
    sortContainer.addEventListener('change', (event: Event) => {
      if (!(event.target instanceof HTMLSelectElement)) {
        return;
      }
      const { target } = event;
      this.order = target.value as SortDTO;
      this.redrawMainPage();
    });
  }

  /** Request anime from the database and cause redrawing of the anime table and pagination. */
  private async redrawMainPage(): Promise<void> {
    const paginationConfig = {
      pageSize: this.pageSize,
      currentPage: this.currentPage,
      order: this.order,
    };

    const animeData = await getAnimeList(paginationConfig);
    renderAnimeTable(animeData);

    const paginationParameters = {
      pagesCount: Math.ceil(animeData.count / this.pageSize),
      maxStepsSelectedPage: this.maxStepsSelectedPage,
      container: this.container,
      startPage: this.currentPage,
    };
    renderPagination(paginationParameters, this.setCurrentPage);
  }

  public setCurrentPage(page: number): void {
    this.currentPage = page;
    this.redrawMainPage();
  }

  public setSortOrder(page: number): void {
    this.currentPage = page;
    this.redrawMainPage();
  }
  /**
   * Page rendering on click.
   * @param event The pressed button.
   */
  private handlePageButtonClick(event: Event): void {
    if (!(event.target instanceof HTMLButtonElement)) {
      return;
    }
    scrollTo(0, 0);
    const { target } = event;
    if (target.value === 'next_page') {
      this.currentPage++;
    } else if (target.value === 'previous_page') {
      this.currentPage--;
    } else if (target.hasAttribute('date-page-number') === false || isNaN(Number(target.getAttribute('date-page-number')))) {
      throw new Error('Page number not found.');
    } else {
      this.currentPage = Number(target.getAttribute('date-page-number'));
    }
    this.redrawMainPage();
  }
}
