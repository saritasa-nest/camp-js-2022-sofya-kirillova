import { Aired } from './aired';
import { Immerable, OmitImmerable } from './immerable';

/** Anime. */
export class Anime extends Immerable {

  /** Image of the anime. */
  public readonly image: string;

  /** English name of the anime. */
  public readonly titleEng: string;

  /** Japanese name of the anime. */
  public readonly titleJpn: string;

  /** Type anime of the anime. */
  public readonly type: string;

  /** Status of the anime. */
  public readonly status: string;

  /** Aired date of the anime. */
  public readonly aired: Aired;

  public constructor(data: PostInitArgsAnime) {
    super();
    this.image = data.image;
    this.titleEng = data.titleEng;
    this.titleJpn = data.titleJpn;
    this.type = data.type;
    this.status = data.status;
    this.aired = data.aired;
  }
}

type PostInitArgsAnime = OmitImmerable<Anime>;
