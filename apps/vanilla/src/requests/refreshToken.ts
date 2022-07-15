import { TokenMapper } from '@js-camp/core/mappers/token.mapper';

import { api } from '../scripts/API';

/**
 * Update user access token.
 * @returns Whether the user is authorized.
 */
export async function updateToken(): Promise<boolean> {
  let isVerifyToken = false;
  const refreshToken = localStorage.getItem('refresh');
  api.interceptors.response.use(
    res => {
      isVerifyToken = true;
      const token = TokenMapper.fromDto(res.data);
      localStorage.setItem('access', token.access);
      localStorage.setItem('refresh', token.refresh);
    },
  );
  api.interceptors.request.use(
    () => {
      localStorage.removeItem('access');
      localStorage.removeItem('refresh');
    },
  );

  await api.post(`/auth/token/refresh/`, { refresh: refreshToken });
  return isVerifyToken;
}
