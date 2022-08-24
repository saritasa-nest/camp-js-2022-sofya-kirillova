import { ErrorBase } from '@js-camp/core/models/errorBase';
import { ErrorRegistration } from '@js-camp/core/models/errorRegistration';
import { User } from '@js-camp/core/models/user';

/** User state. */
export interface UserState {

  /** User. */
  readonly user: User | null;

  /** Error. */
  readonly error?: string;

  /** Whether the user is loading or not. */
  readonly isLoading: boolean;
}

/** Login state. */
export interface LoginState {

  /** Login. */
  readonly isAuthorized: boolean;

  /** Error. */
  readonly error?: ErrorBase<ErrorRegistration>;

  /** Whether login is in process or not. */
  readonly isLoading: boolean;
}

/** Register state. */
export interface RegisterState {

  /** Register. */
  readonly isRegistered: boolean;

  /** Error. */
  readonly error?: ErrorBase<ErrorRegistration>;

  /** Whether register is in process or not. */
  readonly isLoading: boolean;
}

export const initialUserState: UserState = {
  isLoading: true,
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
