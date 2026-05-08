import { sampleStore } from '../data/sample.store.js';

export const sampleService = {
  createSample(payload) {
    const sample = {
      id: payload.id ?? `SMP-${Date.now()}`,
      name: payload.name,
      type: payload.type,
      owner: payload.owner,
      status: payload.status,
      priority: payload.priority ?? 'Medium',
      location: payload.location ?? 'Receiving',
      collectedAt: payload.collectedAt ?? new Date().toISOString().slice(0, 10),
    };

    return sampleStore.create(sample);
  },
  getAllSamples() {
    return sampleStore.findAll();
  },
  getSampleById(sampleId) {
    return sampleStore.findById(sampleId);
  },
};
