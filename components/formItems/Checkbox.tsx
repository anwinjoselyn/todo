const Checkbox = ({ field, props, error, fieldKey, innerRef }: any) => {
  return (
    <div className="" key={fieldKey}>
      <p>{field.label}</p>
      {field.options.map((option: any) => (
        <div key={option.key}>
          <input
            key={option.key}
            type={option.type}
            id={option.key}
            name={field.key}
            checked={option.checked}
            ref={innerRef}
            {...props}
          />
          <label htmlFor={option.key}>{option.label}</label>
        </div>
      ))}
      <p className={`${error ? '' : 'invisible'}`}>{error && error}</p>
    </div>
  );
};

export default Checkbox;
