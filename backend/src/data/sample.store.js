const sampleInventory = [
  {
    id: 'SMP-1001',
    name: 'Serum Stability Panel',
    type: 'Serum',
    owner: 'Dr. Maya Chen',
    status: 'Received',
    priority: 'High',
    location: 'Freezer A1',
    collectedAt: '2026-05-02',
  },
  {
    id: 'SMP-1002',
    name: 'Plasma Biomarker Assay',
    type: 'Plasma',
    owner: 'Dr. Aaron Patel',
    status: 'In Analysis',
    priority: 'Medium',
    location: 'Bench B4',
    collectedAt: '2026-05-04',
  },
  {
    id: 'SMP-1003',
    name: 'Tissue Histology Prep',
    type: 'Tissue',
    owner: 'Dr. Sofia Romero',
    status: 'Archived',
    priority: 'Low',
    location: 'Archive C2',
    collectedAt: '2026-04-29',
  },
];

export const sampleStore = {
  create(sample) {
    sampleInventory.unshift(sample);
    return sample;
  },
  findAll() {
    return [...sampleInventory];
  },
  findById(sampleId) {
    return sampleInventory.find((sample) => sample.id === sampleId) ?? null;
  },
};
