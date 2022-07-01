/** AnimeTable DTO. */
export interface IAnimeTable {

  /** Count. */
  readonly count: number;

  /** API of the next page. */
  readonly next: string | null;

  /** API of the previous page. */
  readonly previous: string | null;

  /** Anime data. */
  readonly results: readonly IAnime[];
}

/** Anime DTO. */
export interface IAnime {

  /** Image. */
  readonly image: string;

  /** English name. */
  readonly title_eng: string | null;

  /** Japanese name. */
  readonly title_jpn: string | null;

  /** Type. */
  readonly type: string;

  /** Status. */
  readonly status: string;

  /** Aired. */
  readonly aired: {

    /** Start. */
    start: string | null;

    /** End. */
    end: string | null;
  };
}
