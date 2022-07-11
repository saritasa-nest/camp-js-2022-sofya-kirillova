import { assertNonNull, displayTheError } from '@js-camp/core/utils/functions';

import { register } from '../requests/registration';

/** Check the fields for correctness. */
export function checkFields(): void {

  const formElement = document.querySelector('.registration__form');
  if (!(formElement instanceof HTMLFormElement)) {
    throw new Error('not form');
  }

  const formData = new FormData(formElement);
  const h5Element = document.querySelector('.registration__error');
  assertNonNull(h5Element);
  for (const input of formData.entries()) {
    if (input[1] === '') {
      displayTheError('Please fill in all fields', h5Element);
      return;
    }
  }

  const password = formData.get('password');
  const repeatPassword = formData.get('repeat-password');
  if (password !== repeatPassword) {
    displayTheError('Passwords mismatch', h5Element);
    return;
  }
  request(formData);
}

/**
 * Sends the registration request.
 * @param formData Form field data.
 */
function request(formData: FormData): void {
  const avatar = 'https://s3.us-west-2.amazonaws.com/camp-js-backend-files-dev/user_avatars' +
  '%2Ff33c09a7-a15e-4b7c-b47f-650bfe19faff%2Fprofile.jpg';

  formData.append('avatar', avatar);
  formData.delete('repeat-password');

  register(formData);
}
