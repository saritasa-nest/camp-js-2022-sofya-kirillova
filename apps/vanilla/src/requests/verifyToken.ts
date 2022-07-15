import { api } from '../scripts/API';

import { updateToken } from './refreshToken';

/**
 * User access token verification.
 * @returns Whether the user is authorized.
 */
export async function verifyToken(): Promise<boolean> {
  const accessToken = localStorage.getItem('access');
  let isVerifyToken = false;
  const errorCode = 401;
  await api.post(`/auth/token/verify/`, { token: accessToken }).then(() => {
    isVerifyToken = true;
  })
    .catch(async res => {
      if (res.response.status === errorCode) {
        isVerifyToken = await updateToken();
      }
    });
  return isVerifyToken;
}
