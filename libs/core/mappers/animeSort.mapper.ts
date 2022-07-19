import { AnimeSortDto } from '../dtos/sort.dto';
import { AnimeSort } from '../models/animeSort';

export namespace AnimeSortMapper {

  /**
   * Maps dto to model.
   * @param item Anime Sort class.
   */
  export function toDto(item: AnimeSort): AnimeSortDto {
    return toDtoMap[item];
  }

  const toDtoMap: Readonly<Record<AnimeSort, AnimeSortDto>> = {
    titleEng: 'title_eng',
    airedStart: 'aired__startswith',
    status: 'status',
  };
}
