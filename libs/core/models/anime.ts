import { Immerable, OmitImmerable } from './immerable';

/** Available anime statuses. */
export enum Status {
  Airing = 'AIRING',
  Finished = 'FINISHED',
  NotYetAired = 'NOT_YET_AIRED',
}

/** Available anime types. */
export enum Type {
  Tv = 'TV',
  Ova = 'OVA',
  Movie = 'MOVIE',
  Special = 'SPECIAL',
  Ona = 'ONA',
  Music = 'MUSIC',
}

/** Anime. */
export class Anime extends Immerable {

  /** Image of the anime. */
  public readonly image: string;

  /** English name of the anime. */
  public readonly titleEnglish: string;

  /** Japanese name of the anime. */
  public readonly titleJapanese: string;

  /** Type anime of the anime. */
  public readonly type: Type;

  /** Status of the anime. */
  public readonly status: Status;

  /** Start date of airing. */
  public readonly airingStart: Date;

  /** End date of airing. */
  public readonly airingFinish: Date;

  public constructor(data: InitArgsAnime) {
    super();
    this.image = data.image;
    this.titleEnglish = data.titleEnglish;
    this.titleJapanese = data.titleJapanese;
    this.type = data.type;
    this.status = data.status;
    this.airingStart = data.airingStart;
    this.airingFinish = data.airingFinish;
  }
}

type InitArgsAnime = OmitImmerable<Anime>;
