import { lazy } from 'react';
import { Navigate, RouteObject } from 'react-router-dom';

import { NonAuthGuard } from '../../routes/guards/non-auth-guard';

const LoginPage = lazy(() => import('./pages/LoginPage').then(module => ({ default: module.LoginPage })));
const RegisterPage = lazy(() => import('./pages/RegisterPage').then(module => ({ default: module.RegisterPage })));

export const loginRoutes: RouteObject[] = [
  {
    element: <NonAuthGuard />,
    children: [
      {
        path: 'login',
        element: <LoginPage />,
      },
      {
        path: 'register',
        element: <RegisterPage />,
      },
      {
        path: '*',
        element: <Navigate to="login" />,
      },
    ],
  },
];
