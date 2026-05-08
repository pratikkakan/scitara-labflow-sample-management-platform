import ModalShell from './ModalShell.jsx';

export default function DeleteSampleModal({ isDeleting, onClose, onConfirm, sample }) {
  if (!sample) {
    return null;
  }

  return (
    <ModalShell
      actions={
        <>
          <button
            className="button secondary"
            disabled={isDeleting}
            onClick={onClose}
            type="button"
          >
            Cancel
          </button>
          <button
            className="button danger"
            disabled={isDeleting}
            onClick={onConfirm}
            type="button"
          >
            {isDeleting ? 'Deleting...' : 'Delete Sample'}
          </button>
        </>
      }
      onClose={onClose}
      testId="delete-sample-modal"
      title="Delete Sample"
    >
      <div className="modal-copy">
        <p>
          Remove <strong>{sample.sampleName}</strong> from the active sample queue?
        </p>
        <p className="modal-muted">
          This action removes the sample record from the current list and should be used
          only when the entry is no longer needed.
        </p>
      </div>
    </ModalShell>
  );
}
