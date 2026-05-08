import { useDeferredValue, useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import DeleteSampleModal from '../components/DeleteSampleModal.jsx';
import FilterToolbar from '../components/FilterToolbar.jsx';
import InlineNotice from '../components/InlineNotice.jsx';
import LoadingState from '../components/LoadingState.jsx';
import PageHeader from '../components/PageHeader.jsx';
import SampleTable from '../components/SampleTable.jsx';
import StatusEditModal from '../components/StatusEditModal.jsx';
import SummaryCard from '../components/SummaryCard.jsx';
import useSamples from '../hooks/useSamples.js';

function buildSummary(samples) {
  return [
    { label: 'Total Samples', value: samples.length },
    {
      label: 'Pending',
      value: samples.filter((sample) => sample.status === 'Pending').length,
    },
    {
      label: 'Processing',
      value: samples.filter((sample) => sample.status === 'Processing').length,
    },
    {
      label: 'Completed',
      value: samples.filter((sample) => sample.status === 'Completed').length,
    },
  ];
}

export default function SampleDashboardPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { deleteSampleRecord, errorMessage, loadSamples, samples, status, updateSampleRecord } =
    useSamples();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [notice, setNotice] = useState(null);
  const [sampleForStatusEdit, setSampleForStatusEdit] = useState(null);
  const [sampleForDelete, setSampleForDelete] = useState(null);
  const [isSavingStatus, setIsSavingStatus] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const deferredSearchTerm = useDeferredValue(searchTerm);

  useEffect(() => {
    if (!location.state?.notice) {
      return;
    }

    setNotice(location.state.notice);
    navigate(location.pathname, { replace: true, state: null });
  }, [location.pathname, location.state, navigate]);

  const summary = buildSummary(samples);
  const hasFilters = searchTerm.trim() || statusFilter !== 'All';
  const normalizedSearchTerm = deferredSearchTerm.trim().toLowerCase();
  const filteredSamples = samples.filter((sample) => {
    if (statusFilter !== 'All' && sample.status !== statusFilter) {
      return false;
    }

    if (!normalizedSearchTerm) {
      return true;
    }

    return [sample.id, sample.sampleName, sample.scientist]
      .join(' ')
      .toLowerCase()
      .includes(normalizedSearchTerm);
  });

  async function handleSaveStatus(nextStatus) {
    if (!sampleForStatusEdit) {
      return;
    }

    try {
      setIsSavingStatus(true);
      const updatedSample = await updateSampleRecord({
        ...sampleForStatusEdit,
        status: nextStatus,
      });

      setNotice({
        type: 'success',
        message: `${updatedSample.sampleName} moved to ${updatedSample.status}.`,
      });
      setSampleForStatusEdit(null);
    } catch (error) {
      setNotice({
        type: 'error',
        message: error.message ?? 'Unable to update the sample status.',
      });
    } finally {
      setIsSavingStatus(false);
    }
  }

  async function handleDeleteSample() {
    if (!sampleForDelete) {
      return;
    }

    try {
      setIsDeleting(true);
      await deleteSampleRecord(sampleForDelete.id);
      setNotice({
        type: 'success',
        message: `${sampleForDelete.sampleName} was deleted from the queue.`,
      });
      setSampleForDelete(null);
    } catch (error) {
      setNotice({
        type: 'error',
        message: error.message ?? 'Unable to delete the sample.',
      });
    } finally {
      setIsDeleting(false);
    }
  }

  function resetFilters() {
    setSearchTerm('');
    setStatusFilter('All');
  }

  return (
    <div className="stack">
      <PageHeader
        title="Sample Management Overview"
        description="Track registration, active lab work, and completion state across the sample workflow from one clean dashboard."
        actions={
          <Link className="button primary" data-testid="create-sample-button" to="/samples/new">
            Create Sample
          </Link>
        }
      />

      {notice ? (
        <InlineNotice
          message={notice.message}
          onDismiss={() => setNotice(null)}
          type={notice.type}
        />
      ) : null}

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
            <p className="panel-description">
              Search the queue, update status, or remove work that no longer belongs in
              the active list.
            </p>
          </div>
          <button className="button subtle" onClick={loadSamples} type="button">
            Refresh
          </button>
        </div>

        <FilterToolbar
          hasFilters={Boolean(hasFilters)}
          onReset={resetFilters}
          onSearchChange={setSearchTerm}
          onStatusChange={setStatusFilter}
          resultCount={filteredSamples.length}
          searchTerm={searchTerm}
          statusFilter={statusFilter}
        />

        {status === 'loading' ? <LoadingState /> : null}
        {status === 'error' ? (
          <InlineNotice
            message={errorMessage ?? 'Unable to load sample data. Confirm the backend is running.'}
            type="error"
          />
        ) : null}
        {status === 'success' ? (
          <SampleTable
            onDelete={setSampleForDelete}
            onEditStatus={setSampleForStatusEdit}
            samples={filteredSamples}
          />
        ) : null}
      </section>

      <StatusEditModal
        isSaving={isSavingStatus}
        onClose={() => {
          if (!isSavingStatus) {
            setSampleForStatusEdit(null);
          }
        }}
        onSave={handleSaveStatus}
        sample={sampleForStatusEdit}
      />

      <DeleteSampleModal
        isDeleting={isDeleting}
        onClose={() => {
          if (!isDeleting) {
            setSampleForDelete(null);
          }
        }}
        onConfirm={handleDeleteSample}
        sample={sampleForDelete}
      />
    </div>
  );
}
