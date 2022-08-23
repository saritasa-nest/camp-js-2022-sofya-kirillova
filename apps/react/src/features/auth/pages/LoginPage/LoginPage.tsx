import { memo, FC, useEffect } from 'react';
import {
  Field,
  Form,
  FormikProvider,
  useFormik,
} from 'formik';
import { Button, Grid, Typography, Link, Alert } from '@mui/material';
import { TextField } from 'formik-mui';
import { Login as LoginData } from '@js-camp/core/models/auth';
import { loginUser } from '@js-camp/react/store/auth/dispatchers';
import {
  selectsLoginSubmitted,
  selectErrorLogin,
} from '@js-camp/react/store/auth/selectors';
import { useAppDispatch, useAppSelector } from '@js-camp/react/store/store';
import { useNavigate } from 'react-router-dom';

import {
  loginFormSchema,
  initValues,
} from '../../components/LoginForm/formSettings';

import styles from './LoginPage.module.css';

/** Login page component. */
const LoginPageComponent: FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const error = useAppSelector(selectErrorLogin);
  const isAuthorized = useAppSelector(selectsLoginSubmitted);

  const handleUserLogin = async(values: LoginData): Promise<void> => {
    await dispatch(loginUser(values));
    formik.setSubmitting(false);
  };

  useEffect(() => {
    if (isAuthorized === true) {
      navigate('/anime');
    }
  }, [isAuthorized]);

  const formik = useFormik<LoginData>({
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
        <FormikProvider value={formik}>
          <Form>
            <Grid container direction="column" gap={2}>
              <Field
                name="email"
                type="email"
                label="Enter your email"
                component={TextField}
              />
              <Field
                name="password"
                type="password"
                label="Enter your password"
                component={TextField}
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
          </Form>
        </FormikProvider>
      </Grid>
    </div>
  );
};

export const LoginPage = memo(LoginPageComponent);
