import { AnimeMapper } from '@js-camp/core/mappers/anime.mapper';
import { Anime } from '@js-camp/core/models/anime';

import { AUTHORIZATION } from '../pages/scripts/constants';

import { api } from './API';

/**
 * Sends a request to the database.
 * @param id Anime ID.
 */
export async function getAnimeDetails(id: number): Promise<Anime> {
  const response = await api.get(`/anime/anime/${id}/`, {
    headers: { [AUTHORIZATION]: `Bearer ${localStorage.getItem('access')}` },
  });
  const { data } = response;
  return AnimeMapper.fromDto(data);
}
