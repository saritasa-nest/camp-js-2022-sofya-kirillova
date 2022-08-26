import { AnimeCommon } from '@js-camp/core/models/animeCommon';
import { createSlice } from '@reduxjs/toolkit';

import { fetchAnimeList, fetchNextAnimeList } from './dispatchers';
import { initialState, animeAdapter, State } from './state';

export const animeCommonListSlice = createSlice({
  name: 'animeList',
  initialState,
  reducers: {
    addAnimeCommon(state, action: { payload: AnimeCommon; }) {
      animeAdapter.setOne(state as State, action.payload);
    },
  },
  extraReducers: builder => builder
    .addCase(fetchAnimeList.pending, state => {
      state.isLoading = true;
    })
    .addCase(fetchAnimeList.fulfilled, (state, action) => {
      animeAdapter.addMany(state as State, action.payload);
      state.listIds = action.payload.map(anime => anime.id);
      state.isLoading = false;
      state.hasNext = true;
    })
    .addCase(fetchAnimeList.rejected, (state, action) => {
      if (action.error.message) {
        state.error = action.error.message;
      }
      state.isLoading = false;
    })
    .addCase(fetchNextAnimeList.fulfilled, (state, action) => {
      if (action.payload === null) {
        state.hasNext = false;
        animeAdapter.addMany(state as State, []);
      } else {
        state.hasNext = true;
        animeAdapter.addMany(state as State, action.payload);
        state.listIds = state.listIds.concat(action.payload.map(anime => anime.id));
      }
      state.isLoading = false;
    }),
});

export const { addAnimeCommon } = animeCommonListSlice.actions;
