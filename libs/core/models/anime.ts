import { Immerable, OmitImmerable } from './immerable';

/** Genre. */
export class Anime extends Immerable {

  /** Image. */
  public readonly image: string;

  /** English name. */
  public readonly titleEng: string | null;

  /** Japanese name. */
  public readonly titleJpn: string | null;

  /** Type. */
  public readonly type: string;

  /** Status. */
  public readonly status: string;

  /** Aired. */
  public readonly aired: {

    /** Start. */
    start: string | null;

    /** End. */
    end: string | null;
  };

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
