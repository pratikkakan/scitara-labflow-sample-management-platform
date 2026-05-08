const seededSamples = [
  {
    id: 'SMP-1001',
    sampleName: 'Water Quality Control',
    scientist: 'Dr. Maya Chen',
    status: 'Pending',
  },
  {
    id: 'SMP-1002',
    sampleName: 'Cell Viability Panel',
    scientist: 'Dr. Aaron Patel',
    status: 'Processing',
  },
  {
    id: 'SMP-1003',
    sampleName: 'Protein Stability Assay',
    scientist: 'Dr. Sofia Romero',
    status: 'Completed',
  },
];

const sampleInventory = new Map(
  seededSamples.map((sample) => [sample.id, { ...sample }]),
);

export const sampleStore = {
  create(sample) {
    sampleInventory.set(sample.id, { ...sample });
    return { ...sample };
  },
  delete(sampleId) {
    const sample = sampleInventory.get(sampleId);

    if (!sample) {
      return null;
    }

    sampleInventory.delete(sampleId);
    return { ...sample };
  },
  findAll() {
    return [...sampleInventory.values()].map((sample) => ({ ...sample }));
  },
  findById(sampleId) {
    const sample = sampleInventory.get(sampleId);
    return sample ? { ...sample } : null;
  },
  has(sampleId) {
    return sampleInventory.has(sampleId);
  },
  update(sampleId, updatedSample) {
    if (!sampleInventory.has(sampleId)) {
      return null;
    }

    sampleInventory.set(sampleId, { ...updatedSample, id: sampleId });
    return { ...sampleInventory.get(sampleId) };
  },
};
