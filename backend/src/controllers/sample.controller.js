import { sampleService } from '../services/sample.service.js';

export function listSamples(_request, response) {
  response.status(200).json({
    data: sampleService.getAllSamples(),
  });
}

export function getSampleById(request, response) {
  response.status(200).json({
    data: sampleService.getSampleById(request.params.id),
  });
}

export function createSample(request, response) {
  const sample = sampleService.createSample(request.body);

  response.status(201).json({
    data: sample,
  });
}

export function updateSample(request, response) {
  const sample = sampleService.updateSample(request.params.id, request.body);

  response.status(200).json({
    data: sample,
  });
}

export function deleteSample(request, response) {
  sampleService.deleteSample(request.params.id);
  response.status(204).send();
}
