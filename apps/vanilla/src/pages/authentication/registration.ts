
import { assertNonNull } from '@js-camp/core/utils/assertNonNull';
import { displayError } from '@js-camp/core/utils/displayError';
import { checkFieldsEmptiness } from '@js-camp/core/utils/checkFieldsEmptiness';

import { FieldError } from '@js-camp/core/models/fieldError';

import { register } from '../../requests/registration';
import { AVATAR_USER } from '../../scripts/constants';

const button = document.querySelector('.registration__button');
assertNonNull(button);
button.addEventListener('click', checkFields);

/** Check the fields for correctness. */
export function checkFields(): void {

  const formContainer = document.querySelector<HTMLFormElement>('.registration__form');
  assertNonNull(formContainer);
  const formData = new FormData(formContainer);
  const errorContainer = document.querySelector('.registration__error-description');
  assertNonNull(errorContainer);
  const isFillFields = checkFieldsEmptiness(formData);
  if (isFillFields === false) {
    displayError('Please fill in all fields', errorContainer);
    return;
  }

  const password = formData.get('password');
  const repeatPassword = formData.get('repeat-password');
  if (password !== repeatPassword) {
    displayError('Passwords mismatch', errorContainer);
    return;
  }
  requestRegistration(formData);
}

/**
 * Sends the registration request.
 * @param formData Form field data.
 */
async function requestRegistration(formData: FormData): Promise<void> {
  const errorContainer = document.querySelector('.registration__error-description');
  assertNonNull(errorContainer);
  formData.append('avatar', AVATAR_USER);
  formData.delete('repeat-password');

  const errorInformation = await register(formData);
  if (errorInformation instanceof FieldError) {
    displayError(Object.values(errorInformation.data)[0][0], errorContainer);
  }
}
