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
    [AnimeStatusDto.Airing]: 'On air',
    [AnimeStatusDto.Finished]: 'Finished',
    [AnimeStatusDto.NotYetAired]: 'Not yet aired',
  };

  export const fromDtoMapType: Readonly<Record<AnimeTypeDto, AnimeType>> = {
    [AnimeTypeDto.Tv]: 'TV',
    [AnimeTypeDto.Ova]: 'OVA',
    [AnimeTypeDto.Movie]: 'Movie',
    [AnimeTypeDto.Special]: 'Special',
    [AnimeTypeDto.Ona]: 'ONA',
    [AnimeTypeDto.Music]: 'Music',
  };
}
