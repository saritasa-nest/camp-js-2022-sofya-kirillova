import { createAsyncThunk } from '@reduxjs/toolkit';

import { AnimeService } from '../../api/services/anime';

import { AnimeQueryParams } from './../../model/AnimeParams';

export const fetchAnimeList = createAsyncThunk(
  'animeList/fetchAnimeList',
  (params?: AnimeQueryParams) => AnimeService.fetchAnimeList(params),
);

export const fetchNextAnimeList = createAsyncThunk(
  'animeList/fetchNextAnimeList',
  () => AnimeService.fetchNextAnimeList(),
);

/** Preset for task 4. */
export const fetchAnimeById = createAsyncThunk(
  'anime/fetchAnime',
  (id: number) => AnimeService.fetchAnimeById(id),
);
