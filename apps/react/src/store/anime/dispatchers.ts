import { createAsyncThunk } from '@reduxjs/toolkit';

import { AnimeService } from '../../api/services/anime';

export const fetchAnimeList = createAsyncThunk(
  'animeList/fetchAnimeList',
  () => AnimeService.fetchAnimeList(),
);

/** Preset for task 4. */
export const fetchAnimeById = createAsyncThunk(
  'anime/fetchAnime',
  (id: number) => AnimeService.fetchAnimeById(id),
);
