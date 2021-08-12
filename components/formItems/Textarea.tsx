const Textarea = ({ field, props, error, fieldKey, innerRef }: any) => {
  return (
    <div className="my-3" key={fieldKey}>
      <label
        className="w-full text-secondary-text-color text-sm"
        htmlFor={field.key}
      >
        {field.label}
      </label>
      <textarea
        className="w-full rounded border border-blue-light px-3 py-2 text-sm mt-1 text-primary-text-color focus:outline-none focus:ring-1 focus:border-blue-dark"
        type={field.type}
        id={field.key}
        name={field.key}
        required={field.required}
        placeholder={field.placeholder}
        autoComplete="off"
        ref={innerRef}
        rows={field.rows}
        {...props}
      />
      <p className={`${error ? '' : 'invisible'}`}>{error && error}</p>
    </div>
  );
};

export default Textarea;
