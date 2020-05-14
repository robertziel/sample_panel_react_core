/*
 * ProfilePage Messages
 *
 * This contains all the text for the ProfilePage container.
 */
import { defineMessages } from 'react-intl';

export const scope = 'app.containers.ProfilePage';

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: 'Profile page',
  },
  formUsername: {
    id: `${scope}.form.username`,
    defaultMessage: 'Username',
  },
  formEmail: {
    id: `${scope}.form.email`,
    defaultMessage: 'E-mail',
  },
  formPassword: {
    id: `${scope}.form.password`,
    defaultMessage: 'Password',
  },
  formButton: {
    id: `${scope}.form.button`,
    defaultMessage: 'Update',
  },
  profileUpdateSucceededNotify: {
    id: `${scope}.form.profileUpdateSucceededNotify`,
    defaultMessage: 'Profile updated successfully',
  },
  profileUpdateFailedNotify: {
    id: `${scope}.form.profileUpdateFailedNotify`,
    defaultMessage: 'Your profile could not be updated',
  },
});
