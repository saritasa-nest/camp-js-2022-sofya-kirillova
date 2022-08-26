import { createSelector } from '@reduxjs/toolkit';

import { RootState } from '../store';

import { animeAdapter } from './state';

/** Selects all anime from store. */
export const { selectAll: selectAnimeList } = animeAdapter.getSelectors<RootState>(state => state.animeList);

/** Selects all anime loading state. */
export const selectAnimeListLoading = createSelector(
  (state: RootState) => state.animeList.isLoading,
  isLoading => isLoading,
);

/** Selects all anime loading state. */
export const selectAnimeNextUrl = createSelector(
  (state: RootState) => state.animeList.next,
  nextUrl => nextUrl,
);
