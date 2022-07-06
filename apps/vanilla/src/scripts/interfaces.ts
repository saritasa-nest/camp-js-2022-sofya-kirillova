/** Getting parameters for pagination. */
export interface IGetPaginationOptions {

  /** The block where the pagination is located. */
  position: Element;

  /** The number of results returned per page. */
  pageSize: number;

  /** Current page. */
  currentPage: number;

  /** Pages before and after the current page. */
  step: number;
}

/** Parameters for pagination visualization. */
export interface IRenderPaginationOptions {

  /** Total number of pages in pagination. */
  countPages: number;

  /** Current page. */
  currentPage: number;

  /** Pages before and after the current page. */
  step: number;

  /** The block where the pagination is located.. */
  position: Element;
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
