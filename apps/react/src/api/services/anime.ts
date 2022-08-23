
import { Pagination } from '@js-camp/core/models/pagination';
import { AnimeCommonDto } from '@js-camp/core/dtos/animeCommon.dto';
import { PaginationDto } from '@js-camp/core/dtos/pagination.dto';
import { AnimeCommonMapper } from '@js-camp/core/mappers/animeCommon.mapper';
import { PaginationMapper } from '@js-camp/core/mappers/pagination.mapper';
import { AnimeCommon } from '@js-camp/core/models/animeCommon';
import { AnimeFullMapper } from '@js-camp/core/mappers/animeFull.mapper';
import { AnimeFullDto } from '@js-camp/core/dtos/animeFull.dto';
import { AnimeFull } from '@js-camp/core/models/animeFull';

import { http } from '..';
import { CONFIG } from '../config';

const url = 'anime/anime/';

export namespace AnimeService {
  let animeListNextUrl: string | null = null;

  /** Fetches a list of anime. */
  export async function fetchAnimeList(): Promise<Pagination<AnimeCommon>> {
    if (animeListNextUrl) {
      const { data } = await http.get<PaginationDto<AnimeCommonDto>>(animeListNextUrl.replace(CONFIG.apiUrl, ''));

      setAnimeListNextUrl(data.next);
      return PaginationMapper.fromDto(data, AnimeCommonMapper.fromDto);
    }
    const { data } = await http.get<PaginationDto<AnimeCommonDto>>(`${url}?ordering=id`);
    setAnimeListNextUrl(data.next);
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

  /**
   * Sets next URL.
   * @param nextUrl Url of the Following Anime List.
   */
  function setAnimeListNextUrl(nextUrl: string | null) {
    animeListNextUrl = nextUrl ?? null;
  }
}
