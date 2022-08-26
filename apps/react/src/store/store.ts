import { configureStore } from '@reduxjs/toolkit';
import {
  TypedUseSelectorHook, useDispatch, useSelector,
} from 'react-redux';

import { studiosSlice } from './studio/slice';
import { animeExtensionListSlice } from './animeExtender/slice';
import { animeCommonListSlice } from './animeCommon/slice';
import { userSlice, loginSlice, registerSlice } from './auth/slice';
import { genresSlice } from './genre/slice';

export const store = configureStore({
  reducer: {
    genres: genresSlice.reducer,
    studios: studiosSlice.reducer,
    currentUser: userSlice.reducer,
    login: loginSlice.reducer,
    register: registerSlice.reducer,
    animeCommonList: animeCommonListSlice.reducer,
    animeExtensionList: animeExtensionListSlice.reducer,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware({
    // We need to disable this check to allow ES6 classes in Redux.
    // You can find more info about this middleware in docs:
    // https://redux-toolkit.js.org/api/serializabilityMiddleware
    serializableCheck: false,
  }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

/** Typed `useDispatch` hook. */
export const useAppDispatch = (): AppDispatch => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
