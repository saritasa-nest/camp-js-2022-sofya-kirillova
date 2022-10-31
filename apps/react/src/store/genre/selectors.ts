import { createSelector } from '@reduxjs/toolkit';

import { RootState } from '../store';

import { genresAdapter } from './state';

const { selectAll } = genresAdapter.getSelectors();

/** Selects all genres from store. */
export const selectGenreList = createSelector(
  (state: RootState, ids: number[]) =>
    ({ list: selectAll(state.genres), ids }),
  ({ list, ids }) => list.filter(item => ids.includes(item.id)),
);
