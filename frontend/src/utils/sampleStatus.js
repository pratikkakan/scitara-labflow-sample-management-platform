export const sampleStatuses = ['Pending', 'Processing', 'Completed'];

const transitionMap = {
  Pending: ['Processing'],
  Processing: ['Completed'],
  Completed: [],
};

export function canAdvanceStatus(status) {
  return transitionMap[status]?.length > 0;
}

export function getAvailableStatusOptions(currentStatus) {
  const allowedTransitions = new Set(transitionMap[currentStatus] ?? []);

  return sampleStatuses.map((status) => ({
    disabled: status === currentStatus || !allowedTransitions.has(status),
    label: status,
    value: status,
  }));
}
