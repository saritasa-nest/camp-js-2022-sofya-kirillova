import { AnimeDto } from '../dtos/anime.dto';
import { Aired } from '../models/aired';
import { Anime } from '../models/anime';
import { AiredMapper } from './aired.mapper';

export namespace AnimeMapper {

  /**
   * Maps dto to model.
   * @param dto Anime dto.
   */
  export function fromDto(dto: AnimeDto): Anime {
    const aired = AiredMapper.fromDto(dto.aired);
    return new Anime({
      image: dto.image,
      titleEng: dto.title_eng,
      titleJpn: dto.title_jpn,
      type: dto.type,
      status: dto.status,
      aired,
    });
  }
}
