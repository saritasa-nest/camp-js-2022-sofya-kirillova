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
export interface AnimeCommonDto {

  /** Anime ID. */
  readonly id: number;

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
}
