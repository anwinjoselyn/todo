const Textarea = ({
  field,
  props,
  error,
  fieldKey,
  onChange,
  className,
  noResize,
  onBlur,
}: any) => {
  return (
    <div className="my-3" key={fieldKey}>
      {field.label && (
        <label
          className="w-full text-secondary-text-color text-sm"
          htmlFor={field.key}
        >
          {field.label}
        </label>
      )}
      <textarea
        className={`w-full rounded px-3 py-2 text-sm mt-1 text-primary-text-color focus:outline-none ${
          className
            ? className
            : 'border border-blue-light focus:ring-1 focus:border-blue-dark"'
        } ${noResize ? noResize : ''}`}
        type={field.type}
        id={field.key}
        name={field.key}
        required={field.required}
        placeholder={field.placeholder}
        autoComplete="off"
        rows={field.rows}
        onChange={onChange}
        value={field.value}
        onBlur={onBlur}
        {...props}
      />
      <p className={`${error ? '' : 'invisible'}`}>{error && error}</p>
    </div>
  );
};

export default Textarea;
