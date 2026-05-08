export default function LoadingState({ label = 'Loading samples...' }) {
  return (
    <div className="loading-state" role="status">
      <span aria-hidden="true" className="loading-indicator" />
      <span>{label}</span>
    </div>
  );
}
