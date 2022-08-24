import { AnimeType } from '@js-camp/core/models/animeCommon';
import { AnimeSort, Order } from '@js-camp/core/models/animeSort';

/** Parameters for the anime query. */
export interface AnimeQueryParams {

  /**  Sort query. */
  readonly sort: AnimeSort;

  /** Search query. */
  readonly search: string;

  /** Types query. */
  readonly types: AnimeType[];
}

/** Parameters for the anime. */
export interface AnimeParams {

  /**  Order settings. */
  ordering: Order;

  /** Search settings. */
  search: string;

  /** Types settings. */
  types: AnimeType[];
}
