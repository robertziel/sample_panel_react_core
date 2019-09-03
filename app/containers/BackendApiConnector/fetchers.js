/*
 * BackendApiConnector's fetchers provide functions used to connect to API backend
 * All settings like BACKEND_API_URL, authenticationToken, error response handling etc.
 * are handled under the hood here so that anywhere else in the project can be
 * used one of simple functions requiring path, params, and afterSuccess callback.
 *
 */

import { BACKEND_API_URL } from './constants';

function apiFetch(method, path, params, afterSuccess) {
  fetch(`${BACKEND_API_URL}${path}`, {
    method,
    body: JSON.stringify(params),
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  })
    .then(result => result.json())
    .then(
      result => {
        // TO DO: Internet connection error (set noInternet: false)
        // TO DO: Wrong AccessToken response - render sign in form
        afterSuccess(result);
      },
      // (error) => {
      //   // TO DO: Internet connection error (set noInternet: true)
      //   // TO DO: Fetch failed 'Error while connecting to server'
      // },
    );
}

export function apiGet(path, params, afterSuccess) {
  apiFetch('GET', path, params, afterSuccess);
}

export function apiPost(path, params, afterSuccess) {
  apiFetch('POST', path, params, afterSuccess);
}
