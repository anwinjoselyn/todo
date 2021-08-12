type Function = () => void;
type Width = '' | 'w30' | 'w40' | 'w50' | 'w60' | 'w100';

interface Props {
  children: JSX.Element | any;
  show: boolean;
  onHide: Function;
  title?: JSX.Element | string;
  className?: string;
  closable?: boolean;
  closeIcon?: JSX.Element | any;
  width?: Width;
}

const Drawer = ({
  children,
  show,
  onHide,
  title,
  className,
  closable,
  closeIcon,
  width
}: Props) => {
  return (
    <>
      <div
        className={`px-5 py-4 drawer ${width} ${show && 'open'} ${className}`}
      >
        <div
          className={`flex align-center position-sticky fixed-top mb-3 pb-2 border-b border-gray-dark ${
            title ? 'justify-between' : 'justify-end'
          }`}
        >
          {title ? <span className="">{title}</span> : null}
          {closable && (
            <span
              className="cursor-pointer"
              role="presentation"
              onClick={onHide}
            >
              {closeIcon || <span className="material-icons">close</span>}
            </span>
          )}
        </div>
        {children}
      </div>
      {show ? (
        <div className="backdrop" onClick={onHide} role="presentation" />
      ) : null}
    </>
  );
};

Drawer.defaultProps = {
  title: '',
  className: '',
  closable: true,
  closeIcon: '',
  width: 'w100'
};

export default Drawer;