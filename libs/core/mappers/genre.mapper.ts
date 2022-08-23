import { GenreDto } from '../dtos/genre.dto';
import { Genre, GenreType } from '../models/genre';

import { GenreTypeDto } from './../dtos/genre.dto';

export namespace GenreMapper {

  /**
   * Maps dto to model.
   * @param dto Genre dto.
   */
  export function fromDto(dto: GenreDto): Genre {
    return new Genre({
      id: dto.id,
      name: dto.name,
      type: fromDtoMapType[dto.type],
    });
  }

  const fromDtoMapType: Readonly<Record<GenreTypeDto, GenreType>> = {
    [GenreTypeDto.Genres]: GenreType.Genres,
    [GenreTypeDto.ExplicitGenres]: GenreType.ExplicitGenres,
    [GenreTypeDto.Themes]: GenreType.Themes,
    [GenreTypeDto.Demographics]: GenreType.Demographics,
  };
}
