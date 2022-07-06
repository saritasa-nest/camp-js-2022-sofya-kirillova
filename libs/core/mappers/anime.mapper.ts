import { AnimeDto } from '../dtos/anime.dto';
import { Anime } from '../models/anime';

import { AiredMapper } from './aired.mapper';

export namespace AnimeMapper {

  /**
   * Maps dto to model.
   * @param dto Anime dto.
   */
  export function fromDto(dto: AnimeDto): Anime {
    return new Anime({
      image: dto.image,
      titleEnglish: dto.title_eng,
      titleJapanese: dto.title_jpn,
      type: dto.type,
      status: dto.status,
      aired: AiredMapper.fromDto(dto.aired),
    });
  }
}
