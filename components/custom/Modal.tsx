type Function = () => void;
type Size = '' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'custom';

interface Props {
  children: JSX.Element | any;
  show: boolean;
  onHide: Function;
  title?: JSX.Element | string;
  className?: string;
  closable?: boolean;
  closeIcon?: JSX.Element | any;
  size?: Size;
  footer?: JSX.Element | any;
}

const Modal = ({
  children,
  show,
  onHide,
  title,
  className,
  closable,
  closeIcon,
  size,
  footer,
}: Props) => {
  return (
    <div
      className={`modal bg-bg-light p-3 fixed rounded-md overflow-auto z-50 top-1/2 left-1/2 pb-4 bottom-6 ${size} ${
        show && 'open'
      } ${className}`}
    >
      <div
        className={`flex justify-between mb-3 pb-2 border-b border-gray ${
          title ? 'justify-between' : 'justify-end'
        }`}
      >
        {title ? <span className="">{title}</span> : null}
        {closable && (
          <span
            className="cursor-pointer text-gray-dark"
            role="presentation"
            onClick={onHide}
          >
            {closeIcon || <span className="material-icons">close</span>}
          </span>
        )}
      </div>
      {children}
      {footer && <div className="">{footer}</div>}
    </div>
  );
};

Modal.defaultProps = {
  title: '',
  className: '',
  closable: true,
  closeIcon: '',
  size: 'md',
};

export default Modal;
