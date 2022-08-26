import { createEntityAdapter } from '@reduxjs/toolkit';

import { AnimeExtension } from '../../model/Anime';

export const animeExtensionAdapter = createEntityAdapter<AnimeExtension>({
  selectId: anime => anime.id,
});

/** Anime extension list state. */
export interface AnimeState {

  /** Error. */
  readonly error?: string;

  /** Whether the anime are loading or not. */
  readonly isLoading: boolean;
}

export const initialState = animeExtensionAdapter.getInitialState<AnimeState>({
  isLoading: false,
});

export type State = typeof initialState;
