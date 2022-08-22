import { FC } from 'react';
import { Navigate, RouteObject, useRoutes } from 'react-router-dom';

import { animeRoutes } from '../features/anime/routes';
import { loginRoutes } from '../features/auth/routes';

const routes: RouteObject[] = [
  {
    path: '*',
    element: <Navigate to="/anime" />,
  },
  ...loginRoutes,
  ...animeRoutes,
];

/** Root router component. */
export const RootRouter: FC = () => useRoutes(routes);
