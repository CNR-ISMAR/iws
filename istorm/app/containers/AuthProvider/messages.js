/*
 * Auth Messages
 *
 * This contains all the text for the Auth container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.containers.Auth';

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: 'This is the Auth container!',
  },
});
