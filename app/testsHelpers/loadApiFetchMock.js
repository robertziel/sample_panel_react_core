/*
 * config: { path, requestBody, responseBody, status }
 *
 */

import fetchMock from 'fetch-mock';
import { BACKEND_API_URL } from 'containers/BackendApiConnector/constants';

export default function loadApiFetchMock(config) {
  beforeAll(() => {
    fetchMock.post(
      (url, opts) =>
        url === `${BACKEND_API_URL}${config.path}` &&
        opts.body === JSON.stringify(config.requestBody),
      {
        status: config.status,
        body: config.responseBody,
      },
    );
  });

  afterAll(() => {
    fetchMock.restore();
  });

  return fetchMock;
}
