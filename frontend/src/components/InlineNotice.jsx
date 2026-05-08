export default function InlineNotice({ message, onDismiss = null, type = 'info' }) {
  return (
    <div className={`inline-notice ${type}`} role="status">
      <p>{message}</p>
      {onDismiss ? (
        <button
          aria-label="Dismiss notice"
          className="notice-dismiss"
          onClick={onDismiss}
          type="button"
        >
          Dismiss
        </button>
      ) : null}
    </div>
  );
}
