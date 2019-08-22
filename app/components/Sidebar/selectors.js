import { createSelector } from 'reselect';
import { initialState } from './reducer';

const sidebarState = state => state.sidebar || initialState;

const sidebarSelector = () =>
  createSelector(
    sidebarState,
    state => state.collapse,
  );

export { sidebarSelector };
