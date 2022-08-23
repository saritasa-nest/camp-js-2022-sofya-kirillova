
import { Pagination } from '@js-camp/core/models/pagination';
import { AnimeCommonDto } from '@js-camp/core/dtos/animeCommon.dto';
import { PaginationDto } from '@js-camp/core/dtos/pagination.dto';
import { AnimeCommonMapper } from '@js-camp/core/mappers/animeCommon.mapper';
import { PaginationMapper } from '@js-camp/core/mappers/pagination.mapper';
import { AnimeCommon } from '@js-camp/core/models/animeCommon';
import { AnimeFullMapper } from '@js-camp/core/mappers/animeFull.mapper';
import { AnimeFullDto } from '@js-camp/core/dtos/animeFull.dto';
import { AnimeFull } from '@js-camp/core/models/animeFull';
import { selectAnimeNextUrl } from '@js-camp/react/store/anime/selectors';

import { http } from '..';
import { useAppSelector } from '../../store';
import { CONFIG } from '../config';

const url = 'anime/anime/';

export namespace AnimeService {

  /** Fetches a list of anime. */
  export async function fetchAnimeList(): Promise<Pagination<AnimeCommon>> {
    const nextUrl = useAppSelector(selectAnimeNextUrl).replace(CONFIG.apiUrl, '');
    if (nextUrl === null) {
      const { data } = await http.get<PaginationDto<AnimeCommonDto>>(nextUrl);
      return PaginationMapper.fromDto(data, AnimeCommonMapper.fromDto);
    }
    const { data } = await http.get<PaginationDto<AnimeCommonDto>>(`${url}?ordering=id`);
    return PaginationMapper.fromDto(data, AnimeCommonMapper.fromDto);
  }

  /** Preset for task 4. */
  /**
   * Obtains information about a anime by provided id.
   * @param id Anime id.
   */
  export async function fetchAnimeById(id: number): Promise<AnimeFull> {
    const { data } = await http.get<AnimeFullDto>(`${url}${id}/`);
    return AnimeFullMapper.fromDto(data);
  }
}
