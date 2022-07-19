
import axios from 'axios';

import { API_KEY } from '../scripts/constants';

/** Preconfigured axios instance. */
export const api =
  axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
      [API_KEY]: import.meta.env.VITE_API_KEY,
    },
  });
