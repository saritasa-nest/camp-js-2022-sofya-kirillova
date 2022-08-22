import { TokenMapper } from '@js-camp/core/mappers/token.mapper';
import { TokenDto } from '@js-camp/core/dtos/token.dto';
import { UserMapper } from '@js-camp/core/mappers/user.mapper';
import { User } from '@js-camp/core/models/user';
import { UserDto } from '@js-camp/core/dtos/user.dto';
import { AnimeDto } from '@js-camp/core/dtos/anime.dto';
import { Login, Registration } from '@js-camp/core/models/auth';
import { AuthMapper } from '@js-camp/core/mappers/auth.mapper';
import { LoginDto, RegistrationDto } from '@js-camp/core/dtos/auth.dto';
import { AxiosError } from 'axios';
import { ErrorBase } from '@js-camp/core/models/errorBase';
import { ErrorRegistration } from '@js-camp/core/models/errorRegistration';
import { ErrorBaseMapper } from '@js-camp/core/mappers/errorBase';
import { ErrorRegistrationMapper } from '@js-camp/core/mappers/errorRegistration.mapper';

import { http } from '..';

import { LocalStorageService } from './local-storage';

const loginUrl = 'auth/login/';
const registerUrl = 'auth/register/';
const currentUserUrl = 'users/profile/';

export namespace AuthService {

  /**
   * Login.
   * @param loginData Login data.
   */
  export async function login(loginData: Login): Promise<ErrorBase<ErrorRegistration> | void> {
    const loginDataDto: LoginDto = AuthMapper.toDtoLogin(loginData);
    try {
      const { data } = await http.post<TokenDto>(loginUrl, loginDataDto);
      LocalStorageService.setLocalStorage(TokenMapper.fromDto(data));
    } catch (error: unknown) {
      LocalStorageService.setLocalStorage(null);

      if (!(error instanceof AxiosError) || error.response === undefined) {
        throw error;
      }
      throw ErrorBaseMapper.fromDto(error.response.data, ErrorRegistrationMapper.fromDto);
    }

  }

  /**
   * Register.
   * @param registerData Register data.
   */
  export async function register(registerData: Registration): Promise<ErrorBase<ErrorRegistration> | void> {
    const registerDataDto: RegistrationDto = AuthMapper.toDtoRegister(registerData);
    try {
      const { data } = await http.post<TokenDto>(registerUrl, registerDataDto);
      LocalStorageService.setLocalStorage(TokenMapper.fromDto(data));
    } catch (error: unknown) {
      LocalStorageService.setLocalStorage(null);

      if (!(error instanceof AxiosError) || error.response === undefined) {
        throw error;
      }
      throw ErrorBaseMapper.fromDto(error.response.data, ErrorRegistrationMapper.fromDto);
    }
  }

  /**
   * User.
   */
  export async function getCurrentUser(): Promise<User> {
    const { data } = await http.get<UserDto>(currentUserUrl);
    return UserMapper.fromDto(data);
  }

  /**
   * Login.
   * @param loginData Login data.
   */
  export async function anime(): Promise<void> {
    await http.get<AnimeDto>('anime/anime/');
  }
}
