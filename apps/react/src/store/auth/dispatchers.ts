import { Login, Registration } from '@js-camp/core/models/auth';
import { createAsyncThunk } from '@reduxjs/toolkit';

import { AuthService } from '../../api/services/authService';

export const currentUser = createAsyncThunk(
  'auth/currentUser',
  () => AuthService.getCurrentUser(),
);

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async(loginData: Login, { rejectWithValue }) => {
    try {
      return await AuthService.login(loginData);
    } catch (error: unknown) {
      return rejectWithValue(error);
    }
  },
);

export const register = createAsyncThunk(
  'auth/register',
  async(registerData: Registration, { rejectWithValue }) => {
    try {
      return await AuthService.register(registerData);
    } catch (error: unknown) {
      return rejectWithValue(error);
    }
  },
);
