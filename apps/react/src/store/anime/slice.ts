import { createSlice } from '@reduxjs/toolkit';

import { fetchAnimeList, fetchNextAnimeList } from './dispatchers';
import { initialState, animeAdapter, State } from './state';

export const animeListSlice = createSlice({
  name: 'animeList',
  initialState,
  reducers: {},
  extraReducers: builder => builder
    .addCase(fetchAnimeList.pending, state => {
      state.isLoading = true;
    })
    .addCase(fetchAnimeList.fulfilled, (state, action) => {
      animeAdapter.setAll(state as State, action.payload);
      state.isLoading = false;
    })
    .addCase(fetchAnimeList.rejected, (state, action) => {
      if (action.error.message) {
        state.error = action.error.message;
      }
      state.isLoading = false;
    })
    .addCase(fetchNextAnimeList.fulfilled, (state, action) => {
      if (action.payload === null) {
        animeAdapter.addMany(state as State, []);
      } else {
        animeAdapter.addMany(state as State, action.payload);
      }
      state.isLoading = false;
    }),
});
