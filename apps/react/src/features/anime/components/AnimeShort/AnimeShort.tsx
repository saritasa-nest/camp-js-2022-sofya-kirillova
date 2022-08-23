import { Anime } from '@js-camp/core/models/anime';
import { Grid } from '@mui/material';
import { memo, FC } from 'react';

import styles from './AnimeShort.module.css';

interface Props {

  /** Anime. */
  readonly anime: Anime;
}

/** Anime short description page component. */
const AnimeShortPageComponent: FC<Props> = ({ anime }) => (
  <>
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
  </>
);

export const AnimeShortPage = memo(AnimeShortPageComponent);
