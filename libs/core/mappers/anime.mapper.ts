import { AnimeDto, AnimeStatusDto, AnimeTypeDto } from '../dtos/anime.dto';
import { Anime, AnimeStatus, AnimeType } from '../models/anime';

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
      type: fromDtoMapType[dto.type],
      status: fromDtoMapStatus[dto.status],
      airingStart: dto.aired.start === null ? null : new Date(dto.aired.start),
      airingFinish: dto.aired.end === null ? null : new Date(dto.aired.end),
    });
  }

  const fromDtoMapStatus: Readonly<Record<AnimeStatusDto, AnimeStatus>> = {
    [AnimeStatusDto.Airing]: 'On air',
    [AnimeStatusDto.Finished]: 'Finished',
    [AnimeStatusDto.NotYetAired]: 'Not yet aired',
  };

  const fromDtoMapType: Readonly<Record<AnimeTypeDto, AnimeType>> = {
    [AnimeTypeDto.Tv]: AnimeType.Tv,
    [AnimeTypeDto.Ova]: AnimeType.Ova,
    [AnimeTypeDto.Movie]: AnimeType.Movie,
    [AnimeTypeDto.Special]: AnimeType.Special,
    [AnimeTypeDto.Ona]: AnimeType.Ona,
    [AnimeTypeDto.Music]: AnimeType.Music,
  };

  export const toDtoMapType: Readonly<Record<AnimeType, AnimeTypeDto>> = {
    [AnimeType.Tv]: AnimeTypeDto.Tv,
    [AnimeType.Ova]: AnimeTypeDto.Ova,
    [AnimeType.Movie]: AnimeTypeDto.Movie,
    [AnimeType.Special]: AnimeTypeDto.Special,
    [AnimeType.Ona]: AnimeTypeDto.Ona,
    [AnimeType.Music]: AnimeTypeDto.Music,
  };
}
