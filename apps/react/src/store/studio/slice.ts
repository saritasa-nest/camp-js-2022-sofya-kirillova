import { Studio } from '@js-camp/core/models/studio';
import { createSlice } from '@reduxjs/toolkit';

import { fetchStudioById } from './dispatchers';
import { initialState, State, studioAdapter } from './state';

export const studiosSlice = createSlice({
  name: 'studios',
  initialState,
  reducers: {
    addStudios(state, action: { payload: Studio[];}) {
      studioAdapter.addMany(state as State, action.payload);
    },
  },
  extraReducers: builder => builder
    .addCase(fetchStudioById.pending, state => {
      state.isLoading = true;
    })
    .addCase(fetchStudioById.fulfilled, (state, action) => {
      studioAdapter.addOne(state as State, action.payload);
      state.isLoading = false;
    })
    .addCase(fetchStudioById.rejected, (state, action) => {
      if (action.error.message) {
        state.error = action.error.message;
      }
      state.isLoading = false;
    }),
});

export const { addStudios } = studiosSlice.actions;
