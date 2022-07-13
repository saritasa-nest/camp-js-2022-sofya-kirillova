import { FieldError } from '@js-camp/core/models/fieldError';

import { TokenMapper } from '@js-camp/core/mappers/token.mapper';
import { assertNonNull, displayTheError } from '@js-camp/core/utils/functions';

import { api } from '../scripts/API';
import { AxiosError } from 'axios';

/**
 * Sends an authorization request.
 * @param userData Sends a request for user authorization.
 */
export async function authentication(userData: FormData): Promise<void> {
  try {
    const response = await api.post(`/auth/login/`, userData)
    const token = TokenMapper.fromDto(response.data);
    localStorage.setItem('access', token.access);
    localStorage.setItem('refresh', token.refresh);
    window.location.replace('/');
  } catch (error: unknown) {
    if (!(error instanceof AxiosError) || error.response === undefined) {
      throw error;
    }
    const errorData = error.response.data as FieldError;
    const errorContainer = document.querySelector('.authorization__error');
    assertNonNull(errorContainer);
    displayTheError(errorData.detail, errorContainer);
  }

}
