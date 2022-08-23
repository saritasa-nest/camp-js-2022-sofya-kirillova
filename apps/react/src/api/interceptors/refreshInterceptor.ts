import { AxiosError, AxiosRequestConfig } from 'axios';

import { http } from '..';
import { CONFIG } from '../config';
import { TokenService } from '../services/tokenService';

/**
 * Interceptor to append token to requests.
 * @param requestConfig Axios config.
 */
export const refreshToken = async(requestConfig: AxiosRequestConfig): Promise<AxiosRequestConfig> => {
  if (!(requestConfig instanceof AxiosError)) {
    throw requestConfig;
  }
  const requestUrl = (requestConfig.config.baseURL ?? '') + (requestConfig.config.url ?? '');
  if (requestConfig.response?.status !== 401 || shouldInterceptToken(requestUrl)) {
    throw requestConfig;
  }
  await TokenService.refreshToken();

  const response = await http(requestUrl);
  return response;

};

const shouldInterceptToken = (url: string): boolean => url.startsWith(
  new URL('auth', CONFIG.apiUrl).toString(),
);
