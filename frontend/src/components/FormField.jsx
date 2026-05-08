export default function FormField({
  error,
  helpText = null,
  label,
  name,
  onChange,
  placeholder,
  required = false,
  rows = 4,
  type = 'text',
  value,
}) {
  const Element = type === 'textarea' ? 'textarea' : 'input';

  return (
    <label className="form-field" htmlFor={name}>
      <span>
        {label}
        {required ? ' *' : ''}
      </span>
      <Element
        aria-invalid={Boolean(error)}
        id={name}
        name={name}
        onChange={(event) => onChange(name, event.target.value)}
        placeholder={placeholder}
        rows={type === 'textarea' ? rows : undefined}
        type={type === 'textarea' ? undefined : type}
        value={value}
      />
      {helpText ? <small>{helpText}</small> : null}
      {error ? <small className="field-error">{error}</small> : null}
    </label>
  );
}
