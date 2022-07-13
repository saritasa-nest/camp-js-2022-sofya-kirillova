import { assertNonNull, displayTheError } from '@js-camp/core/utils/functions';

import { authentication } from '../../requests/authorization';
import { fillFields } from '../../scripts/fillFields';

const button = document.querySelector('.authorization__button');
assertNonNull(button);
const formContainer = document.querySelector('.authorization__form');

button.addEventListener('click', requestAuthentication);

/** Sends the authentication request. */
function requestAuthentication(): void {
  if (!(formContainer instanceof HTMLFormElement)) {
    throw new Error('not form');
  }

  const formData = new FormData(formContainer);
  const errorContainer = document.querySelector('.authorization__error');
  const isFillFields = fillFields(formData);
  assertNonNull(errorContainer);
  if (isFillFields == true) {
    authentication(formData);
  } else {
    displayTheError('Please fill in all fields', errorContainer);
  }
}
