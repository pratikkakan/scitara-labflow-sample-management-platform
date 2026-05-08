import { sampleStatuses } from '../utils/sampleStatus.js';

export default function FilterToolbar({
  hasFilters,
  onReset,
  onSearchChange,
  onStatusChange,
  resultCount,
  searchTerm,
  statusFilter,
}) {
  return (
    <section className="toolbar" aria-label="Filter samples">
      <label className="toolbar-field" htmlFor="sample-search">
        <span>Search</span>
        <input
          id="sample-search"
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder="Search by id, name, or scientist"
          type="search"
          value={searchTerm}
        />
      </label>

      <label className="toolbar-field" htmlFor="status-filter">
        <span>Status</span>
        <select
          data-testid="status-filter"
          id="status-filter"
          onChange={(event) => onStatusChange(event.target.value)}
          value={statusFilter}
        >
          <option value="All">All statuses</option>
          {sampleStatuses.map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>
      </label>

      <div className="toolbar-meta">
        <p>{resultCount === 1 ? '1 sample' : `${resultCount} samples`}</p>
        <button
          className="button subtle"
          disabled={!hasFilters}
          onClick={onReset}
          type="button"
        >
          Reset Filters
        </button>
      </div>
    </section>
  );
}
