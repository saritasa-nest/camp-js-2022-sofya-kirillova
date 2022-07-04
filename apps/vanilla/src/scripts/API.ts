import axios from 'axios';

/** Preconfigured axios instance. */
export const api =
  axios.create({
    baseURL: 'https://api.camp-js.saritasa.rocks/api/v1',
    headers: {
      'Api-Key': process.env.API_KEY,
    },
  });
