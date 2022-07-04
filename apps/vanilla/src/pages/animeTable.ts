import { Anime } from '@js-camp/core/models/anime';
import { Pagination } from '@js-camp/core/models/pagination';

import { formatDate, isNull } from '../scripts/functions';

/**
 * Outputs a table with anime.
 * @param animePromise Anime Data.
 */
export function renderAnimeTable(animePromise: Promise<Pagination<Anime>>): void {
  animePromise.then(animeData => {
    const TABLE_ELEMENT = document.querySelector('.anime-table');
    isNull(TABLE_ELEMENT !== null);
    const tableTheadHTML = TABLE_ELEMENT.innerHTML;
    let tableBodyHTML = ``;
    animeData.results.forEach(anime => {
      tableBodyHTML += `
      <tr>
        <td><img class='' src='${anime.image}'></td>
        <td class="name-anime">
          <span>${anime.titleEng}</span>
          <span class="title-eng">${anime.titleJpn}</span>
        </td>
        <td>${anime.type}</td>
        <td>${anime.status}</td>
        <td>${formatDate(anime.aired.start)}</td>
      </tr>`;
    });
    TABLE_ELEMENT.innerHTML = tableTheadHTML + tableBodyHTML;
  });
}
