import EmptyState from './EmptyState.jsx';
import StatusBadge from './StatusBadge.jsx';
import { canAdvanceStatus } from '../utils/sampleStatus.js';

export default function SampleTable({ samples, onDelete, onEditStatus }) {
  if (!samples.length) {
    return (
      <EmptyState
        title="No samples found"
        description="Adjust the filters or create a new sample to populate the dashboard."
      />
    );
  }

  return (
    <>
      <div className="table-wrapper" data-testid="sample-table">
        <table className="sample-table">
          <thead>
            <tr>
              <th>Sample ID</th>
              <th>Sample Name</th>
              <th>Scientist</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {samples.map((sample) => {
              const statusLocked = !canAdvanceStatus(sample.status);

              return (
                <tr data-testid="sample-row" key={sample.id}>
                  <td>{sample.id}</td>
                  <td>{sample.sampleName}</td>
                  <td>{sample.scientist}</td>
                  <td>
                    <StatusBadge status={sample.status} />
                  </td>
                  <td>
                    <div className="row-actions">
                      <button
                        className="button ghost"
                        disabled={statusLocked}
                        onClick={() => onEditStatus(sample)}
                        type="button"
                      >
                        Edit Status
                      </button>
                      <button
                        className="button ghost danger"
                        onClick={() => onDelete(sample)}
                        type="button"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="sample-card-list" aria-label="Sample cards">
        {samples.map((sample) => {
          const statusLocked = !canAdvanceStatus(sample.status);

          return (
            <article className="sample-card" key={`${sample.id}-card`}>
              <div className="sample-card-head">
                <div>
                  <p className="card-label">Sample ID</p>
                  <h3>{sample.id}</h3>
                </div>
                <StatusBadge status={sample.status} />
              </div>
              <dl className="sample-card-details">
                <div>
                  <dt>Name</dt>
                  <dd>{sample.sampleName}</dd>
                </div>
                <div>
                  <dt>Scientist</dt>
                  <dd>{sample.scientist}</dd>
                </div>
              </dl>
              <div className="row-actions">
                <button
                  className="button ghost"
                  disabled={statusLocked}
                  onClick={() => onEditStatus(sample)}
                  type="button"
                >
                  Edit Status
                </button>
                <button
                  className="button ghost danger"
                  onClick={() => onDelete(sample)}
                  type="button"
                >
                  Delete
                </button>
              </div>
            </article>
          );
        })}
      </div>
    </>
  );
}
