import { sampleService } from '../services/sample.service.js';

export function listSamples(_request, response) {
  response.status(200).json({
    data: sampleService.getAllSamples(),
  });
}

export function getSampleById(request, response, next) {
  const sample = sampleService.getSampleById(request.params.sampleId);

  if (!sample) {
    const error = new Error(`Sample ${request.params.sampleId} was not found.`);
    error.statusCode = 404;
    return next(error);
  }

  return response.status(200).json({
    data: sample,
  });
}

export function createSample(request, response) {
  const sample = sampleService.createSample(request.body);

  response.status(201).json({
    data: sample,
  });
}
