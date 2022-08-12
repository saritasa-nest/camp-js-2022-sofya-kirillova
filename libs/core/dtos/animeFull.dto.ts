import { AnimeCommonDto } from './animeCommon.dto';
import { GenreDto } from './genre.dto';
import { StudioDto } from './studio.dto';

/** Available anime sources. */
export enum AnimeSourceDto {
  FourKomaManga = 'FOUR_KOMA_MANGA',
  Book = 'BOOK',
  CardGame = 'CARD_GAME',
  Game = 'GAME',
  LightNovel = 'LIGHT_NOVEL',
  Manga = 'MANGA',
  MixedMedia = 'MIXED_MEDIA',
  Music = 'MUSIC',
  Novel = 'NOVEL',
  Original = 'ORIGINAL',
  PictureBook = 'PICTURE_BOOK',
  Radio = 'RADIO',
  VisualNovel = 'VISUAL_NOVEL',
  WebManga = 'WEB_MANGA',
  WebNovel = 'WEB_NOVEL',
  Other = 'OTHER',
  Unknown = 'UNKNOWN',
}

/** Available anime ratings. */
export enum AnimeRatingDto {
  G = 'G',
  Pg = 'PG',
  Pg13 = 'PG_13',
  R17 = 'R_17',
  RPlus = 'R_PLUS',
  RX = 'R_X',
  Unknown = 'UNKNOWN',
}

/** Available anime seasons. */
export enum AnimeSeasonDto {
  Summer = 'SUMMER',
  Winter = 'WINTER',
  Spring = 'SPRING',
  Fall = 'FALL',
  NonSeasonal = 'NON_SEASONAL',
}

/** Anime DTO. */
export interface AnimeFullDto extends AnimeCommonDto {

  /** Sources of the anime. */
  readonly source: AnimeSourceDto;

  /** Seasons of the anime. */
  readonly season: AnimeSeasonDto;

  /** Ratings of the anime. */
  readonly rating: AnimeRatingDto;

  /** Synopsis of the anime. */
  readonly synopsis: string;

  /** Is the anime on the air. */
  readonly airing: boolean;

  /** List of studios creating on anime. */
  readonly studios_data: readonly StudioDto[];

  /** List of anime genres. */
  readonly genres_data: readonly GenreDto[];

  /** List of studios creating on anime. */
  readonly studios: readonly number[];

  /** List of anime genres. */
  readonly genres: readonly number[];
}

// /** DTO for creating anime. */
// export interface AnimeCreateDto extends AnimeFullDto {

//   /** List of studios creating on anime. */
//   readonly studios_data: readonly number[];

//   /** List of anime genres. */
//   readonly genres_data: readonly GenreDto[];
// }
export interface AnimeCreateDto extends Omit<AnimeFullDto, 'studios_data' | 'genres_data' | 'id' | 'image' | 'title_eng' | 'title_jpn'> {

  /** Image of the anime. */
  readonly image?: string;

  /** English name of the anime. */
  readonly title_eng?: string;

  /** Japanese name of the anime. */
  readonly title_jpn?: string;
}
