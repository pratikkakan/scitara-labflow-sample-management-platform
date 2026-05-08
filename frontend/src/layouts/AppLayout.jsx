import { NavLink, Outlet } from 'react-router-dom';

export default function AppLayout() {
  return (
    <div className="app-shell">
      <header className="app-header">
        <div>
          <p className="eyebrow">LabFlow Platform</p>
          <h1>Sample Management System</h1>
        </div>
        <nav className="nav-links" aria-label="Primary">
          <NavLink
            className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
            to="/samples"
          >
            Samples
          </NavLink>
        </nav>
      </header>
      <main className="app-content">
        <Outlet />
      </main>
    </div>
  );
}
