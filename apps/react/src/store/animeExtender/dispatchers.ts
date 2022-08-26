import { AnimeCommon } from '@js-camp/core/models/animeCommon';
import { createAsyncThunk } from '@reduxjs/toolkit';

import { AnimeService } from '../../api/services/anime';
import { addAnimeCommon } from '../animeCommon/slice';

export const fetchAnimeById = createAsyncThunk(
  'anime/fetchAnimeById',
  async(id: number, { dispatch }) => {
    const animeFull = await AnimeService.fetchAnimeById(id);

    // const { id, image, } = animeFull;
    dispatch(addAnimeCommon(animeFull as AnimeCommon));

    return animeFull;
  },
);
