import React from 'react';

import NotificationSystem from 'react-notification-system';

export const notificationSystem = React.createRef();

export function NotificationsSystem() {
  return <NotificationSystem ref={notificationSystem} />;
}

export default NotificationsSystem;
