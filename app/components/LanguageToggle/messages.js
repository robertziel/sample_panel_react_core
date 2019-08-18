import { defineMessages } from 'react-intl';

export const scope = 'app.components.LocaleToggle';

export default defineMessages({
  en: {
    id: `${scope}.en`,
    defaultMessage: 'English',
  },
  pl: {
    id: `${scope}.pl`,
    defaultMessage: 'Polski',
  },
});
