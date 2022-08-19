import { createSelector } from '@reduxjs/toolkit';

import { RootState } from '../store';

/** Selects all genres from store. */
export const selectGenres = createSelector(
  (state: RootState) => state.genres.genres,
  genres => genres,
);
