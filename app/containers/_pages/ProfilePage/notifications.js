import { store } from 'react-notifications-component';

import { getIntl } from 'containers/LanguageProvider/IntlCatcher';
import defaultSettings from 'containers/NotificationsSystem/defaultSettings';

import messages from './messages';

export function profileUpdateSucceededNotify() {
  store.addNotification({
    ...defaultSettings,
    message: getIntl().formatMessage(messages.profileUpdateSucceededNotify),
    type: 'success',
  });
}

export function profileUpdateFailedNotify() {
  store.addNotification({
    ...defaultSettings,
    message: getIntl().formatMessage(messages.profileUpdateFailedNotify),
    type: 'danger',
  });
}
