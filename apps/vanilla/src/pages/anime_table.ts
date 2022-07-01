import { PaginationDto } from '@js-camp/core/dtos/pagination.dto';

import { Anime } from '@js-camp/core/models/anime';

import { formatDate } from '../scripts/functions';

/**
 * Outputs a table with anime.
 * @param animePromise  Anime Data.
 */
export function animeTableOutput(animePromise: Promise<PaginationDto<Anime>>): void {
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
    animeData.results.forEach((anime: Anime) => {
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
    if (TABLE_ELEMENT === null) {
      throw new Error('not element');
    }
    TABLE_ELEMENT.innerHTML = TABLE_HTML;
  });
}
