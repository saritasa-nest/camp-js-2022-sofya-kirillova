import { memo, FC, useEffect } from 'react';
import { Field, Form, FormikProvider, useFormik } from 'formik';
import { Button, Grid, Typography, Link } from '@mui/material';
import { TextField } from 'formik-mui';
import { Registration as RegistrationData } from '@js-camp/core/models/auth';
import { register } from '@js-camp/react/store/auth/dispatchers';
import {
  selectErrorRegister,
  selectsRegisterSubmitted,
} from '@js-camp/react/store/auth/selectors';
import { useAppDispatch, useAppSelector } from '@js-camp/react/store/store';
import { useNavigate } from 'react-router-dom';
import { ErrorRegistration } from '@js-camp/core/models/errorRegistration';

import {
  initValues,
  loginFormSchema,
} from '../../components/RegisterForm/formSettings';

import styles from './RegisterPage.module.css';

/** Register page component. */
const RegisterPageComponent: FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const errors = useAppSelector(selectErrorRegister)?.data as ErrorRegistration;
  const isRegistered = useAppSelector(selectsRegisterSubmitted);

  const handleRegister = async(values: RegistrationData): Promise<void> => {
    await dispatch(register(values));
    formik.setSubmitting(false);
  };

  useEffect(() => {
    if (errors) {
      const errorFiltered = Object.entries(errors).reduce(
        (body, [key, value]) => (value ? { ...body, [key]: value } : body),
        {},
      );
      formik.setErrors(errorFiltered);
    }
  }, [errors]);

  useEffect(() => {
    if (isRegistered === true) {
      navigate('/anime');
    }
  }, [isRegistered]);

  const formik = useFormik<RegistrationData>({
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
                name="firstName"
                type="text"
                label="Enter your first name"
                component={TextField}
              />
              <Field
                name="lastName"
                type="text"
                label="Enter your last name"
                component={TextField}
              />
              <Field
                name="password"
                type="password"
                label="Enter your password"
                component={TextField}
              />
              <Field
                name="confirmPassword"
                type="password"
                label="Confirm your password"
                component={TextField}
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
          </Form>
        </FormikProvider>
      </Grid>
    </div>
  );
};

export const RegisterPage = memo(RegisterPageComponent);
