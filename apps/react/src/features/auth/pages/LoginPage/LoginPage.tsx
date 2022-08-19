import { memo, FC, useEffect } from 'react';
import { useFormik } from 'formik';

import {
  Button,
  Grid,
  Typography,
  Link,
  Box,
  TextField,
  Alert,
} from '@mui/material';

import { Login } from '@js-camp/core/models/auth';
import { loginUser } from '@js-camp/react/store/auth/dispatchers';
import { selectAuthorizedLogin, selectErrorLogin } from '@js-camp/react/store/auth/selectors';
import { useAppDispatch, useAppSelector } from '@js-camp/react/store/store';

import { useNavigate } from 'react-router-dom';

import { LoginForm, loginFormSchema, initValues } from '../../components/LoginForm/formSettings';

import styles from './LoginPage.module.css';

/** Login page component. */
const LoginPageComponent: FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const error = useAppSelector(selectErrorLogin);
  const isAuthorized = useAppSelector(selectAuthorizedLogin);

  const handleUserLogin = (values: LoginForm): void => {
    dispatch(loginUser(values as Login));
  };

  useEffect(() => {
    if (isAuthorized === true) {
      navigate('/anime');
    }
  }, [isAuthorized]);

  const formik = useFormik({
    validationSchema: loginFormSchema,
    initialValues: initValues,
    onSubmit: handleUserLogin,
  });
  return (
    <div className={styles['login']}>
      <Grid container direction="column" gap={1}>
        <Typography align="left" variant="h4" component="h1">
          Login
        </Typography>
        <Box component="form" noValidate onSubmit={formik.handleSubmit}>
          <Grid container direction="column" gap={2}>
            <TextField
              required
              id="email"
              name="email"
              label="Enter your email"
              autoFocus
              variant="standard"
              autoComplete="true"
              onChange={formik.handleChange}
              value={formik.values.email}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />
            <TextField
              required
              id="password"
              name="password"
              label="Enter your password"
              type="password"
              variant="standard"
              onChange={formik.handleChange}
              value={formik.values.password}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
            />
            {error && <Alert variant="outlined" severity="error">{error?.detail}</Alert>}
            <Grid container justifyContent="space-around" alignItems="center">
              <Button variant="outlined" type="submit">
                Sign in
              </Button>
              <Link underline="hover" href="/register">
                Sign up
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Grid>
    </div>
  );
};

export const LoginPage = memo(LoginPageComponent);
