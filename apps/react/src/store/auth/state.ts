import { FieldError } from '@js-camp/core/models/fieldError';
import { User } from '@js-camp/core/models/user';

/** User state. */
export interface UserState {

  /** User. */
  readonly user: User | null;

  /** Error. */
  readonly error?: string;

  /** Whether the genres are loading or not. */
  readonly isLoading: boolean;
}

/** User state. */
export interface LoginState {

  /** User. */
  readonly isAuthorized: boolean;

  /** Error. */
  readonly error?: FieldError;

  /** Whether the genres are loading or not. */
  readonly isLoading: boolean;
}

/** User state. */
export interface RegisterState {

  /** User. */
  readonly isRegistered: boolean;

  /** Error. */
  readonly error?: FieldError;

  /** Whether the genres are loading or not. */
  readonly isLoading: boolean;
}

export const initialUserState: UserState = {
  isLoading: false,
  user: null,
};

export const initialLoginState: LoginState = {
  isLoading: false,
  isAuthorized: false,
};

export const initialRegisterState: RegisterState = {
  isLoading: false,
  isRegistered: false,
};
