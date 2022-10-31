import { createEntityAdapter } from '@reduxjs/toolkit';
import { Genre } from '@js-camp/core/models/genre';

export const genresAdapter = createEntityAdapter<Genre>({
  selectId: genre => genre.id,
});

/** Genres state. */
export interface GenresState {

  /** Error. */
  readonly error?: string;

  /** Whether the genres are loading or not. */
  readonly isLoading: boolean;
}

export const initialState = genresAdapter.getInitialState<GenresState>({
  isLoading: false,
});

export type State = typeof initialState;
