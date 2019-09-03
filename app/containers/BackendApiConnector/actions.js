import { SET_AUTHENTICATION_TOKEN } from './constants';

export function setAuthenticationToken(token) {
  return {
    type: SET_AUTHENTICATION_TOKEN,
    locale: token,
  };
}
