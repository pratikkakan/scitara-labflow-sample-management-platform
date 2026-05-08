function normalizeString(value) {
  return typeof value === 'string' ? value.trim() : '';
}

function buildValidationError(field, message) {
  return [{ field, message }];
}

export function optionalNonEmptyString(field) {
  return function validateOptionalNonEmptyString(payload) {
    const value = payload[field];

    if (value === undefined) {
      return [];
    }

    if (typeof value !== 'string' || !normalizeString(value)) {
      return buildValidationError(field, `${field}, when provided, must be a non-empty string.`);
    }

    return [];
  };
}

export function requiredString(field) {
  return function validateRequiredString(payload) {
    if (!normalizeString(payload[field])) {
      return buildValidationError(field, `${field} is required.`);
    }

    return [];
  };
}

export function enumString(field, allowedValues) {
  return function validateEnumString(payload) {
    const value = normalizeString(payload[field]);

    if (!value) {
      return [];
    }

    if (!allowedValues.includes(value)) {
      return buildValidationError(
        field,
        `${field} must be one of: ${allowedValues.join(', ')}.`,
      );
    }

    return [];
  };
}
