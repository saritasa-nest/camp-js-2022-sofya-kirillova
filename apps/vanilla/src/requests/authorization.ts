import { TokenMapper } from '@js-camp/core/mappers/token.mapper';
import { FieldErrorMapper } from '@js-camp/core/mappers/fieldError.mapper';

import { AxiosError } from 'axios';

import { FieldError } from '@js-camp/core/models/fieldError';

import { api } from '../scripts/API';

/**
 * Sends an authorization request.
 * @param authData Parameters for user authorization.
 */
export async function login(authData: FormData): Promise<true | FieldError> {
  try {
    const response = await api.post(`/auth/login/`, authData);
    const token = TokenMapper.fromDto(response.data);
    localStorage.setItem('access', token.access);
    localStorage.setItem('refresh', token.refresh);
    return true;
  } catch (error: unknown) {
    if (!(error instanceof AxiosError) || error.response === undefined) {
      throw error;
    }
    return FieldErrorMapper.fromDto(error.response.data);
  }
}
