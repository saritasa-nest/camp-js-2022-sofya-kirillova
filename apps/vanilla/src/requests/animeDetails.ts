import { AnimeFullMapper } from '@js-camp/core/mappers/animeFull.mapper';
import { AnimeFull } from '@js-camp/core/models/animeFull';

import { AUTHORIZATION } from '../scripts/constants';

import { api } from './API';

/**
 * Sends a request to the database.
 * @param id Anime ID.
 */
export async function getAnimeDetails(id: number): Promise<AnimeFull> {
  const response = await api.get(`/anime/anime/${id}/`, {
    headers: { [AUTHORIZATION]: `Bearer ${localStorage.getItem('access')}` },
  });
  const { data } = response;
  return AnimeFullMapper.fromDto(data);
}
