import { expect, test } from '../fixtures/test.fixture';
import { apiRoutes } from '../utils/api-routes';

test('health endpoint exposes service metadata', async ({ request }) => {
  const response = await request.get(apiRoutes.health);

  expect(response.ok()).toBeTruthy();

  const payload = await response.json();

  expect(payload.status).toBe('ok');
  expect(payload.service).toBe('sample-management-api');
  expect(payload.timestamp).toBeTruthy();
});
