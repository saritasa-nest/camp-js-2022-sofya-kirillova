import { FieldErrorMapper } from '@js-camp/core/mappers/fieldError.mapper';
import { TokenMapper } from '@js-camp/core/mappers/token.mapper';
import { FieldError } from '@js-camp/core/models/fieldError';

import { AxiosError } from 'axios';

import { api } from '../scripts/API';

/**
 * Sends a request for user registration.
 * @param userData Parameters for user registration.
 */
export async function register(userData: FormData): Promise<void | FieldError> {
  try {
    const response = await api.post(`/auth/register/`, userData);
    const token = TokenMapper.fromDto(response.data);
    localStorage.setItem('access', token.access);
    localStorage.setItem('refresh', token.refresh);
    window.location.replace('/');
  } catch (error: unknown) {
    if (!(error instanceof AxiosError) || error.response === undefined) {
      throw error;
    }
    return FieldErrorMapper.fromDto(error.response.data);
  }
}
