import { createAsyncThunk } from '@reduxjs/toolkit';

import { GenresService } from '../../api/services/genreService';

export const fetchGenres = createAsyncThunk(
  'genres/fetch',
  () => GenresService.fetchGenres(),
);

export const fetchGenresById = createAsyncThunk(
  'genres/fetchGenreById',
  (id: number) => GenresService.fetchGenreById(id),
);
