import { createSelector } from '@reduxjs/toolkit';

import { RootState } from '../store';

import { animeAdapter } from './state';

/** Selects all anime from store. */
export const selectAnimeList = createSelector(
  (state: RootState) => animeAdapter.getSelectors().selectAll(state.animeList),
  anime => anime,
);

/** Selects all anime loading state. */
export const selectAnimeListLoading = createSelector(
  (state: RootState) => state.animeList.isLoading,
  isLoading => isLoading,
);
