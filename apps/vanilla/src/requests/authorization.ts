import { FieldError } from '@js-camp/core/models/fieldError';

import { TokenMapper } from '@js-camp/core/mappers/token.mapper';
import { assertNonNull, displayTheError } from '@js-camp/core/utils/functions';

import { api } from '../scripts/API';

/**
 * Sends an authorization request.
 * @param userData Sends a request for user authorization.
 */
export async function authentication(userData: FormData): Promise<void> {
  await api.post(`/auth/login/`, userData).then(res => {
    const token = TokenMapper.fromDto(res.data);
    localStorage.setItem('access', token.access);
    localStorage.setItem('refresh', token.refresh);
    window.location.replace('/');

  })
    .catch(res => {
      const error = res.response.data as FieldError;
      const h5Element = document.querySelector('.authorization__error');
      assertNonNull(h5Element);
      displayTheError(error.detail, h5Element);
  });
}
