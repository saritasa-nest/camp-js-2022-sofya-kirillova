import { AnimeSource, AnimeSeason, AnimeRating } from '@js-camp/core/models/animeFull';
import { Genre } from '@js-camp/core/models/genre';
import { Studio } from '@js-camp/core/models/studio';

/** */
export interface AnimeExtension{

  /** Anime ID. */
  readonly id: number;

  /** Sources of the anime. */
  readonly source: AnimeSource;

  /** Seasons of the anime. */
  readonly season: AnimeSeason;

  /** Ratings of the anime. */
  readonly rating: AnimeRating;

  /** Synopsis of the anime. */
  readonly synopsis: string;

  /** Is the anime on the air. */
  readonly airing: boolean;

  /** List of studios creating on anime. */
  readonly studiosData: readonly Studio[];

  /** List of anime genres. */
  readonly genresData: readonly Genre[];

  /** List of studios creating on anime. */
  readonly studios: readonly number[];

  /** List of anime genres. */
  readonly genres: readonly number[];
}
