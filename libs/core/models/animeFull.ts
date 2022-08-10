import { AnimeCommon } from './animeCommon';
import { Genre } from './genre';
import { OmitImmerable } from './immerable';
import { Studio } from './studio';

/** Anime. */
export class AnimeFull extends AnimeCommon {

  /** Synopsis of the anime. */
  public readonly synopsis: string;

  /** Is the anime on the air. */
  public readonly airing: boolean;

  /** List of studios creating on anime. */
  public readonly studiosData: Studio[];

  /** List of anime genres. */
  public readonly genresData: Genre[];

  public constructor(data: InitArgsAnime) {
    super(data);
    this.synopsis = data.synopsis;
    this.airing = data.airing;
    this.studiosData = data.studiosData;
    this.genresData = data.genresData;
  }
}

type InitArgsAnime = OmitImmerable<AnimeFull>;
