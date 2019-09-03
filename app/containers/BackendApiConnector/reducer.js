import produce from 'immer';

import { SET_AUTHENTICATION_TOKEN } from './constants';

export const initialState = {
  authenticationToken: null,
  currentUser: null,
};

/* eslint-disable default-case, no-param-reassign */
const backendApiConnectorReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case SET_AUTHENTICATION_TOKEN:
        draft.authenticationToken = action.locale;
        break;
    }
  });

export default backendApiConnectorReducer;
