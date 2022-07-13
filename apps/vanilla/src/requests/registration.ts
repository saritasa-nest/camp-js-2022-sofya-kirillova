import { TokenMapper } from '@js-camp/core/mappers/token.mapper';
import { FieldError } from '@js-camp/core/models/fieldError';
import { assertNonNull, displayTheError } from '@js-camp/core/utils/functions';

import { api } from '../scripts/API';

/**
 * Sends a request for user registration.
 * @param userData Parameters for user registration.
 */
export async function register(userData: FormData): Promise<void> {
  await api.post(`/auth/register/`, userData).then(res => {
    const token = TokenMapper.fromDto(res.data);
    localStorage.setItem('access', token.access);
    localStorage.setItem('refresh', token.refresh);
    window.location.replace('/');

  })
    .catch(res => {
    if (res.response.data.data !== undefined) {
      const error = res.response.data as FieldError;

      const h5Element = document.querySelector('.registration__error');
      assertNonNull(h5Element);
      displayTheError(Object.values(error.data)[0][0], h5Element);
    }

  });
}
