import { AnimeCommon } from '@js-camp/core/models/animeCommon';
import { Grid, ListItem } from '@mui/material';
import { memo, FC, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';

import styles from './AnimeShort.module.css';

interface Props {

  /** Anime. */
  readonly anime: AnimeCommon;
}

/** Anime short description page component. */
const AnimeShortPageComponent: FC<Props> = ({ anime }) => {
  const [params, setParams] = useSearchParams();

  const setId = useCallback(() => {
    setParams({ ...Object.fromEntries(params), id: String(anime.id) });
  }, []);

  return (
    <ListItem onClick={setId}>
      <Grid
        className={styles['anime']}
        container
        direction="row"
        alignItems="center"
      >
        <Grid>
          <img
            className={styles['anime__image']}
            alt={`image of anime ${anime.titleEnglish || anime.titleJapanese}`}
            src={anime.image}
          />
        </Grid>
        <Grid>
          <p> {anime.titleEnglish} </p>
          <p className={styles['anime__title-japanese']}>
            {anime.titleJapanese}
          </p>
        </Grid>
        <Grid textAlign="center">{anime.type}</Grid>
        <Grid textAlign="center">{anime.status}</Grid>
      </Grid>
      <hr className={styles['anime__separator']} />
    </ListItem>
  );
};

export const AnimeShortPage = memo(AnimeShortPageComponent);
