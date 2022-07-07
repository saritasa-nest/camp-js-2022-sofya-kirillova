/** Parameters for pagination. */
interface IBasePagination {

  /** The page from which the pagination begins. */
  readonly startPage: number;

  /** Maximum number of steps to the selected page. */
  readonly maxStepsSelectedPage: number;

  /** The block where the pagination is located. */
  readonly container: Element;
}

/** The parameters for the implementation of pagination. */
export interface IGetPaginationOptions extends IBasePagination {

  /** The number of results returned per page. */
  readonly pageSize: number;
}

/** Parameters for pagination visualization. */
export interface IRenderPaginationOptions extends IBasePagination {

  /** Total number of pages in pagination. */
  readonly countPages: number;
}
