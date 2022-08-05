import { Immerable, OmitImmerable } from './immerable';

/** User. */
export class User extends Immerable {

  /** First name of the user. */
  public readonly firstName: string;

  /** Last name of the user. */
  public readonly lastName: string;

  /** User avatar. */
  public readonly avatar: string;

  public constructor(data: InitArgsUser) {
    super();
    this.firstName = data.firstName;
    this.lastName = data.lastName;
    this.avatar = data.avatar;
  }
}

type InitArgsUser = OmitImmerable<User>;
