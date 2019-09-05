import React from 'react';
import { FormattedMessage } from 'react-intl';
import { notificationSystem } from 'containers/NotificationsSystem';

import messages from './messages';

export function signedInNotify() {
  notificationSystem.current.addNotification({
    message: <FormattedMessage {...messages.signedInNotify} />,
    level: 'success',
  });
}
