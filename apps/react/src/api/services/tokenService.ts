import { TokenMapper } from '@js-camp/core/mappers/token.mapper';
import { TokenDto } from '@js-camp/core/dtos/token.dto';

import { http } from '..';

import { LocalStorageService } from './local-storage';

const url = 'auth/token/refresh/';
export namespace TokenService {

  /** Refreshes access token. */
  export async function refreshToken(): Promise<void> {
    const token = LocalStorageService.getSessionToken()?.refresh;
    const { data } = await http.post<TokenDto>(url, { refresh: token });
    LocalStorageService.setTokenLocalStorage(data ? TokenMapper.fromDto(data) : null);
  }
}
