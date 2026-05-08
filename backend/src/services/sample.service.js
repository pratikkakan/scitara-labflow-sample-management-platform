import { randomUUID } from 'node:crypto';

import { sampleStore } from '../data/sample.store.js';
import { createHttpError } from '../utils/create-http-error.js';

function generateSampleId() {
  return `SMP-${randomUUID().slice(0, 8).toUpperCase()}`;
}

function buildSampleRecord(payload, sampleId) {
  return {
    id: sampleId,
    sampleName: payload.sampleName.trim(),
    scientist: payload.scientist.trim(),
    status: payload.status.trim(),
  };
}

function getExistingSampleOrThrow(sampleId) {
  const sample = sampleStore.findById(sampleId);

  if (!sample) {
    throw createHttpError(404, `Sample with id "${sampleId}" was not found.`);
  }

  return sample;
}

export const sampleService = {
  createSample(payload) {
    const requestedId = payload.id?.trim();
    const sampleId = requestedId || generateSampleId();

    if (sampleStore.has(sampleId)) {
      throw createHttpError(409, `Sample with id "${sampleId}" already exists.`);
    }

    const sample = buildSampleRecord(payload, sampleId);
    return sampleStore.create(sample);
  },
  deleteSample(sampleId) {
    const deletedSample = sampleStore.delete(sampleId);

    if (!deletedSample) {
      throw createHttpError(404, `Sample with id "${sampleId}" was not found.`);
    }

    return deletedSample;
  },
  getAllSamples() {
    return sampleStore.findAll();
  },
  getSampleById(sampleId) {
    return getExistingSampleOrThrow(sampleId);
  },
  updateSample(sampleId, payload) {
    getExistingSampleOrThrow(sampleId);

    if (payload.id && payload.id.trim() !== sampleId) {
      throw createHttpError(400, 'Sample id is immutable and cannot be changed.');
    }

    const updatedSample = buildSampleRecord(payload, sampleId);

    return sampleStore.update(sampleId, updatedSample);
  },
};
