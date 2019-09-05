import React from 'react';
import { FormattedMessage } from 'react-intl';
import { notificationSystem } from 'containers/NotificationsSystem';

import messages from './messages';

export function signedOutNotify() {
  notificationSystem.current.addNotification({
    message: <FormattedMessage {...messages.signedOutNotify} />,
    level: 'success',
  });
}
