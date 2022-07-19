import { AnimeFull } from '@js-camp/core/models/animeFull';
import { assertNonNull } from '@js-camp/core/utils/assertNonNull';
import { formatDate } from '@js-camp/core/utils/formatDate';

import { getAnimeDetails } from '../../requests/animeDetails';

/** Render anime details. */
async function renderAnimeDetails(): Promise<void> {
  const animeDetails: AnimeFull = await getAnimeDetails(5);
  const separator = ', ';
  const animeDetailsContainer = document.querySelector('.animeDetails');
  assertNonNull(animeDetailsContainer);

  addImage(animeDetails.image);

  addTitle('animeDetails__title-eng', animeDetails.titleEnglish);
  addTitle('animeDetails__title-jpn', animeDetails.titleJapanese);

  addAnimeDetail('Air date', formatDate(animeDetails.airingStart));
  addAnimeDetail('Type', animeDetails.type);
  addAnimeDetail('Status', animeDetails.status);
  addAnimeDetail('Studios', animeDetails.studiosData?.map(studio => studio.name));
  addAnimeDetail('Genres', animeDetails.genresData?.map(genre => genre.name).join(separator));
  addAnimeDetail('Synopsis', animeDetails.synopsis);

}
renderAnimeDetails();

/**
 * Add the anime option to the page.
 * @param showParameterName Parameter name.
 * @param showParameterValue Parameter value.
 */
function addAnimeDetail(showParameterName: string, showParameterValue: string | undefined | string[]): void {
  if (showParameterValue === undefined) {
    return;
  }
  const animeDetailsContainer = document.querySelector('.animeDetails');
  assertNonNull(animeDetailsContainer);
  const parameterContainer = document.createElement('p');
  parameterContainer.innerHTML = `
    <span class="animeDetails__parameter">${showParameterName}</span>
    <span>${showParameterValue}</span>`;
  animeDetailsContainer.append(parameterContainer);

}

/**
 * Add an anime image to the page.
 * @param imageUrl URL image.
 */
function addImage(imageUrl: string): void {
  const animeDetailsContainer = document.querySelector('.animeDetails');
  assertNonNull(animeDetailsContainer);
  const image = document.createElement('img');
  image.alt = 'anime';
  image.className = 'animeDetails__image';
  image.src = imageUrl;
  animeDetailsContainer.append(image);
}

/**
 * Add an anime title to the page.
 * @param className Class name for the title container.
 * @param showTitle Display title of the anime.
 */
function addTitle(className: string, showTitle: string): void {
  const animeTitleContainer = document.querySelector('.animeDetails__title');
  assertNonNull(animeTitleContainer);
  const titleContainer = document.createElement('p');
  titleContainer.className = className;
  titleContainer.innerHTML = showTitle;
  animeTitleContainer.append(titleContainer);
}
