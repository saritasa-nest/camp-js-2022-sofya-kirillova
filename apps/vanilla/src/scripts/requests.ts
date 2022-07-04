import { PaginationMapper } from '@js-camp/core/mappers/pagination.mapper';
import { Anime } from '@js-camp/core/models/anime';
import { Pagination } from '@js-camp/core/models/pagination';

import { api } from './API';

/**
 * Sends a request to the database.
 * @param size Number of results to return per page.
 * @param pageNumber Current page.
 * @param order Selected sorting type.
 * @param https API.
 */
export async function getAnime(size: number,
  pageNumber: number,
  order: string,
  https: string | undefined): Promise<Pagination<Anime>> {
  const response = await api.get(
    https === null ? https :
      `/anime/anime/?limit=${size}&offset=${(pageNumber - 1) * size}&ordering=${order}%2Cid`,
  );
  const { data } = response;
  return PaginationMapper.fromDto(data);
}
