import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <section className="panel not-found">
      <p className="eyebrow">Missing Route</p>
      <h2>Page not found</h2>
      <p>The requested page does not exist in this workspace.</p>
      <Link className="nav-link active" to="/samples">
        Return to samples
      </Link>
    </section>
  );
}
