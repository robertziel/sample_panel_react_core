import { connectionRefusedNotify } from './notifications';

let notification;

const fetchesQueue = [];

function reset() {
  notification && notification.remove(); // eslint-disable-line no-unused-expressions
  notification = undefined;
}

function retryFetches() {
  reset();

  while (fetchesQueue.length > 0) {
    fetchesQueue.shift().refetchMethod();
  }
}

export function reportConnectionRefused(refetchMethod) {
  refetchMethod && fetchesQueue.push({ refetchMethod }); // eslint-disable-line no-unused-expressions
  if (!notification) {
    notification = connectionRefusedNotify(retryFetches);
  }
}

export function reportConnectionSucceeded() {
  retryFetches();
}
