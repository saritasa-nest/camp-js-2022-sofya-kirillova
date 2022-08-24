import { AnimeSortDto } from '../dtos/animeSort';
import { AnimeSort, Order } from '../models/animeSort';

export namespace AnimeSortMapper {

  /**
   * Maps dto to model.
   * @param item Anime Sort class.
   */
  export function toDto(item: AnimeSort): AnimeSortDto {
    const sort = (item.direction ? item.direction + toDtoMap[item.order] : toDtoMap[item.order]) as AnimeSortDto;
    return sort;
  }

  const toDtoMap: Readonly<Record<Order, AnimeSortDto>> = {
    titleEnglish: 'title_eng',
    airedStart: 'aired__startswith',
    status: 'status',
  };
}
