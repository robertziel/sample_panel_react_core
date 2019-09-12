import React from 'react';
import { FormattedMessage } from 'react-intl';

import { Container, Divider, H1, Paper } from 'components/_ui-elements';
import Footer from 'components/Footer/index';

import Form from './Form';
import messages from './messages';

function SignInPage() {
  return (
    <div>
      <Container maxWidth="sm">
        <div>
          <Paper topLine>
            <H1>
              <FormattedMessage {...messages.title} />
            </H1>
            <Divider />
            <Form />
          </Paper>
        </div>
      </Container>
      <Footer />
    </div>
  );
}

export default SignInPage;
