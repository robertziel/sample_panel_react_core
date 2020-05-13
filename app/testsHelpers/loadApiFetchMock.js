/*
 * config: { method, path, requestBody, responseBody, status }
 *
 */

import fetchMock from 'fetch-mock';
import { fullUrl } from 'containers/BackendApiConnector/fetcher/apiFetch';

export default function loadApiFetchMock(config) {
  beforeAll(() => {
    fetchMock.mock(
      (url, opts) =>
        (!config.path || url === fullUrl(config.path, config.params)) &&
        (!config.requestBody ||
          opts.body === JSON.stringify(config.requestBody)) &&
        (!config.method || opts.method === config.method),
      {
        status: config.status,
        body: config.responseBody,
        throws: config.throws,
      },
    );
  });

  afterAll(() => {
    fetchMock.restore();
  });

  return fetchMock;
}
