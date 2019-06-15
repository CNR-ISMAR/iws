/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 */

import React from 'react';
import { FormattedMessage } from 'react-intl';
import messages from './messages';

export default function HomePage({auth}) {
  console.info("auth")
  console.info(auth)
  return (
    <h1>
      <FormattedMessage {...messages.header} />
    </h1>
  );
}
