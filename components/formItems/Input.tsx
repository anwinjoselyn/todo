import React from 'react';
import dayjs from 'dayjs';

const Input = ({ field, props, error, fieldKey, onChange }: any) => {
  return (
    <div className="my-3" key={fieldKey}>
      <label
        className="w-full text-secondary-text-color text-sm"
        htmlFor={field.key}
      >
        {field.label}
      </label>
      <input
        className="w-full rounded border border-blue-light px-3 py-2 text-sm mt-1 text-primary-text-color focus:outline-none focus:ring-1 focus:border-blue-dark"
        type={field.type}
        id={field.key}
        name={field.key}
        required={field.required}
        placeholder={field.placeholder}
        autoComplete="off"
        {...props}
        onChange={onChange}
        value={field.type === 'date' ? new Date(field.value) : field.value}
      />
      <p className={`${error ? '' : 'invisible'}`}>{error && error}</p>
    </div>
  );
};

export default Input;
