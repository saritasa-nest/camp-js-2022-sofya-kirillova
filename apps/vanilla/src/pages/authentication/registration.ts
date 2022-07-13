import { assertNonNull, displayTheError } from '@js-camp/core/utils/functions';
import { register } from '../../requests/registration';
import { fillFields } from '../../scripts/fillFields';

const button = document.querySelector('.registration__button');
assertNonNull(button);
button.addEventListener('click', checkFields);

/** Check the fields for correctness. */
export function checkFields(): void {

  const formContainer = document.querySelector('.registration__form');
  if (!(formContainer instanceof HTMLFormElement)) {
    throw new Error('not form');
  }

  const formData = new FormData(formContainer);
  const errorContainer = document.querySelector('.registration__error');
  assertNonNull(errorContainer);
  const isFillFields = fillFields(formData);
  if (isFillFields == false) {
    displayTheError('Please fill in all fields', errorContainer);
    return
  }

  const password = formData.get('password');
  const repeatPassword = formData.get('repeat-password');
  if (password !== repeatPassword) {
    displayTheError('Passwords mismatch', errorContainer);
    return;
  }
  requestRegistration(formData);
}

/**
 * Sends the registration request.
 * @param formData Form field data.
 */
function requestRegistration(formData: FormData): void {
  const avatarUser = 'https://s3.us-west-2.amazonaws.com/camp-js-backend-files-dev/user_avatars' +
  '%2Ff33c09a7-a15e-4b7c-b47f-650bfe19faff%2Fprofile.jpg';

  formData.append('avatar', avatarUser);
  formData.delete('repeat-password');

  register(formData);
}

