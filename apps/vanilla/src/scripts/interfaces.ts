/** Parameters for pagination. */
interface IBasePagination {

  /** Current page. */
  readonly currentPage: number;

  /** Pages before and after the current page. */
  readonly step: number;

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
