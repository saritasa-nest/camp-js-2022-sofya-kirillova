import { AnimeCommon } from '@js-camp/core/models/animeCommon';
import { createEntityAdapter } from '@reduxjs/toolkit';

export const animeAdapter = createEntityAdapter<AnimeCommon>({
  selectId: anime => anime.id,
});

/** Anime list state. */
export interface AnimeState {

  /** URL of the next product page. */
  readonly next: string;

  /** Number of anime. */
  readonly count: number;

  /** Error. */
  readonly error?: string;

  /** Whether the anime are loading or not. */
  readonly isLoading: boolean;
}

export const initialState = animeAdapter.getInitialState<AnimeState>({
  isLoading: false,
  next: '',
  count: 0,
});

export type State = typeof initialState;
