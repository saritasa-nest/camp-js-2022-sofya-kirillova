import { AnimeFull } from '@js-camp/core/models/animeFull';
import { createSelector } from '@reduxjs/toolkit';

import { RootState } from '../store';

import { selectAnimeCommonById } from '../animeCommon/selectors';

import { animeExtensionAdapter } from './state';

export const selectAnimeExtensionById = createSelector(
  (state: RootState, id: number) => animeExtensionAdapter.getSelectors().selectById(state.animeExtensionList, id),
  anime => anime,
);

export const selectAnimeById = createSelector(
  selectAnimeCommonById,
  selectAnimeExtensionById,
  (animeCommon, animeExtension) => ({ ...animeCommon, ...animeExtension }) as AnimeFull,
);
