const validStatuses = new Set(['Received', 'In Analysis', 'Archived']);

export function validateSamplePayload(request, _response, next) {
  const { name, owner, status, type } = request.body;

  if (!name || !type || !owner || !status) {
    const error = new Error('name, type, owner, and status are required.');
    error.statusCode = 400;
    return next(error);
  }

  if (!validStatuses.has(status)) {
    const error = new Error(`status must be one of: ${[...validStatuses].join(', ')}.`);
    error.statusCode = 400;
    return next(error);
  }

  return next();
}
