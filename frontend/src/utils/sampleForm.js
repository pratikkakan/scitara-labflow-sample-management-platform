export function createInitialSampleValues() {
  return {
    id: '',
    sampleName: '',
    scientist: '',
  };
}

export function validateSampleForm(values) {
  const errors = {};

  if (!values.sampleName.trim()) {
    errors.sampleName = 'Sample name is required.';
  }

  if (!values.scientist.trim()) {
    errors.scientist = 'Scientist is required.';
  }

  return errors;
}
