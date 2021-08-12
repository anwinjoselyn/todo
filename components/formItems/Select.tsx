const Select = ({ field, props, error, fieldKey, innerRef }: any) => {
  return (
    <div className="" key={fieldKey}>
      <label htmlFor={field.key}>{field.label}</label>
      <select
        type={field.type}
        id={field.key}
        name={field.key}
        required={field.required}
        ref={innerRef}
        {...props}
      >
        <option key={-1} value={-1}>
          {field.placeholder}
        </option>
        {field.options.map((option: any) => (
          <option key={option.key} value={option.value}>
            {option.value}
          </option>
        ))}
      </select>
      <p className={`${error ? '' : 'invisible'}`}>{error && error}</p>
    </div>
  );
};

export default Select;
