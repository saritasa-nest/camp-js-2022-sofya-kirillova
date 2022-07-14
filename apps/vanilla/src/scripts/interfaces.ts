/** Parameters for pagination. */
export interface PaginationParameters {

  /** The page from which the pagination begins. */
  readonly startPage: number;

  /** The block where the pagination is located. */
  readonly container: Element;

  /** Total number of pages in pagination. */
  readonly pagesCount: number;
}

/** Parameters for button. */
export interface ButtonParameters {

  /** Content of the button tag. */
  readonly content: string | number;

  /** Value of the button tag. */
  readonly value?: string;

}

/** Available attributes for the filter fields. */
export interface FieldOptions<T> {

  /** Option value. */
  readonly value: T;

  /** Option title. */
  readonly showTitle: string;
}
