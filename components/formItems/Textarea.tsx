const Textarea = ({ field, props, error, fieldKey, innerRef }: any) => {
  return (
    <div className="" key={fieldKey}>
      <label htmlFor={field.key}>{field.label}</label>
      <textarea
        type={field.type}
        id={field.key}
        name={field.key}
        required={field.required}
        placeholder={field.placeholder}
        autoComplete="off"
        ref={innerRef}
        {...props}
      />
      <p className={`${error ? '' : 'invisible'}`}>{error && error}</p>
    </div>
  );
};

export default Textarea;
