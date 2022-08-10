import { AnimeFullDto } from '../dtos/animeFull.dto';
import { AnimeFull } from '../models/animeFull';
import { Genre } from '../models/genre';
import { Studio } from '../models/studio';

import { AnimeCommonMapper } from './animeCommon.mapper';

export namespace AnimeFullMapper {

  /**
   * Maps dto to model.
   * @param dto Anime dto.
   */
  export function fromDto(dto: AnimeFullDto): AnimeFull {
    const genresData = dto.genres_data.map(genre => new Genre({
      id: genre.id,
      name: genre.name,
    }));
    const studiosData = dto.studios_data.map(studio => new Studio({
      id: studio.id,
      name: studio.name,
    }));

    return new AnimeFull({
      id: dto.id,
      image: dto.image,
      titleEnglish: dto.title_eng,
      titleJapanese: dto.title_jpn,
      type: AnimeCommonMapper.fromDtoMapType[dto.type],
      status: AnimeCommonMapper.fromDtoMapStatus[dto.status],
      airingStart: dto.aired.start === null ? null : new Date(dto.aired.start),
      airingFinish: dto.aired.end === null ? null : new Date(dto.aired.end),
      synopsis: dto.synopsis,
      airing: dto.airing,
      studiosData,
      genresData,
    });
  }
}
