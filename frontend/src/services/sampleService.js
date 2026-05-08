import { apiClient } from './api.js';

export async function getSamples() {
  const response = await apiClient('/samples');
  return response.data;
}

export async function createSample(payload) {
  const response = await apiClient('/samples', {
    method: 'POST',
    body: JSON.stringify(payload),
  });

  return response.data;
}

export async function updateSample(sampleId, payload) {
  const response = await apiClient(`/samples/${sampleId}`, {
    method: 'PUT',
    body: JSON.stringify(payload),
  });

  return response.data;
}

export async function deleteSample(sampleId) {
  await apiClient(`/samples/${sampleId}`, {
    method: 'DELETE',
  });
}
