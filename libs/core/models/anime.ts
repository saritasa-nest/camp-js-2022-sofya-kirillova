import { Aired } from './aired';
import { Immerable, OmitImmerable } from './immerable';

/** Anime. */
export class Anime extends Immerable {

  /** Image of the anime. */
  public readonly image: string;

  /** English name of the anime. */
  public readonly titleEnglish: string;

  /** Japanese name of the anime. */
  public readonly titleJapanese: string;

  /** Type anime of the anime. */
  public readonly type: string;

  /** Status of the anime. */
  public readonly status: string;

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
