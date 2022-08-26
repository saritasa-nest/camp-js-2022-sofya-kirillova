import { State } from './../anime/state';
import { createEntityAdapter } from '@reduxjs/toolkit';
import { Studio } from '@js-camp/core/models/studio';

export const studioAdapter = createEntityAdapter<Studio>({
  selectId: studio => studio.id,
});

/** Studios state. */
export interface StudiosState {

  /** Error. */
  readonly error?: string;

  /** Whether the studios are loading or not. */
  readonly isLoading: boolean;
}

export const initialState = studioAdapter.getInitialState<StudiosState>({
  isLoading: false,
});

export type State = typeof initialState;
