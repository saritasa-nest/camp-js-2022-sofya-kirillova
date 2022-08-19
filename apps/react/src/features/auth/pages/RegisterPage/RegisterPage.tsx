import { memo, FC, useEffect } from 'react';
import { useFormik } from 'formik';
import { Button, Grid, Typography, Link, Box, TextField } from '@mui/material';

import { Registration } from '@js-camp/core/models/auth';

import { register } from '@js-camp/react/store/auth/dispatchers';
import {
  selectErrorRegister,
  selectRegisteredRegister,
} from '@js-camp/react/store/auth/selectors';
import { useAppDispatch, useAppSelector } from '@js-camp/react/store/store';
import { useNavigate } from 'react-router-dom';

import { FieldError } from '@js-camp/core/models/fieldError';

import {
  initValues,
  loginFormSchema,
  RegistrationForm,
} from '../../components/RegisterForm/formSettings';

import styles from './RegisterPage.module.css';

/** Register page component. */
const RegisterPageComponent: FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const error = useAppSelector(selectErrorRegister) as FieldError;
  const isRegistered = useAppSelector(selectRegisteredRegister);

  const handleRegister = (values: RegistrationForm): void => {
    dispatch(register(values as unknown as Registration));
  };
  useEffect(() => {
    if (error?.data) {
      formik.setErrors(error.data);
    }

  }, [error]);
  useEffect(() => {
    if (isRegistered === true) {
      navigate('/anime');
    }
  }, [isRegistered]);
  const formik = useFormik({
    validationSchema: loginFormSchema,
    initialValues: initValues,
    onSubmit: handleRegister,
  });
  return (
    <div className={styles['register']}>
      <Grid container direction="column" gap={1}>
        <Typography align="left" variant="h4" component="h1">
          Register
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
              onChange={formik.handleChange}
              value={formik.values.email}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />
            <TextField
              required
              id="firstName"
              name="firstName"
              label="Enter your first name"
              variant="standard"
              onChange={formik.handleChange}
              value={formik.values.firstName}
              error={
                formik.touched.firstName && Boolean(formik.errors.firstName)
              }
              helperText={formik.touched.firstName && formik.errors.firstName}
            />
            <TextField
              required
              id="lastName"
              name="lastName"
              label="Enter your last name"
              variant="standard"
              onChange={formik.handleChange}
              value={formik.values.lastName}
              error={formik.touched.lastName && Boolean(formik.errors.lastName)}
              helperText={formik.touched.lastName && formik.errors.lastName}
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
            <TextField
              required
              id="confirmPassword"
              name="confirmPassword"
              label="Confirm your password"
              type="password"
              variant="standard"
              onChange={formik.handleChange}
              value={formik.values.confirmPassword}
              error={
                formik.touched.confirmPassword &&
                Boolean(formik.errors.confirmPassword)
              }
              helperText={
                formik.touched.confirmPassword && formik.errors.confirmPassword
              }
            />
            <Grid container justifyContent="space-around" alignItems="center">
              <Button variant="outlined" type="submit">
                Sign up
              </Button>
              <Link underline="hover" href="/login">
                Sign in
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Grid>
    </div>
  );
};

export const RegisterPage = memo(RegisterPageComponent);
