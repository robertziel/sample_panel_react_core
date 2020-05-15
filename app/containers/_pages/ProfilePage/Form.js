import React, { useState } from 'react';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';

import {
  Divider,
  Grid,
  Note,
  SubmitButton,
  TextField,
} from 'components/_ui-elements';

import useApiFetcher from 'containers/BackendApiConnector/fetcher';

import messages from './messages';
import {
  profileUpdateFailedNotify,
  profileUpdateSucceededNotify,
} from './notifications';

function Form({ intl, user }) {
  const fetcher = useApiFetcher();

  // Form state
  const [errorMessage, setErrorMessage] = useState(null);
  const [username, setUsername] = useState(user.username);
  const [email, setEmail] = useState(user.email);
  const [password, setPassword] = useState(null);
  const [passwordConfirmation, setPasswordConfirmation] = useState(null);

  const onSubmit = (event) => {
    event.preventDefault();

    fetcher.post({
      disableRetry: true,
      signIn: true,
      path: '/profile',
      body: {
        email,
        password,
        password_confirmation: passwordConfirmation,
        username,
      },
      afterSuccess: (result) => {
        setErrorMessage(result.error_message);

        if (result.profile) {
          profileUpdateSucceededNotify();
        } else {
          profileUpdateFailedNotify();
        }
      },
    });
  };

  return (
    <form onSubmit={onSubmit}>
      <Grid>
        <Note error message={errorMessage} />
      </Grid>
      <Grid>
        <TextField
          defaultValue={username}
          label={intl.formatMessage(messages.formUsername)}
          type="text"
          name="username"
          onChange={(event) => setUsername(event.target.value)}
          variant="outlined"
        />
      </Grid>
      <Grid>
        <TextField
          defaultValue={email}
          label={intl.formatMessage(messages.formEmail)}
          type="email"
          name="email"
          onChange={(event) => setEmail(event.target.value)}
          variant="outlined"
        />
      </Grid>
      <br />
      <Divider />
      <br />
      <Grid>
        <TextField
          label={intl.formatMessage(messages.formPassword)}
          type="password"
          name="password"
          onChange={(event) => setPassword(event.target.value)}
          variant="outlined"
          helperText={intl.formatMessage(messages.formPasswordLeaveBlank)}
        />
      </Grid>
      <Grid>
        <TextField
          label={intl.formatMessage(messages.formPasswordConfirmation)}
          type="password"
          name="password_confirmation"
          onChange={(event) => setPasswordConfirmation(event.target.value)}
          variant="outlined"
        />
      </Grid>
      <Grid>
        <SubmitButton processing={fetcher.processing}>
          <FormattedMessage {...messages.formButton} />
        </SubmitButton>
      </Grid>
    </form>
  );
}

Form.propTypes = {
  intl: intlShape.isRequired,
  user: PropTypes.object.isRequired,
};

export default injectIntl(Form);
