import { Genre } from './genre';
import { Immerable, OmitImmerable } from './immerable';
import { Studio } from './studio';

/** Available anime statuses. */
export type AnimeStatus = 'On air' | 'Finished' | 'Not yet aired';

/** Available anime types. */
export type AnimeType = 'TV' | 'OVA' | 'Movie' | 'Special' | 'ONA' | 'Music';

/** Anime. */
export class Anime extends Immerable {

  /** Image of the anime. */
  public readonly image: string;

  /** English name of the anime. */
  public readonly titleEnglish: string;

  /** Japanese name of the anime. */
  public readonly titleJapanese: string;

  /** Type anime of the anime. */
  public readonly type: AnimeType;

  /** Status of the anime. */
  public readonly status: AnimeStatus;

  /** Start date of airing. */
  public readonly airingStart: Date | null;

  /** End date of airing. */
  public readonly airingFinish: Date | null;

  /** Synopsis of the anime. */
  public readonly synopsis?: string;

  /** Is the anime on the air. */
  public readonly airing?: boolean;

  /** List of studios creating on anime. */
  public readonly studiosData?: Studio[];

  /** List of anime genres. */
  public readonly genresData?: Genre[];

  public constructor(data: InitArgsAnime) {
    super();
    this.image = data.image;
    this.titleEnglish = data.titleEnglish;
    this.titleJapanese = data.titleJapanese;
    this.type = data.type;
    this.status = data.status;
    this.airingStart = data.airingStart;
    this.airingFinish = data.airingFinish;
    this.synopsis = data.synopsis;
    this.airing = data.airing;
    this.studiosData = data.studiosData;
    this.genresData = data.genresData;
  }
}

type InitArgsAnime = OmitImmerable<Anime>;
