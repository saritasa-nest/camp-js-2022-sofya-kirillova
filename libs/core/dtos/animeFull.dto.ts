import { AnimeCommonDto } from './animeCommon.dto';
import { GenreDto } from './genre.dto';
import { StudioDto } from './studio.dto';

/** Anime DTO. */
export interface AnimeFullDto extends AnimeCommonDto {

  /** Synopsis of the anime. */
  readonly synopsis: string;

  /** Is the anime on the air. */
  readonly airing: boolean;

  /** List of studios creating on anime. */
  readonly studios_data: readonly StudioDto[];

  /** List of anime genres. */
  readonly genres_data: readonly GenreDto[];
}
