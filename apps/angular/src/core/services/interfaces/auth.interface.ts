/** Data for user registration. */
export interface RegistrationData {

  /** Email. */
  readonly email: string;

  /** First name. */
  readonly firstName: string;

  /** Last name. */
  readonly lastName: string;

  /** Password. */
  readonly password: string;

}

/** Data for user login. */
export interface LoginData {

  /** Email. */
  readonly email: string;

  /** Password. */
  readonly password: string;
}
