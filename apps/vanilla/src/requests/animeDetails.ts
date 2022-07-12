import { api } from "./API";

/**
 * Sends a request to the database.
 * @param id Anime ID.
 */
export async function animeDetails(id: number): Promise<void> {
  const response = await api.get(`/anime/anime/${id}/`).then(res => {
  })
    .catch(res => {
      console.log(res.response)
    });
  const data = response;
}