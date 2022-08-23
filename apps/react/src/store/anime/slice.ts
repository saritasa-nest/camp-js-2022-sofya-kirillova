import { createSlice } from '@reduxjs/toolkit';

import { fetchAnimeList } from './dispatchers';
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
      animeAdapter.addMany(state as State, action.payload.results);
      state.countAnime = action.payload.count;
      state.isLoading = false;
    })
    .addCase(fetchAnimeList.rejected, (state, action) => {
      if (action.error.message) {
        state.error = action.error.message;
      }
      state.isLoading = false;
    }),
});
