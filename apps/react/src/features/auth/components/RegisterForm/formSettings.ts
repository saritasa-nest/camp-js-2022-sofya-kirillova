import * as Yup from 'yup';
import { Registration } from '@js-camp/core/models/auth';

export const initValues: Registration = {
  email: '',
  firstName: '',
  lastName: '',
  password: '',
  confirmPassword: '',
};

export const loginFormSchema: Yup.SchemaOf<Registration> = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email')
    .required('Email is a required field'),
  lastName: Yup.string().required('Last name is a required field'),
  firstName: Yup.string().required('First name is a required field'),
  password: Yup.string()
    .min(8, 'Too Short!')
    .required('Password is a required field'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords don\'t match')
    .required('First name is a required field'),
});
