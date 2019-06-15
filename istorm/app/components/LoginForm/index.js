/**
 *
 * LoginForm
 *
 */

import React from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';

import { FormattedMessage } from 'react-intl';
import messages from './messages';

function LoginForm(form) {
  return (
    <div>
      <FormattedMessage {...messages.header} />
    </div>
  );
}

LoginForm.propTypes = {};

export default LoginForm;
