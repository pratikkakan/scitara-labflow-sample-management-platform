import { expect, test } from '../fixtures/test.fixture';
import { apiRoutes } from '../utils/api-routes';

test('samples endpoint returns seed inventory', async ({ request }) => {
  const response = await request.get(apiRoutes.samples);

  expect(response.ok()).toBeTruthy();

  const payload = await response.json();

  expect(Array.isArray(payload.data)).toBeTruthy();
  expect(payload.data.length).toBeGreaterThanOrEqual(3);
});

test('samples endpoint accepts new records', async ({ request, samplePayload }) => {
  const createResponse = await request.post(apiRoutes.samples, {
    data: samplePayload,
  });

  expect(createResponse.status()).toBe(201);

  const createdPayload = await createResponse.json();

  expect(createdPayload.data.name).toBe(samplePayload.name);
  expect(createdPayload.data.owner).toBe(samplePayload.owner);
});
