import { ErrorRegistration } from './../models/errorRegistration';
import { ErrorRegistrationDto } from './../dtos/errorRegistration.dto';

export namespace ErrorRegistrationMapper {

  /**
   * Maps dto to model.
   * @param dto Field error dto.
   */
  export function fromDto(dto: ErrorRegistrationDto): ErrorRegistration {
    return new ErrorRegistration({
      email: dto.email ? dto.email[0] : null,
      firstName: dto.first_name ? dto.first_name[0] : null,
      lastName: dto.last_name ? dto.last_name[0] : null,
      password: dto.password ? dto.password[0] : null,
      nonFieldErrors: dto.non_field_errors ? dto.non_field_errors[0] : null,
    });
  }
}
