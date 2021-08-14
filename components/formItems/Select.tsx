const Select = ({ field, props, error, fieldKey, onChange }: any) => {
  return (
    <div className="my-3" key={fieldKey}>
      <label
        className="w-full text-secondary-text-color text-sm"
        htmlFor={field.key}
      >
        {field.label}
      </label>
      <select
        className="w-full rounded border border-blue-light px-3 py-2 text-sm mt-1 text-primary-text-color focus:outline-none focus:ring-1 focus:border-blue-dark"
        type={field.type}
        id={field.key}
        name={field.key}
        required={field.required}
        onChange={onChange}
        value={field.value}
        {...props}
      >
        <option key={-1} value={-1}>
          {field.placeholder}
        </option>
        {field.options.map((option: any) => (
          <option key={option.key} value={option.key}>
            {option.value}
          </option>
        ))}
      </select>
      <p className={`${error ? '' : 'invisible'}`}>{error && error}</p>
    </div>
  );
};

export default Select;
