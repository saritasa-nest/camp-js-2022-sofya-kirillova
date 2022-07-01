import axios from 'axios';

import { API_KEY } from '../pages/constants';

/**
 * Prepared data for axios.
 */
export const myAxios =
  axios.create({
    baseURL: 'https://api.camp-js.saritasa.rocks/api/v1',
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
      'Api-Key': API_KEY,
    },
  });
