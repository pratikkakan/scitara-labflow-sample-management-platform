import { sampleStatuses } from '../constants/sample-status.js';
import { validateRequest } from './validate-request.js';
import {
  enumString,
  optionalNonEmptyString,
  requiredString,
} from '../validators/field-rules.js';

export const validateSamplePayload = validateRequest({
  errorMessage: 'Validation failed for sample request.',
  validators: [
    optionalNonEmptyString('id'),
    requiredString('sampleName'),
    requiredString('scientist'),
    requiredString('status'),
    enumString('status', sampleStatuses),
  ],
});
