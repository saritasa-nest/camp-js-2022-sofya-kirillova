import { assertNonNull } from '@js-camp/core/utils/assertNonNull';

import { verifyToken } from '../requests/verifyToken';

/** Render the site header. */
async function renderHeader(): Promise<void> {
  const isTokenValid = await verifyToken();
  const header = document.querySelector('.header');
  assertNonNull(header);
  let template;
  if (isTokenValid === true) {
    template = document.querySelector<HTMLTemplateElement>('#authorized');
  } else {
    template = document.querySelector<HTMLTemplateElement>('#unauthorized');
  }

  assertNonNull(template);
  header.append(template.content);
}
renderHeader();
