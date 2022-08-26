import { createAsyncThunk } from '@reduxjs/toolkit';

import { StudioService } from '../../api/services/studioService';

export const fetchStudioById = createAsyncThunk(
  'studios/fetch',
  (id: number) => StudioService.fetchStudioById(id),
);
