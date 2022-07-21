import { TokenMapper } from '@js-camp/core/mappers/token.mapper';
import axios from 'axios';

import { api } from '../scripts/API';

import { ACCESS_TOKEN_URL, REFRESH_TOKEN_URL } from './constants';

/**
 * User token verification.
 * @returns Whether the user is authorized.
 */
export async function verifyToken(): Promise<boolean> {
  const accessToken = localStorage.getItem('access');
  let isTokenValid = false;
  if (accessToken === null) {
    return isTokenValid;
  }
  const errorCode = 401;
  const tokenInterceptor = api.interceptors.response.use(
    response => {
      if (response.config.url === REFRESH_TOKEN_URL) {
        const token = TokenMapper.fromDto(response.data);
        localStorage.setItem('access', token.access);
        localStorage.setItem('refresh', token.refresh);
      }
      isTokenValid = true;
    }, async error => {
      if (error.config.url === ACCESS_TOKEN_URL && error.response.status === errorCode) {
        const refreshToken = localStorage.getItem('refresh');
        await api.post(REFRESH_TOKEN_URL, { refresh: refreshToken });
      } else if (error.config.url === REFRESH_TOKEN_URL) {
        localStorage.removeItem('access');
        localStorage.removeItem('refresh');
      }
    },
  );
  axios.interceptors.response.eject(tokenInterceptor);

  await api.post(ACCESS_TOKEN_URL, { token: accessToken });
  return isTokenValid;
}
