import { createSelector } from '@reduxjs/toolkit';

import { RootState } from '../store';

/** Selects all genres from store. */
export const selectUser = createSelector(
  (state: RootState) => state.currentUser.user,
  user => user,
);

/** Selects all genres from store. */
export const selectUserLoading = createSelector(
  (state: RootState) => state.currentUser.isLoading,
  isLoading => isLoading,
);

/** Selects all genres from store. */
export const selectErrorLogin = createSelector(
  (state: RootState) => state.login.error,
  error => error,
);

/** Selects all genres from store. */
export const selectAuthorizedLogin = createSelector(
  (state: RootState) => state.login.isAuthorized,
  isAuthorized => isAuthorized,
);

/** Selects all genres from store. */
export const selectErrorRegister = createSelector(
  (state: RootState) => state.register.error,
  error => error,
);

/** Selects all genres from store. */
export const selectRegisteredRegister = createSelector(
  (state: RootState) => state.register.isRegistered,
  isRegistered => isRegistered,
);
