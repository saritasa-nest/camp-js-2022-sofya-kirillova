import { createSelector } from '@reduxjs/toolkit';

import { RootState } from '../store';

import { studioAdapter } from './state';

const { selectAll, selectById } = studioAdapter.getSelectors();

/** Selects studio by id from store. */
export const selectStudioById = createSelector(
  (state: RootState, id: number) => selectById(state.studios, id),
  studio => studio,
);

/** Selects all studio from store. */
export const selectStudioList = createSelector(
  (state: RootState, ids: number[]) =>
    ({ list: selectAll(state.studios), ids }),
  ({ list, ids }) => list.filter(item => ids.includes(item.id)),
);
