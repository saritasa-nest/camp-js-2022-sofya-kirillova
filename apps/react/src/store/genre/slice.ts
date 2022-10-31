import { Genre } from '@js-camp/core/models/genre';
import { createSlice } from '@reduxjs/toolkit';

import { fetchGenres } from './dispatchers';
import { genresAdapter, initialState, State } from './state';

export const genresSlice = createSlice({
  name: 'genres',
  initialState,
  reducers: {
    addGenres(state, action: { payload: Genre[];}) {
      genresAdapter.addMany(state as State, action.payload);
    },
  },
  extraReducers: builder => builder
    .addCase(fetchGenres.pending, state => {
      state.isLoading = true;
    })
    .addCase(fetchGenres.fulfilled, (state, action) => {
      genresAdapter.addMany(state as State, action.payload);
      state.isLoading = false;
    })
    .addCase(fetchGenres.rejected, (state, action) => {
      if (action.error.message) {
        state.error = action.error.message;
      }
      state.isLoading = false;
    }),
});

export const { addGenres } = genresSlice.actions;
