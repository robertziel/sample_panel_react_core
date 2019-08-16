import { defineMessages } from 'react-intl';

export const scope = 'app.components.Footer';

export default defineMessages({
  authorMessage: {
    id: `${scope}.author.message`,
    defaultMessage: `
      Made by {author}.
    `,
  },
});
