import { Anime } from '@js-camp/core/models/anime';
import { assertNonNull } from '@js-camp/core/utils/assertNonNull';
import { formatDate } from '@js-camp/core/utils/formatDate';

/**
 * Outputs a table with anime.
 * @param animeData Anime data.
 */
export function renderAnimeTable(animeData: readonly Anime[]): void {
  const animeContainer = document.querySelector('.anime__tbody');
  assertNonNull(animeContainer);
  const allAnimeContent = animeData.reduce((body, current) => {
    const animeContent = `
      <tr>
        <td><img class='anime__image' alt='anime image' src='${current.image}'></td>
        <td class="anime__name">
          <span>${current.titleEnglish}</span>
          <span class="anime__title-eng">${current.titleJapanese}</span>
        </td>
        <td>${current.type}</td>
        <td>${current.status}</td>
        <td>${formatDate(current.airingStart)}</td>
      </tr>`;
    return body + animeContent;
  }, ``);
  animeContainer.innerHTML = allAnimeContent;
}
