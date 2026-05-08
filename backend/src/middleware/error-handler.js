export function errorHandler(error, _request, response, _next) {
  const isInvalidJson = error.type === 'entity.parse.failed';
  const statusCode = error.statusCode ?? error.status ?? (isInvalidJson ? 400 : 500);
  const payload = {
    error: {
      message: isInvalidJson
        ? 'Request body must contain valid JSON.'
        : (error.message ?? 'Internal Server Error'),
      statusCode,
    },
  };

  if (error.details) {
    payload.error.details = error.details;
  }

  if (process.env.NODE_ENV !== 'production' && error.stack) {
    payload.error.stack = error.stack;
  }

  response.status(statusCode).json(payload);
}
