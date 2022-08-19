import { Token } from '@js-camp/core/models/token';

/** Local storage service. */
export namespace LocalStorageService {
  const KEY = 'token';

  /**
   * Saves session token into local storage.
   * @param token Token.
   */
  export const setLocalStorage = (token?: Token | null): void => {
    if (!token || token === null) {
      localStorage.removeItem(KEY);
    }

    localStorage.setItem(KEY, JSON.stringify(token));
  };

  /** Gets session token. */
  export const getSessionToken = (): Token | null => {
    const tokenData = localStorage.getItem(KEY);
    if (tokenData == null) {
      return null;
    }
    return JSON.parse(tokenData) as Token;
  };
}
