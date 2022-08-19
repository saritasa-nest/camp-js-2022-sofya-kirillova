
import { Registration } from '@js-camp/core/models/auth';
import * as Yup from 'yup';

/** Form data for registration. */
export interface RegistrationForm extends Omit<Registration, '[immerable]'> {

  /** Confirm password field. */
  readonly confirmPassword: string;
}
export const loginFormSchema: Yup.SchemaOf<RegistrationForm> = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email')
    .required('Email is a required field'),
  lastName: Yup.string().required('Last name is a required field'),
  firstName: Yup.string().required('First name is a required field'),
  password: Yup.string()
    // .min(8, 'Too Short!')
    .required('Password is a required field'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords don\'t match')
    .required('First name is a required field'),
});
export const initValues: RegistrationForm = {
  email: '',
  firstName: '',
  lastName: '',
  password: '',
  confirmPassword: '',
};
