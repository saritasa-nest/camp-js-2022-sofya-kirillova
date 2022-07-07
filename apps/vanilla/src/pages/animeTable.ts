import { Anime } from '@js-camp/core/models/anime';
import { Pagination } from '@js-camp/core/models/pagination';
import { assertNonNull, formatDate } from '@js-camp/core/utils/functions';

/**
 * Outputs a table with anime.
 * @param animeData Anime data.
 */
export function renderAnimeTable(animeData: Pagination<Anime>): void {
  const tbodyElement = document.querySelector('.anime__tbody');
  assertNonNull(tbodyElement);
  const tableBodyContent = animeData.results.reduce((body, current) => {
    const trContent = `
      <tr>
        <td><img class='anime__image' alt='anime image' src='${current.image}'></td>
        <td class="anime__name">
          <span>${current.titleEnglish}</span>
          <span class="anime__title-eng">${current.titleJapanese}</span>
        </td>
        <td>${current.type}</td>
        <td>${current.status}</td>
        <td>${formatDate(current.aired.start)}</td>
      </tr>`;
    return body + trContent;
  }, ``);
  tbodyElement.innerHTML = tableBodyContent;
}
