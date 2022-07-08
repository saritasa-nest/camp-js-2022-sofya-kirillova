import { assertNonNull } from '@js-camp/core/utils/functions';

import { renderAnimeTable } from '../pages/animeTable';
import { renderPagination } from '../pages/pagination';

import { getAnime } from './requests';
import { SortingOptions } from './unions';

/** Implements output and re-rendering of the anime table and pagination. */
export class MainPage {

  /** Selected page in the pagination. */
  public currentPage: number;

  /** The block where the pagination is located. */
  public readonly container: Element;

  /** Sorting mode. */
  public order: SortingOptions;

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

  /** Adds event handlers to elements. */
  public addEventHandlers(): void {
    this.container.addEventListener('click', event => this.handlePageButtonClick(event));
    const selectElement = document.querySelector<HTMLSelectElement>('.anime__sort');
    assertNonNull(selectElement);
    selectElement.addEventListener('change', (event: Event) => {
      if (!(event.target instanceof HTMLSelectElement)) {
        return;
      }
      const { target } = event;
      this.order = target.value as SortingOptions;
      this.redrawMainPage();
    });
    this.redrawMainPage();
  }

  /** Request anime from the database and cause redrawing of the anime table and pagination. */
  private async redrawMainPage(): Promise<void> {
    const paginationConfig = {
      pageSize: this.pageSize,
      currentPage: this.currentPage,
      order: this.order,
    };

    const animeData = await getAnime(paginationConfig);
    renderAnimeTable(animeData);

    const paginationParameters = {
      pagesCount: Math.ceil(animeData.count / this.pageSize),
      maxStepsSelectedPage: this.maxStepsSelectedPage,
      container: this.container,
      startPage: this.currentPage,
    };
    renderPagination(paginationParameters);
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
    } else if (isNaN(Number(target.innerHTML))) {
      throw new Error('Page number is not a number.');
    } else {
      this.currentPage = Number(target.innerHTML);
    }
    this.redrawMainPage();
  }
}
