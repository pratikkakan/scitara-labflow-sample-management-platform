export default function StatusBadge({ status }) {
  const statusClassName = status.toLowerCase().replace(/\s+/g, '-');

  return <span className={`status-badge ${statusClassName}`}>{status}</span>;
}
