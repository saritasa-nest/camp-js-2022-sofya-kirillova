import { AnimeDto } from '@js-camp/core/dtos/anime.dto';
import { PaginationDto } from '@js-camp/core/dtos/pagination.dto';
import { PaginationMapper } from '@js-camp/core/mappers/pagination.mapper';
import { Anime } from '@js-camp/core/models/anime';
import { Pagination } from '@js-camp/core/models/pagination';

import { api } from './API';
import { IPaginationConfig } from './interfaces';

/**
 * Sends a request to the database.
 * @param paginationConfig Pagination Config: number of results to return per page, current page, selected sorting type.
 */
export async function getAnime(paginationConfig: IPaginationConfig): Promise<Pagination<Anime>> {
  const offset = (paginationConfig.currentPage - 1) * paginationConfig.pageSize;
  const response = await api.get<PaginationDto<AnimeDto>>(
    `/anime/anime/?limit=${paginationConfig.pageSize}&offset=${offset}&ordering=${paginationConfig.order}%2Cid`,
  );
  const { data } = response;
  return PaginationMapper.fromDto(data);
}
