import { Anime } from '@js-camp/core/models/anime';
import { Pagination } from '@js-camp/core/models/pagination';
import { assertNonNull, formatDate } from '@js-camp/core/utils/functions';

/**
 * Outputs a table with anime.
 * @param animeData Anime Data.
 */
export function renderAnimeTable(animeData: Pagination<Anime>): void {
  const TABLE_ELEMENT = document.querySelector('.anime-table');
  assertNonNull(TABLE_ELEMENT);
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
  const tableBodyHTML = animeData.results.reduce(function (body, current) {
    const TR_HTML = `
      <tr>
        <td><img alt='anime image' src='${current.image}'></td>
        <td class="name-anime">
          <span>${current.titleEng}</span>
          <span class="title-eng">${current.titleJpn}</span>
        </td>
        <td>${current.type}</td>
        <td>${current.status}</td>
        <td>${formatDate(current.aired.start)}</td>
      </tr>`;
    return body + TR_HTML;
  }, ``);
  // let tableBodyHTML = ``;
  // animeData.results.forEach(anime => {
  //   tableBodyHTML += `
  //     <tr>
  //       <td><img alt='anime image' src='${anime.image}'></td>
  //       <td class="name-anime">
  //         <span>${anime.titleEng}</span>
  //         <span class="title-eng">${anime.titleJpn}</span>
  //       </td>
  //       <td>${anime.type}</td>
  //       <td>${anime.status}</td>
  //       <td>${formatDate(anime.aired.start)}</td>
  //     </tr>`;
  // });
  TABLE_ELEMENT.innerHTML = tableTheadHTML + tableBodyHTML;
}
