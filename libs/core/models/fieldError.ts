import { Immerable, OmitImmerable } from './immerable';

/** Error. */
export class FieldError extends Immerable {

  /** Fields validation errors. */
  public readonly data: {

    /** Errors in checking the "email" field. */
    readonly email?: [string];

    /** Errors in checking the "first name" field. */
    readonly firstName?: [string];

    /** Errors in checking the "last name" field. */
    readonly lastName?: [string];

    /** Errors in checking the "avatar" field. */
    readonly avatar?: [string];

    /** Errors in checking the "password" field. */
    readonly password?: [string];

    /** Errors not related to the field. */
    readonly nonFieldErrors?: [string];

  };

  /** Code of error */
  readonly code?: string;

  /** General information about the error. */
  public readonly detail: string;




  public constructor(data: InitArgsError) {
    super();
    this.data = data.data;
    this.detail = data.detail;
    this.code = data.code;
  }
}

type InitArgsError = OmitImmerable<FieldError>;
