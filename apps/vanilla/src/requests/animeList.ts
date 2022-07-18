import { AnimeDto } from '@js-camp/core/dtos/anime.dto';
import { PaginationDto } from '@js-camp/core/dtos/pagination.dto';
import { AnimeListMapper } from '@js-camp/core/mappers/animeLIst.mapper';
import { AnimeSortMapper } from '@js-camp/core/mappers/animeSort.mapper';

import { Anime } from '@js-camp/core/models/anime';
import { Pagination } from '@js-camp/core/models/pagination';

import { PaginationConfig } from '../scripts/interfaces';

import { api } from './API';

/**
 * Sends a request to the database.
 * @param paginationConfig Parameters for getting anime.
 */
export async function getAnimeList(paginationConfig: PaginationConfig): Promise<Pagination<Anime>> {

  const order = AnimeSortMapper.toDto(paginationConfig.order);
  const offset = (paginationConfig.currentPage - 1) * paginationConfig.pageSize;
  const additionalSortingParameter = 'id';

  const url = new URLSearchParams();
  url.append('limit', String(paginationConfig.pageSize));
  url.append('offset', String(offset));
  url.append('ordering', `${order},${additionalSortingParameter}`);

  const response = await api.get<PaginationDto<AnimeDto>>(
    `/anime/anime/?${url}`,
  );
  const { data } = response;
  return AnimeListMapper.fromDto(data);
}
