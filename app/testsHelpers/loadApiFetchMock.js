/*
 * config: { method, path, requestBody, responseBody, status }
 *
 */

import fetchMock from 'fetch-mock';
import { BACKEND_API_URL } from 'containers/BackendApiConnector/constants';

export default function loadApiFetchMock(config) {
  beforeAll(() => {
    fetchMock.mock(
      (url, opts) =>
        url === `${BACKEND_API_URL}${config.path}` &&
        opts.body === JSON.stringify(config.requestBody) &&
        opts.method === config.method,
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
