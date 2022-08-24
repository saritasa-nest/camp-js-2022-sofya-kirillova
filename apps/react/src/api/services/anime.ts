import { AnimeSortMapper } from '@js-camp/core/mappers/animeSort.mapper';

import { AnimeCommonDto } from '@js-camp/core/dtos/animeCommon.dto';
import { PaginationDto } from '@js-camp/core/dtos/pagination.dto';
import { AnimeCommonMapper } from '@js-camp/core/mappers/animeCommon.mapper';
import { AnimeCommon } from '@js-camp/core/models/animeCommon';
import { AnimeFullMapper } from '@js-camp/core/mappers/animeFull.mapper';
import { AnimeFullDto } from '@js-camp/core/dtos/animeFull.dto';
import { AnimeFull } from '@js-camp/core/models/animeFull';

import { http } from '..';
import { CONFIG } from '../config';
import { AnimeQueryParams } from '../../model/AnimeParams';

const animeUrl = 'anime/anime/';

export namespace AnimeService {
  let animeListNextUrl: string | null = null;

  /**
   * Fetches a list of anime.
   * @param params Anime params.
   */
  export async function fetchAnimeList(params?: AnimeQueryParams): Promise<AnimeCommon[]> {
    const url = new URLSearchParams();
    if (params) {
      const types = params.types.length > 0 ?
        params.types.map(type => AnimeCommonMapper.toDtoMapType[type]).join(',') :
        '';
      url.append('search', String(params.search));
      url.append('type__in', String(types));
      url.append('ordering', String(AnimeSortMapper.toDto(params.sort)));
    }
    const { data } = await http.get<PaginationDto<AnimeCommonDto>>(`${animeUrl}?${url}`);
    setAnimeListNextUrl(data.next);
    return data.results.map(anime => AnimeCommonMapper.fromDto(anime));
  }

  /** Fetches the next list of anime. */
  export async function fetchNextAnimeList(): Promise<AnimeCommon[] | null> {
    if (animeListNextUrl === null) {
      return null;
    }
    const { data } = await http.get<PaginationDto<AnimeCommonDto>>(
      animeListNextUrl.replace(CONFIG.apiUrl, ''),
    );
    setAnimeListNextUrl(data.next);
    return data.results.map(anime => AnimeCommonMapper.fromDto(anime));
  }

  /** Preset for task 4. */
  /**
   * Obtains information about a anime by provided id.
   * @param id Anime id.
   */
  export async function fetchAnimeById(id: number): Promise<AnimeFull> {
    const { data } = await http.get<AnimeFullDto>(`${animeListNextUrl}${id}/`);
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
