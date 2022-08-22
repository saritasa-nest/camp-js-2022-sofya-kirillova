import { Immerable, OmitImmerable } from './immerable';

/** Errors in checking fields for registration. */
export class ErrorRegistration extends Immerable {

  /** Errors in checking the "email" field. */
  public readonly email: string | null;

  /** Errors in checking the "first name" field. */
  public readonly firstName: string | null;

  /** Errors in checking the "last name" field. */
  public readonly lastName: string | null;

  /** Errors in checking the "password" field. */
  public readonly password: string | null;

  /** Errors not related to the field. */
  public readonly nonFieldErrors: string | null;

  public constructor(data: InitArgsError) {
    super();
    this.email = data.email;
    this.firstName = data.firstName;
    this.lastName = data.lastName;
    this.password = data.password;
    this.nonFieldErrors = data.nonFieldErrors;
  }
}

type InitArgsError = OmitImmerable<ErrorRegistration>;
