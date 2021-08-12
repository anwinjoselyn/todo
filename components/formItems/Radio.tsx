const Radio = ({ field, props, error, fieldKey, innerRef }: any) => {
  return (
    <div className="my-3" key={fieldKey}>
      <p className="w-full text-secondary-text-color text-sm">{field.label}</p>
      {field.options.map((option: any) => (
        <div key={option.title}>
          <input
            className="border border-blue-light px-3 py-2 my-1 mr-4 text-primary-text-color focus:outline-none cursor-pointer"
            key={option.key}
            type={field.type}
            id={option.key}
            name={field.key}
            checked={option.checked}
            ref={innerRef}
            {...props}
          />
          <label className="text-sm" htmlFor={option.title}>{option.title}</label>
        </div>
      ))}
      <p className={`${error ? '' : 'invisible'}`}>{error && error}</p>
    </div>
  );
};

export default Radio;
