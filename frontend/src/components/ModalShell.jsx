import { useEffect, useId } from 'react';

export default function ModalShell({ actions, children, onClose, testId, title }) {
  const titleId = useId();

  useEffect(() => {
    function handleKeyDown(event) {
      if (event.key === 'Escape') {
        onClose();
      }
    }

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  return (
    <div className="modal-backdrop" onClick={onClose} role="presentation">
      <section
        aria-labelledby={titleId}
        aria-modal="true"
        className="modal-shell"
        data-testid={testId}
        onClick={(event) => event.stopPropagation()}
        role="dialog"
      >
        <div className="modal-header">
          <div>
            <p className="eyebrow">Sample Workflow</p>
            <h3 id={titleId}>{title}</h3>
          </div>
          <button
            aria-label="Close dialog"
            className="icon-button"
            onClick={onClose}
            type="button"
          >
            Close
          </button>
        </div>
        <div className="modal-content">{children}</div>
        <div className="modal-actions">{actions}</div>
      </section>
    </div>
  );
}
