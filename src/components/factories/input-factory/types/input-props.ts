export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  required?: boolean;
  disabled?: boolean;
  placeholder?: string;
  readonly?: boolean;
  value?: string | number;
}

export default InputProps;
