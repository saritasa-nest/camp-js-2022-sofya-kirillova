import { createAsyncThunk } from '@reduxjs/toolkit';

import { AnimeService } from '../../api/services/anime';

import { AnimeQueryParams } from '../../model/AnimeParams';

export const fetchAnimeList = createAsyncThunk(
  'animeList/fetchAnimeList',
  (params?: AnimeQueryParams) => AnimeService.fetchAnimeList(params),
);

export const fetchNextAnimeList = createAsyncThunk(
  'anime/fetchNextAnimeList',
  () => AnimeService.fetchNextAnimeList(),
);
