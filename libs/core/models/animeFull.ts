import { AnimeCommon } from './animeCommon';
import { Genre } from './genre';
import { OmitImmerable } from './immerable';
import { Studio } from './studio';

/** Available anime sources. */
export enum AnimeSource{
  FourKomaManga = 'Four koma manga',
  Book = 'Book',
  CardGame = 'Card game',
  Game = 'Game',
  LightNovel = 'Light novel',
  Manga = 'Manga',
  MixedMedia = 'Mixed media',
  Music = 'Music',
  Novel = 'Novel',
  Original = 'Original',
  PictureBook = 'Picture book',
  Radio = 'Radio',
  VisualNovel = 'Visual novel',
  WebManga = 'Web manga',
  WebNovel = 'Web novel',
  Other = 'Other',
  Unknown = 'Unknown',
}

/** Available anime ratings. */
export enum AnimeRating{
  G = 'G',
  Pg = 'PG',
  Pg13 = 'PG-13',
  R17 = 'R-17',
  RPlus = 'R-PLUS',
  RX = 'R-X',
  Unknown = 'Unknown',
}

/** Available anime seasons. */
export enum AnimeSeason{
  Summer = 'Summer',
  Winter = 'Winter',
  Spring = 'Spring',
  Fall = 'Fall',
  NonSeasonal = 'Non seasonal',
}

/** Anime. */
export class AnimeFull extends AnimeCommon {
  /** Sources of the anime. */
  public readonly source: AnimeSource;

  /** Seasons of the anime. */
  public readonly season: AnimeSeason;

  /** Ratings of the anime. */
  public readonly rating: AnimeRating;

  /** Synopsis of the anime. */
  public readonly synopsis: string;

  /** Is the anime on the air. */
  public readonly airing: boolean;

  /** List of studios creating on anime. */
  public readonly studiosData: readonly Studio[];

  /** List of anime genres. */
  public readonly genresData: readonly Genre[];

  /** List of studios creating on anime. */
  public readonly studios: readonly number[];

  /** List of anime genres. */
  public readonly genres: readonly number[];

  public constructor(data: InitArgsAnime) {
    super(data);
    this.source = data.source;
    this.season = data.season;
    this.rating = data.rating;
    this.synopsis = data.synopsis;
    this.airing = data.airing;
    this.studiosData = data.studiosData;
    this.genresData = data.genresData;
    this.studios = data.studios;
    this.genres = data.genres;
  }
}

export type AnimeCreate = Omit<AnimeFull, 'studiosData' | 'genresData' | 'id'>;

type InitArgsAnime = OmitImmerable<AnimeFull>;
