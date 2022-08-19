import { TokenMapper } from '@js-camp/core/mappers/token.mapper';
import { TokenDto } from '@js-camp/core/dtos/token.dto';

import { http } from '..';

import { LocalStorageService } from './local-storage';

const url = 'auth/token/refresh/';
export namespace TokenService {

  /** Fetches a list of genres. */
  export async function refreshToken(): Promise<void> {
    const token = LocalStorageService.getSessionToken()?.refresh;
    const { data } = await http.post<TokenDto>(url, { refresh: token });
    LocalStorageService.setLocalStorage(data ? TokenMapper.fromDto(data) : null);
  }
}
