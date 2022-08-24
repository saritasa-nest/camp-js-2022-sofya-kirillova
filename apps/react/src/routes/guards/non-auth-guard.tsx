import { fetchUser } from '@js-camp/react/store/auth/dispatchers';
import { selectUser, selectUserLoading } from '@js-camp/react/store/auth/selectors';
import { useAppDispatch, useAppSelector } from '@js-camp/react/store/store';
import { FC, useEffect } from 'react';
import { Navigate, Outlet, To } from 'react-router-dom';

import { Loading } from '../../components/Loading';

export const NonAuthGuard: FC = () => {
  const isLoading = useAppSelector(selectUserLoading);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchUser());
  }, []);

  const user = useAppSelector(selectUser);
  if (user !== null) {
    const redirect: To = {
      pathname: 'anime',
      search: new URLSearchParams({
        next: location.pathname,
      }).toString(),
    };
    return <Navigate to={redirect} replace />;
  }

  if (isLoading === true) {
    return <Loading />;
  }
  return <Outlet />;
};
