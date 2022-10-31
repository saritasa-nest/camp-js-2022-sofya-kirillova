import { formatDate } from '@js-camp/core/utils/formatDate';
import {
  selectGenreListIds,
  selectStudioListId,
} from '@js-camp/react/store/animeExtender/selectors';
import { useAppSelector } from '@js-camp/react/store/store';
import { Grid } from '@mui/material';
import { memo, FC } from 'react';

import { selectGenreList } from '@js-camp/react/store/genre/selectors';
import { selectStudioList } from '@js-camp/react/store/studio/selectors';

import { AnimeFull } from '@js-camp/core/models/animeFull';

import styles from './AnimeDetails.module.css';

interface Props {

  /** Anime. */
  readonly anime: AnimeFull;
}

/** Anime details description page component. */
const AnimeDetailsPageComponent: FC<Props> = ({ anime }) => {

  const studioListIds =
    useAppSelector(state => selectStudioListId(state, anime.id)) ?? [];
  const genreListIds =
    useAppSelector(state => selectGenreListIds(state, anime.id)) ?? [];
  const studioList = useAppSelector(state =>
    selectStudioList(state, [...studioListIds]));
  const genreList = useAppSelector(state =>
    selectGenreList(state, [...genreListIds]));

  return (
    <Grid spacing={2} container>
      <Grid item xs={3}>
        <img
          className={styles['anime__image']}
          alt={`image of anime ${
                anime.titleEnglish || anime.titleJapanese
          }`}
          src={anime.image}
        />
      </Grid>

      <Grid item xs={9}>
        <Grid className={styles['anime__detail']}>
          <p className={styles['anime__title-english']}>
            {anime.titleEnglish}
          </p>
          <p className={styles['anime__title-japanese']}>
            {anime.titleJapanese}
          </p>
        </Grid>
        <Grid className={styles['anime__detail']}>
          <span className={styles['anime__title-details']}>Aired</span>
          <span>
            {formatDate(anime.airingStart)} to{' '}
            {formatDate(anime.airingFinish)}
          </span>
        </Grid>
        <Grid className={styles['anime__detail']}>
          <span className={styles['anime__title-details']}>Type</span>
          <span>{anime.type}</span>
        </Grid>
        <Grid className={styles['anime__detail']}>
          <span className={styles['anime__title-details']}>Status</span>
          <span>{anime.status}</span>
        </Grid>
        <Grid className={styles['anime__detail']}>
          {studioList.length > 0 ? (
            <>
              <span className={styles['anime__title-details']}>
                    Studios
              </span>
              <span>
                {studioList.map(studio => studio.name).join(', ')}
              </span>
            </>
          ) : (
            <></>
          )}
        </Grid>
        <Grid className={styles['anime__detail']}>
          {genreList.length > 0 ? (
            <>
              <span className={styles['anime__title-details']}>Genres</span>
              <span>{genreList.map(genre => genre.name).join(', ')}</span>
            </>
          ) : (
            <></>
          )}
        </Grid>
      </Grid>
      {anime.synopsis !== undefined ? (
        <Grid item xs={12} className={styles['anime__detail']}>
          <span className={styles['anime__title-details']}>Synopsis</span>
          <p>{anime.synopsis}</p>
        </Grid>
      ) : (
        <></>
      )}
    </Grid>
  );
};

export const AnimeDetailsPage = memo(AnimeDetailsPageComponent);
