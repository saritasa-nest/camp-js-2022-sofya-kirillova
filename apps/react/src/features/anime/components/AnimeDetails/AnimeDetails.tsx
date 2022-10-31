import { formatDate } from '@js-camp/core/utils/formatDate';
import { fetchAnimeById } from '@js-camp/react/store/animeExtender/dispatchers';
import { selectAnimeById, selectGenreListIds, selectStudioListId } from '@js-camp/react/store/animeExtender/selectors';
import { useAppDispatch, useAppSelector } from '@js-camp/react/store/store';
import { Box, Grid } from '@mui/material';
import { memo, FC, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { isEmpty } from 'lodash';

import { selectGenreList } from '@js-camp/react/store/genre/selectors';
import { selectStudioList } from '@js-camp/react/store/studio/selectors';

import styles from './AnimeDetails.module.css';

const INITIAL_ID = 0;

/** Anime details description page component. */
const AnimeDetailsPageComponent: FC = () => {
  const dispatch = useAppDispatch();
  const [id, setId] = useState(INITIAL_ID);
  const anime = useAppSelector(state => selectAnimeById(state, id));
  const studioListIds = useAppSelector(state => selectStudioListId(state, id)) ?? [];
  const genreListIds = useAppSelector(state => selectGenreListIds(state, id)) ?? [];

  // const qef = [...anime.studios];
  const studioList = useAppSelector(state => selectStudioList(state, [...studioListIds]));

  const genreList = useAppSelector(state => selectGenreList(state, [...genreListIds]));
  const [searchParams] = useSearchParams();
  useEffect(() => {
    const idParam = Number(searchParams.get('id'));
    if (idParam !== INITIAL_ID && idParam !== id) {
      setId(idParam);
      dispatch(fetchAnimeById(idParam));
    }
  }, [searchParams]);
  return (
    <Box>
      {isEmpty(anime) ? (
        <p>Select an anime from the list</p>
      ) : (
        <Grid spacing={2} container>
          <Grid item xs={3}>
            <img
              className={styles['anime__image']}
              alt={`image of anime ${anime.titleEnglish || anime.titleJapanese}`}
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
              <span>{formatDate(anime.airingStart)} to {formatDate(anime.airingFinish) }</span>

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

              {studioList.length > 0 ? <>
                <span className={styles['anime__title-details']}>Studios</span>
                <span>{studioList.map(studio => studio.name).join(', ')}</span>
              </> : <></>}
            </Grid>
            <Grid className={styles['anime__detail']}>
              {genreList.length > 0 ? <>
                <span className={styles['anime__title-details']}>Genres</span>
                <span>{genreList.map(genre => genre.name).join(', ')}</span>
              </> : <></>}
            </Grid>
          </Grid>
          {anime.synopsis !== undefined ?
            <Grid item xs={12} className={styles['anime__detail']}>
              <span className={styles['anime__title-details']}>Synopsis</span>
              <p>{anime.synopsis}</p>
            </Grid> : <></>
          }
        </Grid>
      )}
    </Box>
  );
};

export const AnimeDetailsPage = memo(AnimeDetailsPageComponent);
