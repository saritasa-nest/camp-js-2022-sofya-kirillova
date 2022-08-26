import { createSlice } from '@reduxjs/toolkit';

import { fetchAnimeById } from './dispatchers';
import { initialState, State, animeExtensionAdapter } from './state';

export const animeExtensionListSlice = createSlice({
  name: 'animeList',
  initialState,
  reducers: {},
  extraReducers: builder => builder
    .addCase(fetchAnimeById.pending, state => {
      state.isLoading = true;
    })
    .addCase(fetchAnimeById.fulfilled, (state, action) => {
      animeExtensionAdapter.setOne(state as State, action.payload);
      state.isLoading = false;
    })
    .addCase(fetchAnimeById.rejected, (state, action) => {
      if (action.error.message) {
        state.error = action.error.message;
      }
      state.isLoading = false;
    }),
});
