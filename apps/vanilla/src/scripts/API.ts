import axios from 'axios';

/** Preconfigured axios instance. */
export const api =
  axios.create({
    baseURL: 'https://api.camp-js.saritasa.rocks/api/v1',
    headers: {
      'Api-Key': '3df19916-03c9-47de-ab5c-5619376c2cef',
    },
  });