import { assertNonNull, displayTheError } from '@js-camp/core/utils/functions';

import { authentication } from '../../requests/authorization';

const button = document.querySelector('.authorization__button');
assertNonNull(button);
const formElement = document.querySelector('.authorization__form');

button.addEventListener('click', request);

/** Sends the authentication request. */
function request(): void {
  if (!(formElement instanceof HTMLFormElement)) {
    throw new Error('not form');
  }

  const formData = new FormData(formElement);
  for (const input of formData.entries()) {
    if (input[1] === '') {
      const h5Element = document.querySelector('.authorization__error');
      assertNonNull(h5Element);
      displayTheError('Please fill in all fields', h5Element);
      return;
    }
  }
  authentication(formData);
}
