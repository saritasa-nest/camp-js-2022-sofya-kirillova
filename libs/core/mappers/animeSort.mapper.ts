import { AnimeSortDto } from '../dtos/animeSort';
import { AnimeSort, Direction, Order } from '../models/animeSort';

import { DirectionDto } from './../dtos/animeSort';

export namespace AnimeSortMapper {

  /**
   * Maps dto to model.
   * @param item Anime Sort class.
   */
  export function toDto(item: AnimeSort): AnimeSortDto {
    const sort = toDtoMapDirection[item.direction] + toDtoMapOrder[item.order] as AnimeSortDto;
    return sort;
  }

  const toDtoMapOrder: Readonly<Record<Order, AnimeSortDto>> = {
    titleEnglish: 'title_eng',
    airedStart: 'aired__startswith',
    status: 'status',
  };

  const toDtoMapDirection: Readonly<Record<Direction, DirectionDto>> = {
    [Direction.Ascending]: DirectionDto.Ascending,
    [Direction.Descending]: DirectionDto.Descending,
  };
}
