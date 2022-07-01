/** Anime DTO. */
export interface AnimeDto {

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
    readonly start: string | null;

    /** End. */
    readonly end: string | null;
  };
}
