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
        email: dto.data?.email ?? null,
        firstName: dto.data?.first_name ?? null,
        lastName: dto.data?.last_name ?? null,
        password: dto.data?.password ?? null,
        nonFieldErrors: dto.data?.non_field_errors ?? null,
      } ?? null,
      detail: dto.detail,
      code: dto.code ?? null,
    });
  }
}
