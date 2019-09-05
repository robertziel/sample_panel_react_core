import { defineMessages } from 'react-intl';

export const scope = 'app.containers.BackendApiConnector';

const messages = defineMessages({
  connectionRefusedNotify: {
    id: `${scope}.fetchers.notifications.connectionRefusedNotify`,
    defaultMessage: `
      Cannot connect to the server.
    `,
  },
});

export default messages;
