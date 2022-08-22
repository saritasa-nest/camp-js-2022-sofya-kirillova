/** Field Error DTO. */
export interface ErrorBaseDto<T> {

  /** Fields validation errors. */
  readonly data?: T;

  /** General information about the error. */
  readonly detail: string;

  /** Code of error. */
  readonly code?: string;
}
