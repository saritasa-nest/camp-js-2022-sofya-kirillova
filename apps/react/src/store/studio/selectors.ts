import { createSelector } from '@reduxjs/toolkit';

import { RootState } from '../store';

import { studioAdapter } from './state';

/** Selects all studio from store. */
export const selectStudioById = createSelector(
  (state: RootState, id: number) => studioAdapter.getSelectors().selectById(state.studios, id),
  studio => studio,
);
