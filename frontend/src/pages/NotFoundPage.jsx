import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <section className="panel not-found">
      <p className="eyebrow">Missing Route</p>
      <h2>Page not found</h2>
      <p>The requested page does not exist in the sample management workspace.</p>
      <div className="not-found-actions">
        <Link className="button secondary" to="/samples">
          Return to dashboard
        </Link>
        <Link className="button primary" to="/samples/new">
          Create Sample
        </Link>
      </div>
    </section>
  );
}
