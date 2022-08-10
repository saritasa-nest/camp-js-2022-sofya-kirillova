import { AnimeType } from '@js-camp/core/models/animeCommon';
import { AnimeSort } from '@js-camp/core/models/animeSort';

/** Parameters for the anime query. */
export interface AnimeQueryParams {

  /** The number of results returned per page. */
  readonly limit: number;

  /** Requested page. */
  readonly page: number;

  /**  Sort settings. */
  readonly sort: AnimeSort;

  /** Search query. */
  readonly search: string;

  /** Types settings. */
  readonly types: AnimeType[];
}
