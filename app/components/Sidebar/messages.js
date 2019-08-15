import { defineMessages } from 'react-intl';

export const scope = 'app.components.Sidebar';

export default defineMessages({
  dashboradPage: {
    id: `${scope}.links.dashboardPage`,
    defaultMessage: 'Dashboard',
  },
  notFoundPage: {
    id: `${scope}.links.notFoundPage`,
    defaultMessage: 'Not found page',
  },
  profilePage: {
    id: `${scope}.links.profilePage`,
    defaultMessage: 'Profile',
  },
});
