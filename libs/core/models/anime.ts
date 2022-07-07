import { Aired } from './aired';
import { Immerable, OmitImmerable } from './immerable';

/** Available anime statuses. */
enum Status {
  Airing = 'AIRING',
  Finished = 'FINISHED',
  NotYetAired = 'NOT_YET_AIRED',
}

/** Available anime types. */
enum Type {
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

  /** Aired date of the anime. */
  public readonly aired: Aired;

  public constructor(data: InitArgsAnime) {
    super();
    this.image = data.image;
    this.titleEnglish = data.titleEnglish;
    this.titleJapanese = data.titleJapanese;
    this.type = data.type;
    this.status = data.status;
    this.aired = data.aired;
  }
}

type InitArgsAnime = OmitImmerable<Anime>;
