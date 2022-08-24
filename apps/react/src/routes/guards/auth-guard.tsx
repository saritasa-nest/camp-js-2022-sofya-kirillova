import { fetchUser } from '@js-camp/react/store/auth/dispatchers';
import {
  selectUser,
  selectUserLoading,
} from '@js-camp/react/store/auth/selectors';
import { useAppDispatch, useAppSelector } from '@js-camp/react/store/store';
import { FC, useEffect } from 'react';
import { Navigate, Outlet, To } from 'react-router-dom';

import { Loading } from '../../components/Loading';

export const AuthGuard: FC = () => {
  const user = useAppSelector(selectUser);
  const isLoading = useAppSelector(selectUserLoading);
    const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchUser());
  }, []);
  if (isLoading) {
    return <Loading/>;
  }
  const redirect: To = {
    pathname: 'login',
    search: new URLSearchParams({
      next: location.pathname,
    }).toString(),
  };

  if (user === null) {
    return <Navigate to={redirect} replace />;
  }
  return <Outlet />;
};
