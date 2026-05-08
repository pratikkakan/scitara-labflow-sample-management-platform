export function createSamplePayload() {
  const sequence = Date.now();

  return {
    id: `SMP-${sequence}`,
    name: `Automation Validation ${sequence}`,
    type: 'Blood',
    owner: 'Playwright Suite',
    status: 'Received',
    priority: 'High',
    location: 'QA Rack',
    collectedAt: '2026-05-08',
  };
}
