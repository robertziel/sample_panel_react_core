import React from 'react';
import { FormattedMessage } from 'react-intl';

import { Divider, Grid, H1 } from 'components/_ui-elements';

import AvatarForm from './AvatarForm';
import ProfileForm from './ProfileForm';
import messages from './messages';

export default function ProfilePage() {
  return (
    <Grid container>
      <Grid item xs={12}>
        <H1>
          <FormattedMessage {...messages.header} />
        </H1>
        <Divider />
      </Grid>
      <Grid item xs={12} md={5}>
        <AvatarForm />
      </Grid>
      <Grid item xs={12} md={7}>
        <ProfileForm />
      </Grid>
    </Grid>
  );
}
