import { defineMessages } from 'react-intl';

export const scope = 'app.containers.BackendApiConnector';

const messages = defineMessages({
  errorConnectionRefused: {
    id: `${scope}.fetchers.notifications.errorConnectionRefused`,
    defaultMessage: `
      Cannot connect to the server.
    `,
  },
});

export default messages;
