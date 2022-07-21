import { assertNonNull } from '@js-camp/core/utils/assertNonNull';
import { displayError } from '@js-camp/core/utils/displayError';
import { checkFieldsEmptiness } from '@js-camp/core/utils/checkFieldsEmptiness';

import { FieldError } from '@js-camp/core/models/fieldError';

import { login } from '../../requests/authorization';

const button = document.querySelector('.authorization__button');
assertNonNull(button);
const formContainer = document.querySelector<HTMLFormElement>('.authorization__form');

button.addEventListener('click', requestAuthentication);

/** Sends the authentication request. */
async function requestAuthentication(): Promise<void> {
  assertNonNull(formContainer);
  const formData = new FormData(formContainer);
  const errorContainer = document.querySelector('.authorization__error-description');
  const isFormFilled = checkFieldsEmptiness(formData);
  assertNonNull(errorContainer);

  if (isFormFilled) {
    const errorInformation = await login(formData);
    if (errorInformation instanceof FieldError) {
      displayError(errorInformation.detail, errorContainer);
    } else {
      window.location.replace('/');
    }
  } else {
    displayError('Please fill in all fields', errorContainer);
  }
}
