import { RegistrationDto } from '../dtos/register.dto';
import { Registration } from '../models/register';

export namespace RegisterMapper {

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
}
