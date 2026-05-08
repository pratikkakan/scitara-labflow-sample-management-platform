import { useEffect, useState } from 'react';

import ModalShell from './ModalShell.jsx';
import StatusBadge from './StatusBadge.jsx';
import { getAvailableStatusOptions } from '../utils/sampleStatus.js';

export default function StatusEditModal({ isSaving, onClose, onSave, sample }) {
  const [nextStatus, setNextStatus] = useState('');

  useEffect(() => {
    if (!sample) {
      return;
    }

    const availableOptions = getAvailableStatusOptions(sample.status).filter(
      (option) => !option.disabled,
    );

    setNextStatus(availableOptions[0]?.value ?? '');
  }, [sample]);

  if (!sample) {
    return null;
  }

  const statusOptions = getAvailableStatusOptions(sample.status);
  const hasTransition = statusOptions.some((option) => !option.disabled);

  return (
    <ModalShell
      actions={
        <>
          <button
            className="button secondary"
            disabled={isSaving}
            onClick={onClose}
            type="button"
          >
            Cancel
          </button>
          <button
            className="button primary"
            data-testid="save-status-button"
            disabled={!hasTransition || !nextStatus || isSaving}
            onClick={() => onSave(nextStatus)}
            type="button"
          >
            {isSaving ? 'Saving...' : 'Save Status'}
          </button>
        </>
      }
      onClose={onClose}
      testId="edit-status-modal"
      title="Edit Sample Status"
    >
      <div className="modal-copy">
        <div className="sample-summary">
          <div>
            <span>Sample ID</span>
            <strong>{sample.id}</strong>
          </div>
          <div>
            <span>Sample Name</span>
            <strong>{sample.sampleName}</strong>
          </div>
          <div>
            <span>Scientist</span>
            <strong>{sample.scientist}</strong>
          </div>
          <div>
            <span>Current Status</span>
            <StatusBadge status={sample.status} />
          </div>
        </div>

        <fieldset className="status-options">
          <legend>Next Status</legend>
          {statusOptions.map((option) => (
            <label
              className={`status-option ${option.disabled ? 'disabled' : ''}`}
              htmlFor={`status-option-${option.value}`}
              key={option.value}
            >
              <input
                checked={nextStatus === option.value}
                data-testid={`status-option-${option.value.toLowerCase()}`}
                disabled={option.disabled}
                id={`status-option-${option.value}`}
                name="sample-status"
                onChange={(event) => setNextStatus(event.target.value)}
                type="radio"
                value={option.value}
              />
              <span>{option.label}</span>
            </label>
          ))}
        </fieldset>

        {!hasTransition ? (
          <p className="modal-muted">
            Completed samples are locked in the standard workflow and cannot be
            progressed further.
          </p>
        ) : (
          <p className="modal-muted">
            Status changes follow the lab workflow sequence to keep sample movement
            consistent.
          </p>
        )}
      </div>
    </ModalShell>
  );
}
