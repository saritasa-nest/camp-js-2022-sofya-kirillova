/** Parameters for pagination. */
interface IBasePagination {
  /** Current page. */
  currentPage: number;

  /** Pages before and after the current page. */
  step: number;

  /** The block where the pagination is located.. */
  position: Element;
}

/** Getting parameters for pagination. */
export interface IGetPaginationOptions extends IBasePagination {

  /** The number of results returned per page. */
  pageSize: number;
}

/** Parameters for pagination visualization. */
export interface IRenderPaginationOptions extends IBasePagination {

  /** Total number of pages in pagination. */
  countPages: number;
}

/** Configuration of pagination for Sending a request to the database. */
export interface IPaginationConfig {

  /** The number of results returned per page. */
  pageSize: number;

  /** Current page. */
  currentPage: number;

  /** Anime sorting mode. */
  order: string;
}
