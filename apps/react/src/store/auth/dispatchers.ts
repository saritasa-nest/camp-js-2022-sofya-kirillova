import { Login } from '@js-camp/core/models/login';
import { Registration } from '@js-camp/core/models/register';
import { createAsyncThunk } from '@reduxjs/toolkit';

import { AuthService } from '../../api/services/authService';

export const fetchUser = createAsyncThunk(
  'auth/fetch',
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
