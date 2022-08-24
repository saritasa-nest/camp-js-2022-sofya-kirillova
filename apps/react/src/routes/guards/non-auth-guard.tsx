import { selectUser } from '@js-camp/react/store/auth/selectors';
import { useAppSelector } from '@js-camp/react/store/store';
import { FC } from 'react';
import { Navigate, Outlet, useSearchParams } from 'react-router-dom';

export const NonAuthGuard: FC = () => {
  const user = useAppSelector(selectUser);
  const [search] = useSearchParams();
  if (user !== null) {
    const redirect = search.get('anime') ?? '';
    return <Navigate to={redirect} replace />;
  }
  return <Outlet />;
};
