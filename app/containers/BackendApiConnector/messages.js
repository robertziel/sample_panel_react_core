import { defineMessages } from 'react-intl';

export const scope = 'app.containers.BackendApiConnector';

const messages = defineMessages({
  connectionRefusedNotify: {
    id: `${scope}.fetchers.notifications.connectionRefusedNotify`,
    defaultMessage: `
      Cannot connect to the server.
    `,
  },
  unauthorizedNotify: {
    id: `${scope}.fetchers.notifications.unauthorizedNotify`,
    defaultMessage: `
      Please sign in to continue.
    `,
  },
});

export default messages;
