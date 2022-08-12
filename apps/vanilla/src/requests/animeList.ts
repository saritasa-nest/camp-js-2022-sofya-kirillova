import { AnimeCommonDto } from '@js-camp/core/dtos/animeCommon.dto';
import { PaginationDto } from '@js-camp/core/dtos/pagination.dto';
import { PaginationMapper } from '@js-camp/core/mappers/pagination.mapper';
import { AnimeSortMapper } from '@js-camp/core/mappers/animeSort.mapper';

import { AnimeCommon } from '@js-camp/core/models/anime';
import { Pagination } from '@js-camp/core/models/pagination';

import { PaginationConfig } from '../scripts/interfaces';

import { api } from './API';

/**
 * Sends a request to the database.
 * @param paginationConfig Parameters for getting anime.
 */
export async function getAnimeList(paginationConfig: PaginationConfig): Promise<Pagination<AnimeCommon>> {
  const order = AnimeSortMapper.toDto(paginationConfig.order);
  const offset = (paginationConfig.page - 1) * paginationConfig.pageSize;
  const additionalSortingParameter = 'id';

  const url = new URLSearchParams();
  url.append('limit', String(paginationConfig.pageSize));
  url.append('offset', String(offset));
  url.append('ordering', `${order},${additionalSortingParameter}`);

  const response = await api.get<PaginationDto<AnimeCommonDto>>(
    `/anime/anime/?${url}`,
  );
  const { data } = response;
  return PaginationMapper.fromDto(data);
}
