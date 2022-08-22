import { AnimeCommonDto, AnimeStatusDto, AnimeTypeDto } from '../dtos/animeCommon.dto';
import { AnimeCommon, AnimeStatus, AnimeType } from '../models/animeCommon';

export namespace AnimeCommonMapper {

  /**
   * Maps dto to model.
   * @param dto Anime dto.
   */
  export function fromDto(dto: AnimeCommonDto): AnimeCommon {

    return new AnimeCommon({
      id: dto.id,
      image: dto.image,
      titleEnglish: dto.title_eng,
      titleJapanese: dto.title_jpn,
      type: fromDtoMapType[dto.type],
      status: fromDtoMapStatus[dto.status],
      airingStart: dto.aired.start === null ? null : new Date(dto.aired.start),
      airingFinish: dto.aired.end === null ? null : new Date(dto.aired.end),
    });
  }

  export const fromDtoMapStatus: Readonly<Record<AnimeStatusDto, AnimeStatus>> = {
    [AnimeStatusDto.Airing]: AnimeStatus.Airing,
    [AnimeStatusDto.Finished]: AnimeStatus.Finished,
    [AnimeStatusDto.NotYetAired]: AnimeStatus.NotYetAired,
  };

  export const toDtoMapStatus: Readonly<Record<AnimeStatus, AnimeStatusDto>> = {
    [AnimeStatus.Airing]: AnimeStatusDto.Airing,
    [AnimeStatus.Finished]: AnimeStatusDto.Finished,
    [AnimeStatus.NotYetAired]: AnimeStatusDto.NotYetAired,
  };

  export const fromDtoMapType: Readonly<Record<AnimeTypeDto, AnimeType>> = {
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
