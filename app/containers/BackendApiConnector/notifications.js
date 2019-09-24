import { store } from 'react-notifications-component';

import { getIntl } from 'containers/LanguageProvider/IntlCatcher';
import defaultSettings from 'containers/NotificationsSystem/defaultSettings';

import messages from './messages';

export function connectionRefusedNotify(refetchMethod) {
  const notification = store.addNotification({
    ...defaultSettings,
    title: getIntl().formatMessage(messages.connectionRefusedNotifyTitle),
    message: getIntl().formatMessage(messages.connectionRefusedNotify),
    type: 'danger',
    dismiss: {
      duration: 20000,
      pauseOnHover: true,
      showIcon: true,
      onScreen: true,
    },
    onRemoval: refetchMethod,
  });

  return {
    remove: () => store.removeNotification(notification),
  };
}

export function unauthorizedNotify() {
  store.addNotification({
    ...defaultSettings,
    title: getIntl().formatMessage(messages.unauthorizedNotifyTitle),
    message: getIntl().formatMessage(messages.unauthorizedNotify),
    type: 'info',
  });
}
