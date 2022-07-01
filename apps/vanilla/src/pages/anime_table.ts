import { formatDate } from '../scripts/functions';
import { IAnime, IAnimeTable } from '../scripts/interface';

/**
 * Outputs a table with anime.
 * @param animePromise  Anime Data.
 */
export function animeTableOutput(animePromise: Promise<IAnimeTable>): void {
  animePromise.then(animeData => {
    let TABLE_HTML = `
      <thead>
      <tr>
       <td></td>
       <td>name</td>
       <td>type</td>
       <td>status</td>
       <td>aired start</td>
      </tr>
     </thead>`;
    animeData.results.forEach((anime: IAnime) => {
      TABLE_HTML += `
      <tr>
        <td><img class='' src='${anime.image}'></td>
        <td class="name-anime">
          <span>${anime.title_eng}</span>
          <span class="title-eng">${anime.title_jpn}</span>
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
