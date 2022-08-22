import { AnimeCommon } from '@js-camp/core/models/animeCommon';
import { fetchAnimeList } from '@js-camp/react/store/anime/dispatchers';
import { selectAnimeList } from '@js-camp/react/store/anime/selectors';
import { useAppDispatch, useAppSelector } from '@js-camp/react/store/store';
import { Grid, List } from '@mui/material';
import { FC, memo, useCallback, useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';

import { Loading } from '../../../../components/Loading';
import { AnimeDetailsPage } from '../../components/AnimeDetails';
import { AnimeShortPage } from '../../components/AnimeShort/AnimeShort';

import styles from './AnimePage.module.css';

/** Anime page component. */
const AnimePageComponent: FC = () => {
  const dispatch = useAppDispatch();
  const animeList = useAppSelector(selectAnimeList);

  /** TODO. */
  /** Gets more anime. */
  const getMoreAnime = useCallback(() => {
    dispatch(fetchAnimeList());
  }, []);

  useEffect(() => {
    dispatch(fetchAnimeList());
  }, [dispatch]);

  return (
    <Grid container spacing={3}>
      <Grid item xs={4}>
        <List className={styles['anime-list']}>
          <InfiniteScroll
            dataLength={animeList.length}
            next={getMoreAnime}
            hasMore={true}
            loader={<Loading />}
          >
            {animeList.map((anime: AnimeCommon) => (
              <AnimeShortPage key={anime.id} anime={anime} />
            ))}
          </InfiniteScroll>
        </List>
      </Grid>
      <Grid item xs={8}>
        <AnimeDetailsPage />
      </Grid>
    </Grid>
  );
};

export const AnimePage = memo(AnimePageComponent);
