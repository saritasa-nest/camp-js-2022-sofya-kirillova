import { assertNonNull } from '@js-camp/core/utils/functions';

import { checkFields } from '../../scripts/registration';

const button = document.querySelector('.registration__button');
assertNonNull(button);
button.addEventListener('click', checkFields);
