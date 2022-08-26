import { formatDate } from '@js-camp/core/utils/formatDate';
import { fetchAnimeById } from '@js-camp/react/store/animeExtender/dispatchers';
import { selectAnimeById } from '@js-camp/react/store/animeExtender/selectors';
import { useAppDispatch, useAppSelector } from '@js-camp/react/store/store';
import { Box, Grid } from '@mui/material';
import { memo, FC, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { isEmpty } from 'lodash';

import styles from './AnimeDetails.module.css';

const INITIAL_ID = 0;

/** Anime details description page component. */
const AnimeDetailsPageComponent: FC = () => {
  const dispatch = useAppDispatch();
  const [id, setId] = useState(INITIAL_ID);
  const anime = useAppSelector(state => selectAnimeById(state, id));
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
              <span className={styles['anime__title-details']}>Studios</span>
              {/* <span>{anime.studiosData}</span> */}
            </Grid>
            <Grid className={styles['anime__detail']}>
              <span className={styles['anime__title-details']}>Genres</span>
              {/* <span>{anime.genresData}</span> */}
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
