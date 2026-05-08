import FormField from './FormField.jsx';

export default function SampleForm({
  errors,
  isSubmitting,
  onCancel,
  onChange,
  onSubmit,
  values,
}) {
  return (
    <form className="sample-form" onSubmit={onSubmit}>
      <div className="form-grid">
        <FormField
          helpText="Leave blank to auto-generate a sample ID."
          label="Sample ID"
          name="id"
          onChange={onChange}
          placeholder="SMP-2042"
          value={values.id}
        />
        <div className="status-panel">
          <span className="status-panel-label">Initial Status</span>
          <strong>Pending</strong>
          <p>New samples begin in the pending queue and can be progressed later.</p>
        </div>
        <FormField
          error={errors.sampleName}
          label="Sample Name"
          name="sampleName"
          onChange={onChange}
          placeholder="Water quality control"
          required
          value={values.sampleName}
        />
        <FormField
          error={errors.scientist}
          label="Scientist"
          name="scientist"
          onChange={onChange}
          placeholder="Dr. Maya Chen"
          required
          value={values.scientist}
        />
      </div>

      <div className="form-actions">
        <button className="button secondary" onClick={onCancel} type="button">
          Cancel
        </button>
        <button className="button primary" disabled={isSubmitting} type="submit">
          {isSubmitting ? 'Saving...' : 'Save Sample'}
        </button>
      </div>
    </form>
  );
}
