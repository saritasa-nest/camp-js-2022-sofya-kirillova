import { Anime } from '@js-camp/core/models/anime';
import { Pagination } from '@js-camp/core/models/pagination';
import { formatDate } from '@js-camp/core/utils/functions';

/**
 * Outputs a table with anime.
 * @param animeData Anime Data.
 */
export function renderAnimeTable(animeData: Pagination<Anime>): void {
  const TABLE_ELEMENT = document.createElement('table');
  TABLE_ELEMENT.className = 'anime-table';
  const tableTheadHTML = `
  <thead>
    <tr>
      <th></th>
      <th>name</th>
      <th>type</th>
      <th>status</th>
      <th>aired start</th>
    </tr>
  </thead>`;
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
  const DIV_ELEMENT = document.querySelector('.anime-main');
  if (DIV_ELEMENT === null) {
    throw new Error('not element');
  }
  DIV_ELEMENT?.append(TABLE_ELEMENT);
}
