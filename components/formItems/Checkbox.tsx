const Checkbox = ({ field, props, error, fieldKey }: any) => {
  return (
    <div className="my-3" key={fieldKey}>
      <p className="w-full text-secondary-text-color text-sm">{field.label}</p>
      {field.options.map((option: any) => (
        <div key={option.key}>
          <input
            className="w-full rounded border border-blue-light px-3 py-2 text-sm mt-1 text-primary-text-color focus:outline-none focus:ring-1 focus:border-blue-dark"
            key={option.key}
            type={option.type}
            id={option.key}
            name={field.key}
            checked={field.checked}
            {...props}
          />
          <label className="text-sm" htmlFor={option.key}>
            {option.label}
          </label>
        </div>
      ))}
      <p className={`${error ? '' : 'invisible'}`}>{error && error}</p>
    </div>
  );
};

export default Checkbox;
