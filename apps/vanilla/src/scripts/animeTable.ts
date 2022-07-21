import { AnimeCommon } from '@js-camp/core/models/animeCommon';
import { assertNonNull } from '@js-camp/core/utils/assertNonNull';
import { formatDate } from '@js-camp/core/utils/formatDate';

/**
 * Outputs a table with anime.
 * @param animeData Anime data.
 */
export function renderAnimeTable(animeData: readonly AnimeCommon[]): void {
  const animeContainer = document.querySelector('.anime__tbody');
  assertNonNull(animeContainer);
  const allAnimeContent = animeData.reduce((body, current) => {
    const animeContent = `
      <tr data-anime-id=${current.id}>
        <td><img class='anime__image' alt='anime image' src='${current.image}'></td>
        <td class="anime__title">
          <span>${current.titleEnglish}</span>
          <span class="anime__title-eng">${current.titleJapanese}</span>
        </td>
        <td>${current.type}</td>
        <td>${current.status}</td>
        <td>${formatDate(current.airingStart)}</td>
      </tr>`;
    return body + animeContent;
  }, ``);
  animeContainer.innerHTML = allAnimeContent;

  const animeContent = document.querySelectorAll('[data-anime-id]');
  assertNonNull(animeContent);
  console.log(animeContainer);

  // animeContainer[0].getItem('data-anime-id')
  animeContent.forEach(anime => anime.addEventListener('click', () => {
    localStorage.getItem('access');
    if (localStorage.getItem('access')) {
      window.location.replace('./animeDetails/anime.html?id=5');
    } else {
      const message = document.querySelector<HTMLTemplateElement>('#error-message');
      document.body.append(message)
    }
  }));
}
