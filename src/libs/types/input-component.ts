/** Import custom types */
import { ComponentStatuses } from './component-statuses';

export interface InputComponent
  extends React.InputHTMLAttributes<HTMLInputElement> {
  /** The name of the input */
  name: string;
  /**
   * The state of the input (not providing a value or setting the value to 'default' will all return a default state)
   * @default 'default'
   */
  status?: ComponentStatuses;
}

export default InputComponent;
