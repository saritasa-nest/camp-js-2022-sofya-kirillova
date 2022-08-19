import {
  selectUser,
  selectUserLoading,
} from '@js-camp/react/store/auth/selectors';
import { useAppSelector } from '@js-camp/react/store/store';
import { FC } from 'react';
import { Navigate, Outlet, To } from 'react-router-dom';

import { Loading } from '../../components/Loading';

export const AuthGuard: FC = () => {
  const isLoading = useAppSelector(selectUserLoading);
  const user = useAppSelector(selectUser);
  const redirect: To = {
    pathname: 'login',
    search: new URLSearchParams({
      next: location.pathname,
    }).toString(),
  };

  if (isLoading) {
    return <Loading />;
  }
  if (!user) {
    return <Navigate to={redirect} replace />;
  }
  return <Outlet />;
};
