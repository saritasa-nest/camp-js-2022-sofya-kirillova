import { SortDTO } from '../dtos/sort.dto';
import { AnimeSort } from '../models/animeSort';

export namespace AnimeSortMapper {

  /**
   * Maps dto to model.
   * @param item Anime Sort class.
   */
  export function toDto(item: AnimeSort): SortDTO {
    let animeSort: SortDTO;
    switch (item) {
      case 'titleEng':
        animeSort = 'title_eng';
        break;
      case 'airedStart':
        animeSort = 'aired__startswith';
        break;
      case 'status':
        animeSort = 'status';
        break;
      default:
        animeSort = 'title_eng';
        break;
    }
    return animeSort;
  }
}
