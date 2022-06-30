import { formatDate } from "../scripts/functions";

/**
 * 
 * @param anime_promise 
 */
export const anime_table_output = ((anime_promise: Promise<IAnimeTable>): void => {
    anime_promise.then((anime_data) => {
      let table_HTML = `
      <thead>
      <tr>
       <td></td>
       <td>name</td>
       <td>type</td>
       <td>status</td>
       <td>aired start</td>
      </tr>
     </thead>`
      anime_data.results.forEach((anime: IAnime) => {
        table_HTML += `
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
      let table_element = document.querySelector('.anime-table')
      if (table_element === null){
        throw new Error('not element')
      }
      table_element.innerHTML = table_HTML
    })
  
  
  });