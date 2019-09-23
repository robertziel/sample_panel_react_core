import React from 'react';
import { FormattedMessage } from 'react-intl';
import { notificationSystem } from 'containers/NotificationsSystem';

import messages from './messages';

export function connectionRefusedNotify(refetchMethod) {
  const notification = notificationSystem.current.addNotification({
    autoDismiss: 0,
    dismissible: 'none',
    title: <FormattedMessage {...messages.connectionRefusedNotifyTitle} />,
    message: <FormattedMessage {...messages.connectionRefusedNotify} />,
    level: 'error',
    action: {
      label: <FormattedMessage {...messages.connectionRefusedNotifyTryAgain} />,
      callback: refetchMethod,
    },
  });

  return {
    remove: () => notificationSystem.current.removeNotification(notification),
  };
}

export function unauthorizedNotify() {
  notificationSystem.current.addNotification({
    title: <FormattedMessage {...messages.unauthorizedNotifyTitle} />,
    message: <FormattedMessage {...messages.unauthorizedNotify} />,
    level: 'info',
  });
}
