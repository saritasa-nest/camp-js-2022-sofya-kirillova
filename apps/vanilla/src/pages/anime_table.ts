import { formatDate } from "../global/functions";
/**
 * 
 * @param anime_promise 
 */
export const anime_table_output = ((anime_promise: Promise<any>) => {
    anime_promise.then((anime_data) => {
      const table_element = document.createElement('table');
      table_element.className = 'anime-table'
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
      anime_data.results.forEach((anime: IAnimeTable) => {
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
      let a = document.querySelector('.anime-table') || document.body
      a.innerHTML = table_HTML
    })
  
  
  });