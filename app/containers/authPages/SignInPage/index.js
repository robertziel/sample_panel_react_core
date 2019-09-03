import React from 'react';
import { FormattedMessage } from 'react-intl';

import Form from './Form';
import messages from './messages';

function SignInPage() {
  return (
    <div className="sign-in">
      <h2 className="card-heading">
        <FormattedMessage {...messages.title} />
      </h2>
      <Form />
    </div>
  );
}

export default SignInPage;
