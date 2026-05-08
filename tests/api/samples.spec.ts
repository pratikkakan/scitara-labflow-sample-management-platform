import { expect, test } from '../fixtures/test.fixture';
import { apiRoutes } from '../utils/api-routes';

test('samples endpoint returns seed inventory', async ({ request }) => {
  const response = await request.get(apiRoutes.samples);

  expect(response.ok()).toBeTruthy();

  const payload = await response.json();

  expect(Array.isArray(payload.data)).toBeTruthy();
  expect(payload.data.length).toBeGreaterThanOrEqual(3);
});

test('samples endpoint supports create, read, update, and delete', async ({
  request,
  samplePayload,
}) => {
  const createResponse = await request.post(apiRoutes.samples, {
    data: samplePayload,
  });

  expect(createResponse.status()).toBe(201);

  const createdPayload = await createResponse.json();
  const sampleId = createdPayload.data.id;

  expect(createdPayload.data.sampleName).toBe(samplePayload.sampleName);
  expect(createdPayload.data.scientist).toBe(samplePayload.scientist);
  expect(createdPayload.data.status).toBe('Pending');
  expect(sampleId).toBeTruthy();

  const getResponse = await request.get(`${apiRoutes.samples}/${sampleId}`);
  expect(getResponse.status()).toBe(200);

  const updateResponse = await request.put(`${apiRoutes.samples}/${sampleId}`, {
    data: {
      ...samplePayload,
      status: 'Processing',
    },
  });

  expect(updateResponse.status()).toBe(200);

  const updatedPayload = await updateResponse.json();
  expect(updatedPayload.data.status).toBe('Processing');

  const deleteResponse = await request.delete(`${apiRoutes.samples}/${sampleId}`);
  expect(deleteResponse.status()).toBe(204);

  const missingResponse = await request.get(`${apiRoutes.samples}/${sampleId}`);
  expect(missingResponse.status()).toBe(404);
});

test('samples endpoint rejects invalid payloads with meaningful errors', async ({
  request,
}) => {
  const response = await request.post(apiRoutes.samples, {
    data: {
      sampleName: '',
      scientist: '',
      status: 'Archived',
    },
  });

  expect(response.status()).toBe(400);

  const payload = await response.json();

  expect(payload.error.message).toBe('Validation failed for sample request.');
  expect(payload.error.details).toEqual(
    expect.arrayContaining([
      expect.objectContaining({ field: 'sampleName' }),
      expect.objectContaining({ field: 'scientist' }),
      expect.objectContaining({ field: 'status' }),
    ]),
  );
});
