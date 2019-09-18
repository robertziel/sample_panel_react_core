import React from 'react';
import { FormattedMessage } from 'react-intl';
import { notificationSystem } from 'containers/NotificationsSystem';

import messages from './messages';

export function connectionRefusedNotify() {
  notificationSystem.current.addNotification({
    autoDismiss: 0,
    message: <FormattedMessage {...messages.connectionRefusedNotify} />,
    level: 'error',
  });
}

export function unauthorizedNotify() {
  notificationSystem.current.addNotification({
    title: <FormattedMessage {...messages.unauthorizedNotifyTitle} />,
    message: <FormattedMessage {...messages.unauthorizedNotify} />,
    level: 'info',
  });
}
