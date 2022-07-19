import { GenreDto } from './genre.dto';
import { StudioDto } from './studio.dto';

/** Available anime statuses. */
export enum AnimeStatusDto {
  Airing = 'AIRING',
  Finished = 'FINISHED',
  NotYetAired = 'NOT_YET_AIRED',
}

/** Available anime types. */
export enum AnimeTypeDto {
  Tv = 'TV',
  Ova = 'OVA',
  Movie = 'MOVIE',
  Special = 'SPECIAL',
  Ona = 'ONA',
  Music = 'MUSIC',
}

/** Anime DTO. */
export interface AnimeDto {

  /** Image of the anime. */
  readonly image: string;

  /** English name of the anime. */
  readonly title_eng: string;

  /** Japanese name of the anime. */
  readonly title_jpn: string;

  /** Type of the anime. */
  readonly type: AnimeTypeDto;

  /** Status of the anime. */
  readonly status: AnimeStatusDto;

  /** Aired date of the anime. */
  readonly aired: {

    /** Aired start, for example, "2014-12-20T17:30:50.416Z". */
    readonly start: string | null;

    /** Aired end, for example, "2014-12-20T17:30:50.416Z" or null. */
    readonly end: string | null;
  };

  /** Synopsis of the anime. */
  readonly synopsis?: string;

  /** Is the anime on the air. */
  readonly airing?: boolean;

  /** List of studios creating on anime. */
  readonly studios_data?: readonly StudioDto[];

  /** List of anime genres. */
  readonly genres_data?: readonly GenreDto[];
}
