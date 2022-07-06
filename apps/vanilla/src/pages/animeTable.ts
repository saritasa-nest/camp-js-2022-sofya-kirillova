import { Anime } from '@js-camp/core/models/anime';
import { Pagination } from '@js-camp/core/models/pagination';
import { assertNonNull, formatDate } from '@js-camp/core/utils/functions';

/**
 * Outputs a table with anime.
 * @param animeData Anime data.
 */
export function renderAnimeTable(animeData: Pagination<Anime>): void {
  const TABLE_ELEMENT = document.querySelector('.anime-table');
  assertNonNull(TABLE_ELEMENT);
  const tableHeadContent = `
  <thead>
    <tr>
      <th></th>
      <th>name</th>
      <th>type</th>
      <th>status</th>
      <th>aired start</th>
    </tr>
  </thead>`;
  const tableBodyContent = animeData.results.reduce((body, current) => {
    const TR_CONTENT = `
      <tr>
        <td><img alt='anime image' src='${current.image}'></td>
        <td class="name-anime">
          <span>${current.titleEnglish}</span>
          <span class="title-eng">${current.titleJapanese}</span>
        </td>
        <td>${current.type}</td>
        <td>${current.status}</td>
        <td>${formatDate(current.aired.start)}</td>
      </tr>`;
    return body + TR_CONTENT;
  }, ``);
  TABLE_ELEMENT.innerHTML = tableHeadContent + tableBodyContent;
}
