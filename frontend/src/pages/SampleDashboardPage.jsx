import { useEffect, useState } from 'react';

import LoadingState from '../components/LoadingState.jsx';
import PageHeader from '../components/PageHeader.jsx';
import SampleTable from '../components/SampleTable.jsx';
import SummaryCard from '../components/SummaryCard.jsx';
import { getSamples } from '../services/sampleService.js';

function buildSummary(samples) {
  return [
    { label: 'Total Samples', value: samples.length },
    {
      label: 'Received',
      value: samples.filter((sample) => sample.status === 'Received').length,
    },
    {
      label: 'In Analysis',
      value: samples.filter((sample) => sample.status === 'In Analysis').length,
    },
    {
      label: 'Archived',
      value: samples.filter((sample) => sample.status === 'Archived').length,
    },
  ];
}

export default function SampleDashboardPage() {
  const [samples, setSamples] = useState([]);
  const [status, setStatus] = useState('idle');

  useEffect(() => {
    let isMounted = true;

    async function loadSamples() {
      try {
        setStatus('loading');
        const sampleData = await getSamples();

        if (isMounted) {
          setSamples(sampleData);
          setStatus('success');
        }
      } catch (error) {
        if (isMounted) {
          setStatus('error');
        }
      }
    }

    loadSamples();

    return () => {
      isMounted = false;
    };
  }, []);

  const summary = buildSummary(samples);

  return (
    <div className="stack">
      <PageHeader
        title="Sample Management Overview"
        description="Track specimen intake, processing, and archival status across the scientific workflow."
      />

      <section className="summary-grid" aria-label="Sample summary">
        {summary.map((item) => (
          <SummaryCard key={item.label} label={item.label} value={item.value} />
        ))}
      </section>

      <section className="panel">
        <div className="panel-header">
          <div>
            <p className="eyebrow">Current Inventory</p>
            <h3>Sample Queue</h3>
          </div>
        </div>

        {status === 'loading' && <LoadingState />}
        {status === 'error' && (
          <p className="error-state">
            Unable to load sample data. Confirm the backend is running and reachable.
          </p>
        )}
        {status === 'success' && <SampleTable samples={samples} />}
      </section>
    </div>
  );
}
