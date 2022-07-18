import { api } from './API';

/**
 * Sends a request to the database.
 * @param id Anime ID.
 */
export async function animeDetails(id: number): Promise<void> {
  const response = await api.get(`/anime/anime/${id}/`, { headers: { Authorization: `Bearer ${localStorage.getItem('access')}` } }).then(res => {
    console.log(res);
  })
    .catch(res => {
      console.log(res.response);
    });
  const data = response;
}
