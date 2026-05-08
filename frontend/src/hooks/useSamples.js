import { useEffect, useState } from 'react';

import {
  deleteSample,
  getSamples,
  updateSample,
} from '../services/sampleService.js';

export default function useSamples() {
  const [samples, setSamples] = useState([]);
  const [status, setStatus] = useState('idle');
  const [errorMessage, setErrorMessage] = useState('');

  async function loadSamples() {
    try {
      setStatus('loading');
      const sampleData = await getSamples();
      setSamples(sampleData);
      setErrorMessage('');
      setStatus('success');
    } catch (error) {
      setErrorMessage(error.message ?? 'Unable to load samples.');
      setStatus('error');
    }
  }

  useEffect(() => {
    loadSamples();
  }, []);

  async function updateSampleRecord(payload) {
    const updatedSample = await updateSample(payload.id, payload);

    setSamples((currentSamples) =>
      currentSamples.map((sample) =>
        sample.id === updatedSample.id ? updatedSample : sample,
      ),
    );

    return updatedSample;
  }

  async function deleteSampleRecord(sampleId) {
    await deleteSample(sampleId);

    setSamples((currentSamples) =>
      currentSamples.filter((sample) => sample.id !== sampleId),
    );
  }

  return {
    deleteSampleRecord,
    errorMessage,
    loadSamples,
    samples,
    status,
    updateSampleRecord,
  };
}
