export default function PageHeader({ title, description }) {
  return (
    <section className="page-header">
      <div>
        <p className="eyebrow">Operations Dashboard</p>
        <h2>{title}</h2>
        <p className="page-description">{description}</p>
      </div>
    </section>
  );
}
