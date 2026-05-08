export function createSamplePayload() {
  const sequence = Date.now();

  return {
    sampleName: `Automation Validation ${sequence}`,
    scientist: 'Playwright Suite',
    status: 'Pending',
  };
}
