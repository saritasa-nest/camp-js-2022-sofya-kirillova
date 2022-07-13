import { TokenMapper } from '@js-camp/core/mappers/token.mapper';
import { FieldError } from '@js-camp/core/models/fieldError';
import { assertNonNull, displayTheError } from '@js-camp/core/utils/functions';
import { AxiosError } from 'axios';

import { api } from '../scripts/API';

/**
 * Sends a request for user registration.
 * @param userData Parameters for user registration.
 */
export async function register(userData: FormData): Promise<void> {
  try {
    const response = await api.post(`/auth/register/`, userData)
    const token = TokenMapper.fromDto(response.data);
    localStorage.setItem('access', token.access);
    localStorage.setItem('refresh', token.refresh);
    window.location.replace('/');
  } catch (error: unknown) {
    if (!(error instanceof AxiosError) || error.response === undefined) {
      throw error;
    }
    const errorData = error.response.data as FieldError;
    const errorContainer = document.querySelector('.registration__error');
    assertNonNull(errorContainer);
    displayTheError(Object.values(errorData.data)[0][0], errorContainer);
  }
}
