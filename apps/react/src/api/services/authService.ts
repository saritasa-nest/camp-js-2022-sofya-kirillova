import { TokenMapper } from '@js-camp/core/mappers/token.mapper';
import { TokenDto } from '@js-camp/core/dtos/token.dto';
import { UserMapper } from '@js-camp/core/mappers/user.mapper';
import { User } from '@js-camp/core/models/user';
import { UserDto } from '@js-camp/core/dtos/user.dto';
import { AxiosError } from 'axios';
import { ErrorBase } from '@js-camp/core/models/errorBase';
import { ErrorRegistration } from '@js-camp/core/models/errorRegistration';
import { ErrorBaseMapper } from '@js-camp/core/mappers/errorBase';
import { ErrorRegistrationMapper } from '@js-camp/core/mappers/errorRegistration.mapper';
import { LoginDto } from '@js-camp/core/dtos/login.dto';
import { RegistrationDto } from '@js-camp/core/dtos/register.dto';
import { LoginMapper } from '@js-camp/core/mappers/login.mapper';
import { RegisterMapper } from '@js-camp/core/mappers/register.mapper';
import { Login } from '@js-camp/core/models/login';
import { Registration } from '@js-camp/core/models/register';

import { http } from '..';

import { LocalStorageService } from './local-storage';

const loginUrl = 'auth/login/';
const registerUrl = 'auth/register/';
const currentUserUrl = 'users/profile/';

export namespace AuthService {

  /**
   * Login a user.
   * @param loginData Login data.
   */
  export async function login(loginData: Login): Promise<ErrorBase<ErrorRegistration> | void> {
    const loginDataDto: LoginDto = LoginMapper.toDtoLogin(loginData);
    try {
      const { data } = await http.post<TokenDto>(loginUrl, loginDataDto);
      LocalStorageService.setTokenLocalStorage(TokenMapper.fromDto(data));
    } catch (error: unknown) {
      LocalStorageService.setTokenLocalStorage(null);

      if (!(error instanceof AxiosError) || error.response === undefined) {
        throw error;
      }
      throw ErrorBaseMapper.fromDto(error.response.data, ErrorRegistrationMapper.fromDto);
    }

  }

  /**
   * Register a user.
   * @param registerData Register data.
   */
  export async function register(registerData: Registration): Promise<ErrorBase<ErrorRegistration> | void> {
    const registerDataDto: RegistrationDto = RegisterMapper.toDtoRegister(registerData);
    try {
      const { data } = await http.post<TokenDto>(registerUrl, registerDataDto);
      LocalStorageService.setTokenLocalStorage(TokenMapper.fromDto(data));
    } catch (error: unknown) {
      LocalStorageService.setTokenLocalStorage(null);

      if (!(error instanceof AxiosError) || error.response === undefined) {
        throw error;
      }
      throw ErrorBaseMapper.fromDto(error.response.data, ErrorRegistrationMapper.fromDto);
    }
  }

  /** Fetches a list of genres.*/
  export async function getCurrentUser(): Promise<User> {
    const { data } = await http.get<UserDto>(currentUserUrl);
    return UserMapper.fromDto(data);
  }
}
