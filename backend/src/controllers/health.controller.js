export function getHealth(_request, response) {
  response.status(200).json({
    status: 'ok',
    service: 'sample-management-api',
    timestamp: new Date().toISOString(),
  });
}
