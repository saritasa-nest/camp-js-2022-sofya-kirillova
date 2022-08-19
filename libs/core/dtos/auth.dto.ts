/** Data for user registration. */
export interface RegistrationDto {

  /** Email. */
  readonly email: string;

  /** First name. */
  readonly first_name: string;

  /** Last name. */
  readonly last_name: string;

  /** Password. */
  readonly password: string;

}

/** Data for user login. */
export interface LoginDto {

  /** Email. */
  readonly email: string;

  /** Password. */
  readonly password: string;
}
