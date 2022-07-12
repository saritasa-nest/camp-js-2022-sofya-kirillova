import { Status, Type } from "../models/anime";

/** Anime DTO. */
export interface AnimeDto {

  /** Image of the anime. */
  readonly image: string;

  /** English name of the anime. */
  readonly title_eng: string;

  /** Japanese name of the anime. */
  readonly title_jpn: string;

  /** Type of the anime. */
  readonly type: Type;

  /** Status of the anime. */
  readonly status: Status;

  /** Aired date of the anime. */
  readonly aired: {

    /** Aired start, for example, "2014-12-20T17:30:50.416Z". */
    readonly start: string;

    /** Aired end, for example, "2014-12-20T17:30:50.416Z". */
    readonly end: string;
  }
}
