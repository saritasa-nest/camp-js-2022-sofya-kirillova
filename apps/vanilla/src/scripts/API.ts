import axios from 'axios';

import { apiKey } from './constants';

/** Preconfigured axios instance. */
export const api =
  axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
      [apiKey]: import.meta.env.VITE_API_KEY,
    },
  });
