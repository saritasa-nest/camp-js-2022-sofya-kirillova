import { FieldErrorDto } from '../dtos/FieldError.dto';
import { FieldError } from '../models/fieldError';

export namespace FieldErrorMapper {

  /**
   * Maps dto to model.
   * @param dto Field error dto.
   */
  export function fromDto(dto: FieldErrorDto): FieldError {
    return new FieldError({
      data: {
        email: dto.data?.email,
        firstName: dto.data?.first_name,
        lastName: dto.data?.last_name,
        password: dto.data?.password,
        nonFieldErrors: dto.data?.non_field_errors,
      },
      detail: dto.detail,
      code: dto.code,
    });
  }
}
