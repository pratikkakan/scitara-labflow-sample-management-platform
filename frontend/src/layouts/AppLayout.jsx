import { NavLink, Outlet } from 'react-router-dom';

export default function AppLayout() {
  return (
    <div className="app-shell">
      <header className="app-header">
        <div className="brand-block">
          <p className="eyebrow">Scitara LabFlow</p>
          <h1>Sample Management System</h1>
          <p className="app-description">
            Register samples, track progress, and keep the active queue clean from one
            responsive workspace.
          </p>
        </div>
        <div className="header-actions">
          <nav className="nav-links" aria-label="Primary">
            <NavLink
              className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
              end
              to="/samples"
            >
              Dashboard
            </NavLink>
            <NavLink
              className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
              to="/samples/new"
            >
              Create Sample
            </NavLink>
          </nav>
          <p className="header-meta">Lab operations workspace</p>
        </div>
      </header>
      <main className="app-content">
        <Outlet />
      </main>
    </div>
  );
}
