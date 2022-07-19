import { AnimeSort } from '@js-camp/core/models/animeSort';
import { AnimeType } from '@js-camp/core/models/animeType';

/** Parameters for pagination. */
export interface PaginationParameters {

  /** The page from which the pagination begins. */
  readonly startPage: number;

  /** The block where the pagination is located. */
  readonly paginationContainer: Element;

  /** Total number of pages in pagination. */
  readonly pagesCount: number;

  /** Return the current page number. */
  readonly returnCurrentPage: (currentPage: number) => void;
}

/** Parameters for button. */
export interface ButtonParameters {

  /** Content of the button tag. */
  readonly label: string | number;

  /** Value of the button tag. */
  readonly value?: string;

  /** The page from which the pagination begins. */
  readonly startPage: number;

  /** Return the current page number. */
  readonly returnCurrentPage: (currentPage: number) => void;

}

/** Parameters for getting anime. */
export interface PaginationConfig {

  /** The number of results returned per page. */
  readonly pageSize: number;

  /** Current page. */
  readonly currentPage: number;

  /** Sorting. */
  readonly order: AnimeSort;

  /** The value of type filtering. */
  readonly type: AnimeType | null;
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

/** Available attributes for the filter fields. */
export interface FieldOptions<T> {

  /** Option value. */
  readonly value: T;

  /** Displayed on the screen. */
  readonly label: string;
}
