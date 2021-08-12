import React from 'react';

const Input = ({ field, props, error, innerRef, fieldKey }: any) => {
  return (
    <div className="my-3" key={fieldKey}>
      <label className="w-full" htmlFor={field.key}>
        {field.label}
      </label>
      <input
        className="w-full"
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

export default Input;
