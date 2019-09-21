import React from 'react';
import { FormattedMessage } from 'react-intl';
import { notificationSystem } from 'containers/NotificationsSystem';

import messages from './messages';

export function internetConnectionBackNotify() {
  notificationSystem.current.addNotification({
    title: <FormattedMessage {...messages.internetConnectionBackNotifyTitle} />,
    message: <FormattedMessage {...messages.internetConnectionBackNotify} />,
    level: 'success',
  });
}

export function noInternetConnectionNotify() {
  const notification = notificationSystem.current.addNotification({
    dismissible: 'none',
    autoDismiss: 0,
    title: <FormattedMessage {...messages.noInternetConnectionNotifyTitle} />,
    message: <FormattedMessage {...messages.noInternetConnectionNotify} />,
    level: 'error',
  });

  return {
    remove: () => notificationSystem.current.removeNotification(notification),
  };
}
