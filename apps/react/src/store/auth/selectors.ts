import { createSelector } from '@reduxjs/toolkit';

import { RootState } from '../store';

/** Selects user from store. */
export const selectUser = createSelector(
  (state: RootState) => state.currentUser.user,
  user => user,
);

/** Selects user loading state. */
export const selectUserLoading = createSelector(
  (state: RootState) => state.currentUser.isLoading,
  isLoading => isLoading,
);

/**  Selects error login from store. */
export const selectErrorLogin = createSelector(
  (state: RootState) => state.login.error,
  error => error,
);

/** Selects authorized login state. */
export const selectsLoginSubmitted = createSelector(
  (state: RootState) => state.login.isAuthorized,
  isAuthorized => isAuthorized,
);

/** Selects error register from store. */
export const selectErrorRegister = createSelector(
  (state: RootState) => state.register.error,
  error => error,
);

/** Selects registered register state. */
export const selectsRegisterSubmitted = createSelector(
  (state: RootState) => state.register.isRegistered,
  isRegistered => isRegistered,
);
