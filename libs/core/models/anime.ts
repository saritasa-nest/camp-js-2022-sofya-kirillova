import { Immerable, OmitImmerable } from './immerable';

/** Available anime statuses. */
export type AnimeStatus = 'On air' | 'Finished' | 'Not yet aired';

/** Available anime types. */
export type AnimeType = 'TV' | 'OVA' | 'Movie' | 'Special' | 'ONA' | 'Music';

/** Anime. */
export class Anime extends Immerable {
  /** Anime ID. */
  public readonly id: number;

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

  public constructor(data: InitArgsAnime) {
    super();
    this.id = data.id;
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
