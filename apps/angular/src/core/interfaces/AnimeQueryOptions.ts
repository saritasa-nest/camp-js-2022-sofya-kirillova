import { AnimeType } from '@js-camp/core/models/anime';
import { AnimeSort } from '@js-camp/core/models/animeSort';

/** */
export interface AnimeQueryParams {

  /** The number of results returned per page. */
  readonly limit: number;

  /** Requested page. */
  readonly page: number;

  /** Sorting. */
  readonly sort?: AnimeSort;

  /** Sorting. */
  readonly search?: string;

  /** Sorting. */
  readonly type?: AnimeType;
}
