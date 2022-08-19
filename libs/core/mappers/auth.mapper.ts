import { RegistrationDto } from '../dtos/auth.dto';
import { Registration } from '../models/auth';

import { Login } from './../models/auth';
import { LoginDto } from './../dtos/auth.dto';

export namespace AuthMapper {

  /**
   * Maps model to dto.
   * @param model Registration model.
   */
  export function toDtoRegister(model: Registration): RegistrationDto {
    return {
      email: model.email,
      first_name: model.firstName,
      last_name: model.lastName,
      password: model.password,
    };
  }

  /**
   * Maps model to dto.
   * @param model Login model.
   */
  export function toDtoLogin(model: Login): LoginDto {
    return {
      email: model.email,
      password: model.password,
    };
  }
}
