import { defineMessages } from 'react-intl';

export const scope = 'app.components.Sidebar';

export default defineMessages({
  dashboradPage: {
    id: `${scope}.links.dashboardPage`,
    defaultMessage: 'Dashboard',
  },
  multipleChoice: {
    id: `${scope}.links.multipleChoice`,
    defaultMessage: 'Multiple choice',
  },
  notFoundPage: {
    id: `${scope}.links.notFoundPage`,
    defaultMessage: 'Not found page',
  },
  onePage: {
    id: `${scope}.links.onePage`,
    defaultMessage: 'One page',
  },
  twoPage: {
    id: `${scope}.links.twoPage`,
    defaultMessage: 'Two page',
  },
  profilePage: {
    id: `${scope}.links.profilePage`,
    defaultMessage: 'Profile',
  },
});
