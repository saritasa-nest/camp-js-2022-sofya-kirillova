import axios, { AxiosInstance } from 'axios';

import { addTokenBeforeRequest } from './services/interceptors/authInterceptor';
import { refreshToken } from './services/interceptors/refreshInterceptor';
import { CONFIG } from './config';

export const http: AxiosInstance = axios.create({
  baseURL: CONFIG.apiUrl,
  headers: {
    'Api-Key': CONFIG.apiKey,
  },
});

http.interceptors.request.use(addTokenBeforeRequest);
http.interceptors.response.use(response => response, refreshToken);
