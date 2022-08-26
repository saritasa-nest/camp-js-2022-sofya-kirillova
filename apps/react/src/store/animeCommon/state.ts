import { AnimeCommon } from '@js-camp/core/models/animeCommon';
import { createEntityAdapter } from '@reduxjs/toolkit';

export const animeAdapter = createEntityAdapter<AnimeCommon>({
  selectId: anime => anime.id,
});

/** Anime list state. */
export interface AnimeState {

  /** Anime ids from the list. */
  readonly listIds: number[];

  /** Error. */
  readonly error?: string;

  /** Whether the anime are loading or not. */
  readonly isLoading: boolean;

  /** Is there a sequel to the anime list. */
  readonly hasNext: boolean;
}

export const initialState = animeAdapter.getInitialState<AnimeState>({
  listIds: [],
  isLoading: false,
  hasNext: true,
});

export type State = typeof initialState;
