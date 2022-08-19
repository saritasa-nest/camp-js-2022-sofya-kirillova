import { Immerable, OmitImmerable } from './immerable';

/** Data for user login. */
export class Login extends Immerable {

  /** Email. */
  public readonly email: string;

  /** Password. */
  public readonly password: string;

  public constructor(data: InitArgsLogin) {
    super();
    this.email = data.email;
    this.password = data.password;
  }
}

/** Data for user registration. */
export class Registration extends Immerable {

  /** Email. */
  public readonly email: string;

  /** First name. */
  public readonly firstName: string;

  /** Last name. */
  public readonly lastName: string;

  /** Password. */
  public readonly password: string;

  public constructor(data: InitArgsRegistration) {
    super();
    this.email = data.email;
    this.firstName = data.firstName;
    this.lastName = data.lastName;
    this.password = data.password;
  }
}

type InitArgsRegistration = OmitImmerable<Registration>;
type InitArgsLogin = OmitImmerable<Login>;
