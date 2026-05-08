import { createHttpError } from '../utils/create-http-error.js';

export function validateRequest({
  errorMessage = 'Request validation failed.',
  source = 'body',
  validators = [],
} = {}) {
  return function requestValidationMiddleware(request, _response, next) {
    const payload = request[source] ?? {};
    const validationErrors = validators.flatMap((validator) => validator(payload, request));

    if (validationErrors.length > 0) {
      return next(createHttpError(400, errorMessage, validationErrors));
    }

    return next();
  };
}
