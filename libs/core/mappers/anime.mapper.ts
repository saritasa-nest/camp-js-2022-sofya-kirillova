import { AnimeDto, AnimeStatusDto, AnimeTypeDto } from '../dtos/anime.dto';
import { Anime, AnimeStatus, AnimeType } from '../models/anime';
import { Genre } from '../models/genre';
import { Studio } from '../models/studio';

export namespace AnimeMapper {

  /**
   * Maps dto to model.
   * @param dto Anime dto.
   */
  export function fromDto(dto: AnimeDto): Anime {
    const genresData = dto.genres_data?.map(genre => new Genre({
      id: genre.id,
      name: genre.name,
    }));
    const studiosData = dto.studios_data?.map(studio => new Studio({
      id: studio.id,
      name: studio.name,
    }));
    return new Anime({
      image: dto.image,
      titleEnglish: dto.title_eng,
      titleJapanese: dto.title_jpn,
      type: fromDtoMapType[dto.type],
      status: fromDtoMapStatus[dto.status],
      airingStart: dto.aired.start === null ? null : new Date(dto.aired.start),
      airingFinish: dto.aired.end === null ? null : new Date(dto.aired.end),
      synopsis: dto.synopsis,
      airing: dto.airing,
      studiosData,
      genresData,
    });
  }

  const fromDtoMapStatus: Readonly<Record<AnimeStatusDto, AnimeStatus>> = {
    [AnimeStatusDto.Airing]: 'On air',
    [AnimeStatusDto.Finished]: 'Finished',
    [AnimeStatusDto.NotYetAired]: 'Not yet aired',
  };

  const fromDtoMapType: Readonly<Record<AnimeTypeDto, AnimeType>> = {
    [AnimeTypeDto.Tv]: 'TV',
    [AnimeTypeDto.Ova]: 'OVA',
    [AnimeTypeDto.Movie]: 'Movie',
    [AnimeTypeDto.Special]: 'Special',
    [AnimeTypeDto.Ona]: 'ONA',
    [AnimeTypeDto.Music]: 'Music',
  };
}
