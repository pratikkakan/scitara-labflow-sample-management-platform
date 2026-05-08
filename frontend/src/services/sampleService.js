import { apiClient } from './api.js';

export async function getSamples() {
  const response = await apiClient('/samples');
  return response.data;
}
