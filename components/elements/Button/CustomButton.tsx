import React, { memo } from 'react';
import Spinner from '../../../icons/Spinner';
import { ButtonTypes, ButtonPropsIF } from './interfaces';

const Button = ({
  name,
  label,
  className,
  onClick,
  isSubmitting,
  status,
  disabled,
  type,
  style,
  size,
}: ButtonPropsIF ) => {

  return (
    <button
      type={type}
      name={name}
      className={`btn flex items-center justify-center rounded p-1 font-semibold text-opacity-80 hover:text-opacity-100 ${style} ${size} ${className ?? null} ${status || ''}`}
      onClick={onClick ? onClick : null}
      disabled={disabled}
    >
      {status === 'submitted' ? (
        <span className={`material-icons text-primary-text-color mr-2`}>
          done_all
        </span>
      ) : null}
      {isSubmitting || status === 'submitting' ? (
        <>
          <Spinner width="20" fill="white" className="animate-spin mr-1" />
          Submitting
        </>
      ) : (
        label
      )}
    </button>
  );
};

Button.defaultProps = {
  type: 'button',
  name: 'submit',
  onClick: null,
  className: '',
  disabled: false,
  isSubmitting: false,
  status: '',
  style: 'primary',
  size: 'medium'
};

export default memo(Button);
