import { AnimeDto } from '../dtos/anime.dto';
import { Anime } from '../models/anime';

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
      airingStart: dto.aired.start === null ? null : new Date(dto.aired.start),
      airingFinish: dto.aired.end === null ? null : new Date(dto.aired.end),
    });
  }
}