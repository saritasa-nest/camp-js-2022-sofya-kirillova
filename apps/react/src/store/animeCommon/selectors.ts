import { AnimeCommon } from '@js-camp/core/models/animeCommon';
import { createSelector } from '@reduxjs/toolkit';

import { RootState, useAppSelector } from '../store';

import { animeAdapter } from './state';

const { selectAll, selectById } = animeAdapter.getSelectors();

/** Selects all anime from store. */
export const selectAnimeList = createSelector(
  (state: RootState) =>
    ({ ids: state.animeCommonList.listIds, list: selectAll(state.animeCommonList) }),
  ({ ids, list }) => list.filter(item => ids.includes(item.id)),
);

/** Selects all anime loading state. */
export const selectAnimeListLoading = createSelector(
  (state: RootState) => state.animeCommonList.isLoading,
  isLoading => isLoading,
);

/** Selects all anime loading state. */
export const selectAnimeListHasNext = createSelector(
  (state: RootState) => state.animeCommonList.hasNext,
  hasNext => hasNext,
);

/** Selects anime by id from store. */
export const selectAnimeCommonById = createSelector(
  (state: RootState, id: number) => selectById(state.animeCommonList, id),
  anime => anime,
);

/** Selects all anime loading state. */
export const selectAnimeIdList = createSelector(
  (state: RootState) => state.animeCommonList.listIds,
  listIds => listIds,
);
