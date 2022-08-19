import { Login } from '@js-camp/core/models/auth';

import * as Yup from 'yup';
export const initValues: LoginForm = { email: '', password: '' };

export const loginFormSchema: Yup.SchemaOf<LoginForm> = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email')
    .required('Email is a required field'),
  password: Yup.string()
    .min(8, 'Too Short!')
    .required('Password is a required field'),
});

export type LoginForm = Omit<Login, '[immerable]'>;
