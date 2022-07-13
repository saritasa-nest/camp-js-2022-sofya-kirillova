import { assertNonNull } from '@js-camp/core/utils/functions';

import { verifyToken } from '../requests/verifyToken';

/** Render the site header. */
async function renderHeader(): Promise<void> {
  const isTokenValid = await verifyToken();
  const header = document.querySelector('.header');
  assertNonNull(header);
  let template;
  if (isTokenValid === true) {
    template = document.querySelector('#authorized');
  } else {
    template = document.querySelector('#unauthorized');
  }
  if (!(template instanceof HTMLTemplateElement)) {
    throw new Error('not template');
  }
  header.append(template.content);
}
renderHeader();
