import { lazy } from 'react';
import { Navigate, RouteObject } from 'react-router-dom';
import { loginRoutes } from '../auth/routes';

const GenresPage = lazy(() => import('./pages/GenresPage').then(module => ({ default: module.GenresPage })));

export const genresRoutes: RouteObject[] = [
  {
    path: 'genres',
    element: <GenresPage />,
  },
  {
    path: '*',
    element: <Navigate to="genres" />,
  },
];
