import { AnimeCommon } from '@js-camp/core/models/animeCommon';
import { fetchNextAnimeList } from '@js-camp/react/store/animeCommon/dispatchers';
import { selectAnimeIdList, selectAnimeListHasNext } from '@js-camp/react/store/animeCommon/selectors';
import { useAppDispatch, useAppSelector } from '@js-camp/react/store/store';
import { Grid, List } from '@mui/material';
import { FC, memo, useCallback } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';

import { selectAnimeById } from '@js-camp/react/store/animeExtender/selectors';

import { Loading } from '../../../../components/Loading';
import { AnimeDetailsPage } from '../../components/AnimeDetails';
import { AnimeShortPage } from '../../components/AnimeShort/AnimeShort';
import { AnimeListManagementPage } from '../../components/AnimeListManagement';

import styles from './AnimePage.module.css';

const SCROLL_THRESHOLD = '500px';

/** Anime page component. */
const AnimePageComponent: FC = () => {
  const dispatch = useAppDispatch();
  const animeIdList = useAppSelector(selectAnimeIdList);
  const animeList = animeIdList.map(id => useAppSelector(state => selectAnimeById(state, id)));
  const animeListHasNext = useAppSelector(selectAnimeListHasNext);

  const getMoreAnime = useCallback(() => {
    dispatch(fetchNextAnimeList());
  }, []);

  return (
    <Grid container spacing={3}>
      <Grid className={styles['dashboard-Anime-films']} item xs={4} sx={{ maxHeight: '100vh' }}>
        <List className={styles['anime-list']}
          id='scrollableDiv'
        >
          <InfiniteScroll
            dataLength={animeList.length}
            next={getMoreAnime}
            hasMore={animeListHasNext}
            loader={<Loading />}
            scrollThreshold={SCROLL_THRESHOLD}
            scrollableTarget="scrollableDiv"
          >
            <AnimeListManagementPage />
            {animeList.map((anime: AnimeCommon) => (
              <AnimeShortPage key={anime.id} anime={anime} />
            ))}
          </InfiniteScroll>
        </List>
      </Grid><Grid item xs={8}>
        <AnimeDetailsPage />
      </Grid>
    </Grid>
  );
};

export const AnimePage = memo(AnimePageComponent);
