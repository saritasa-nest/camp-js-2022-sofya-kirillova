import {
  selectUser,
  selectUserLoading,
} from '@js-camp/react/store/auth/selectors';
import { useAppSelector } from '@js-camp/react/store/store';
import { FC } from 'react';
import { Navigate, Outlet, To, useSearchParams } from 'react-router-dom';

import { Loading } from '../../components/Loading';

export const AuthGuard: FC = () => {
  const [searchParams] = useSearchParams();

  console.log(searchParams);
  const isLoading = useAppSelector(selectUserLoading);
  const user = useAppSelector(selectUser);
  const redirect: To = {
    pathname: 'login',
    search: new URLSearchParams({
      next: location.pathname,
    }).toString(),
  };

  if (user === null) {
    return <Navigate to={redirect} replace />;
  }
  if (isLoading === true) {
    return <Loading />;
  }
  return <Outlet />;
};
