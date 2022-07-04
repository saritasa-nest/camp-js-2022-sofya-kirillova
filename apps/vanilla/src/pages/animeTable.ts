import assert from 'assert';

import { Anime } from '@js-camp/core/models/anime';
import { Pagination } from '@js-camp/core/models/pagination';

import { formatDate } from '../scripts/functions';

/**
 * Outputs a table with anime.
 * @param animePromise Anime Data.
 */
export function renderAnimeTable(animePromise: Promise<Pagination<Anime>>): void {
  animePromise.then(animeData => {
    let TABLE_HTML = `
      <thead>
      <tr>
       <th></th>
       <th>name</th>
       <th>type</th>
       <th>status</th>
       <th>aired start</th>
      </tr>
     </thead>`;
    animeData.results.forEach(anime => {
      TABLE_HTML += `
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
    const TABLE_ELEMENT = document.querySelector('.anime-table');
    assert(TABLE_ELEMENT !== null);
    TABLE_ELEMENT.innerHTML = TABLE_HTML;
  });
}
