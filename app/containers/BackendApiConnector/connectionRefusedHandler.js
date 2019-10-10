import { connectionRefusedNotify } from './notifications';

let notification;

const fetchesQueue = [];

function reset() {
  notification && notification.remove(); // eslint-disable-line no-unused-expressions
  notification = undefined;
}

function retryFetches() {
  reset();

  let shiftedFetch;

  while (fetchesQueue.length > 0) {
    shiftedFetch = fetchesQueue.shift();

    if (shiftedFetchHasMountedComponent(shiftedFetch)) {
      shiftedFetch.refetchMethod();
    }
  }
}

export function reportConnectionRefused(component, refetchMethod) {
  refetchMethod && fetchesQueue.push({ component, refetchMethod }); // eslint-disable-line no-unused-expressions

  if (!notification) {
    notification = connectionRefusedNotify(retryFetches);
  }
}

export function reportConnectionSucceeded() {
  retryFetches();
}

function shiftedFetchHasMountedComponent(shiftedFetch) {
  return shiftedFetch.component.updater.isMounted(shiftedFetch.component);
}
