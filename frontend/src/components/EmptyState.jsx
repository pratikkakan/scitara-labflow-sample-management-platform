import { Link } from 'react-router-dom';

export default function EmptyState({
  actionLabel = 'Create Sample',
  actionTo = '/samples/new',
  description,
  title,
}) {
  return (
    <div className="empty-state">
      <p className="eyebrow">No Results</p>
      <h3>{title}</h3>
      <p>{description}</p>
      <Link className="button primary" to={actionTo}>
        {actionLabel}
      </Link>
    </div>
  );
}
