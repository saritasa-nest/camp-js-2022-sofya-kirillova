import { AnimeDto } from '@js-camp/core/dtos/anime.dto';
import { PaginationDto } from '@js-camp/core/dtos/pagination.dto';
import { PaginationMapper } from '@js-camp/core/mappers/pagination.mapper';
import { Anime } from '@js-camp/core/models/anime';
import { Pagination } from '@js-camp/core/models/pagination';

import { api } from './API';

/** Parameters for getting anime from the database. */
interface IPaginationConfig {

  /** The number of results returned per page. */
  readonly pageSize: number;

  /** Current page. */
  readonly currentPage: number;

  /** Sorting mode. */
  readonly order: string;
}

/**
 * Sends a request to the database.
 * @param paginationConfig Parameters for getting anime from the database.
 */
export async function getAnime(paginationConfig: IPaginationConfig): Promise<Pagination<Anime>> {
  const offset = (paginationConfig.currentPage - 1) * paginationConfig.pageSize;
  const url = new URLSearchParams(`limit=${paginationConfig.pageSize}&offset=${offset}&ordering=${paginationConfig.order},id`);
  const response = await api.get<PaginationDto<AnimeDto>>(
    `/anime/anime/?${url}`,
  );
  const { data } = response;
  return PaginationMapper.fromDto(data);
}
