import { fetchUser } from '@js-camp/react/store/auth/dispatchers';
import { selectUser, selectUserLoading } from '@js-camp/react/store/auth/selectors';
import { useAppDispatch, useAppSelector } from '@js-camp/react/store/store';
import { FC, useEffect } from 'react';
import { Navigate, Outlet, useSearchParams } from 'react-router-dom';

import { Loading } from '../../components/Loading';

export const NonAuthGuard: FC = () => {
  const isLoading = useAppSelector(selectUserLoading);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchUser());
  }, []);

  const user = useAppSelector(selectUser);
  const [search] = useSearchParams();
  if (isLoading === true) {
    return <Loading />;
  }
  if (user !== null) {
    const redirect = search.get('anime') ?? '';
    return <Navigate to={redirect} replace />;
  }

  return <Outlet />;
};
