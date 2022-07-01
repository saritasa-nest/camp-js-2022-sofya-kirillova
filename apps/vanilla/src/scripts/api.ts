import { myAxios } from './forAxios';

import { IAnimeTable } from './interface';

/**
 * Sends a request to the database.
 * @param size Number of results to return per page.
 * @param currentPage Current page.
 * @param ordering Selected sorting type.
 * @param https API.
 * @returns Anime data.
 */
export async function apiAnimeTable(size: number, currentPage: number, ordering: string, https: string | undefined): Promise<IAnimeTable> {
  const response = await myAxios.get(
    https === null ? https :
      `/anime/anime/?limit=${size}&offset=${(currentPage - 1) * size}&ordering=${ordering}%2Cid`,
  );
  const { data } = response;
  return data;
}
