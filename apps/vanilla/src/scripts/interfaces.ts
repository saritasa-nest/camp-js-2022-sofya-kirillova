import { AnimeSort } from '@js-camp/core/models/animeSort';

/** Parameters for pagination. */
export interface PaginationParameters {

  /** The page from which the pagination begins. */
  readonly startPage: number;

  /** The block where the pagination is located. */
  readonly paginationContainer: HTMLDivElement;

  /** Total number of pages in pagination. */
  readonly pagesCount: number;

  /** Return the current page number. */
  readonly returnCurrentPage: (currentPage: number) => void;
}

/** Parameters for button. */
export interface ButtonParameters {

  /** The label that is displayed on the screen. */
  readonly label: string | number;

  /** Value of the button tag. */
  readonly value?: string;

  /** The page from which the pagination begins. */
  readonly startPage: number;

}

/** Parameters for getting anime. */
export interface PaginationConfig {

  /** The number of results returned per page. */
  readonly pageSize: number;

  /** Requested page. */
  readonly page: number;

  /** Sorting. */
  readonly order: AnimeSort;
}

/** Parameters for pagination limit. */
export interface PaginationLimitOptions {

  /** Side of the pagination limit location. */
  isLeftLimit: boolean;

  /** Total number of pages in pagination. */
  pagesCount: number;

  /** The block where the pagination is located. */
  paginationContainer: Element;
}
