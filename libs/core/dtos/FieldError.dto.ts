/** Field Error DTO. */
export interface FieldErrorDto {

  /** Fields validation errors. */
  readonly data: {

    /** Errors in checking the "email" field. */
    readonly email?: [string];

    /** Errors in checking the "first name" field. */
    readonly first_name?: [string];

    /** Errors in checking the "last name" field. */
    readonly last_name?: [string];

    /** Errors in checking the "password" field. */
    readonly password?: [string];

    /** Errors not related to the field. */
    readonly non_field_errors?: [string];
  };

  /** General information about the error. */
  readonly detail: string;

  /** Code of error. */
  readonly code?: string;
}
