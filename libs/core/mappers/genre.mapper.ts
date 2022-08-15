import { GenreCreate } from './../models/genre';
import { GenreDto } from '../dtos/genre.dto';
import { Genre, GenreType } from '../models/genre';

import { GenreTypeDto, GenreCreateDto } from './../dtos/genre.dto';

export namespace GenreMapper {

  /**
   * Maps dto to model.
   * @param dto Genre dto.
   */
  export function fromDto(dto: GenreDto): Genre {
    // console.log(fromDtoMapType[dto.type])
    return new Genre({
      id: dto.id,
      name: dto.name,
      type: fromDtoMapType[dto.type],
    });
  }

  /**
   * Maps model to dto.
   * @param model Genre model.
   */
  export function toDto(model: GenreCreate): GenreCreateDto {
    return {
      name: model.name,
      type: toDtoMapType[model.type],
    };
  }

  const toDtoMapType: Readonly<Record<GenreType, GenreTypeDto>> = {
    [GenreType.Genres]: GenreTypeDto.Genres,
    [GenreType.ExplicitGenres]: GenreTypeDto.ExplicitGenres,
    [GenreType.Themes]: GenreTypeDto.Themes,
    [GenreType.Demographics]: GenreTypeDto.Demographics,
  };

  const fromDtoMapType: Readonly<Record<GenreTypeDto, GenreType>> = {
    [GenreTypeDto.Genres]: GenreType.Genres,
    [GenreTypeDto.ExplicitGenres]: GenreType.ExplicitGenres,
    [GenreTypeDto.Themes]: GenreType.Themes,
    [GenreTypeDto.Demographics]: GenreType.Demographics,
  };
}
