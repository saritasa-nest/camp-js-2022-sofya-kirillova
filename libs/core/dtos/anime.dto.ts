import { AiredDto } from './aired.dto';

/** Anime DTO. */
export interface AnimeDto {

  /** Image of the anime. */
  readonly image: string;

  /** English name of the anime. */
  readonly title_eng: string;

  /** Japanese name of the anime. */
  readonly title_jpn: string;

  /** Type of the anime. */
  readonly type: string;

  /** Status of the anime. */
  readonly status: string;

  /** Aired date of the anime. */
  readonly aired: AiredDto;
}
