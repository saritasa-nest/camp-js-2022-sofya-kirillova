import axios from 'axios';

import { API_KEY } from './constants';

/** Preconfigured axios instance. */
export const api =
  axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
      [API_KEY]: import.meta.env.VITE_API_KEY,
    },
  });

// const tokenInterceptor = api.interceptors.response.use(
//   response => {
//     if (response) {

//     }
//     console.log(response);
//     isVerifyToken = true;
//   }, async error => {
//     if (error.response.status === errorCode) {

//       isVerifyToken = await updateToken();
//     }
//   },
// );
