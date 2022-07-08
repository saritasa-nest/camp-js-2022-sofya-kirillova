/** Parameters for pagination. */
export interface PaginationParameters {

  /** The page from which the pagination begins. */
  readonly startPage: number;

  /** Maximum number of steps to the selected page. */
  readonly maxStepsSelectedPage: number;

  /** The block where the pagination is located. */
  readonly container: Element;

  /** Total number of pages in pagination. */
  readonly pagesCount: number;
}
