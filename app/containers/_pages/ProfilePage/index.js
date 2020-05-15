/*
 * ProfilePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 */

import React, { useEffect, useState } from 'react';
import { FormattedMessage } from 'react-intl';

import { Divider, Grid, H1, Paper } from 'components/_ui-elements';
import useApiFetcher from 'containers/BackendApiConnector/fetcher';
import FetchedContent from 'containers/FetchedContent';

import Form from './Form';

import messages from './messages';

export default function ProfilePage() {
  const fetcher = useApiFetcher();

  const [user, setUser] = useState();

  const fetchData = () => {
    fetcher.get({
      path: '/profile',
      afterSuccess: (result) => setUser(result.profile),
    });
  };

  useEffect(() => fetchData(), []);

  return (
    <Grid container>
      <Grid item xs={12}>
        <H1>
          <FormattedMessage {...messages.header} />
        </H1>
        <Divider />
      </Grid>
      <FetchedContent processing={user === undefined || fetcher.processing}>
        <Grid item xs={12} md={12}>
          <Paper>
            <Form user={user} />
          </Paper>
        </Grid>
      </FetchedContent>
    </Grid>
  );
}
