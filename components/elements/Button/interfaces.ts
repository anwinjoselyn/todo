export type ButtonStatus = '' | 'disabled' | 'submitting' | 'submitted';
export type ButtonTypes =
  | ''
  | 'primary'
  | 'secondary'
  | 'success'
  | 'warning'
  | 'danger'
  | 'light'
  | 'ghost'
  | 'info'
  | 'dark'
  | 'outline-primary'
  | 'outline-secondary'
  | 'outline-success'
  | 'outline-warning'
  | 'outline-danger'
  | 'outline-light'
  | 'outline-ghost'
  | 'outline-info'
  | 'outline-dark';

export type ButtonSizes = '' | 'small' | 'medium' | 'large' | 'xl';

export interface ButtonPropsIF {
  name?: string;
  label: any | React.ReactNode;
  className?: string;
  onClick?: any;
  isSubmitting?: boolean;
  disabled?: boolean;
  type?: any;
  status?: ButtonStatus;
  style?: ButtonTypes;
  size?: ButtonSizes;
}
