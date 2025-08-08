import {
  useState,
  useRef,
  useId,
  useEffect,
  useCallback,
  FocusEvent,
  ChangeEvent
} from 'react';

/* Import Stylesheet */
import styles from './styles.module.scss';

/** Import custom types */
import InputComponent from '@/libs/types/input-component';

export interface Props extends InputComponent {
  /**
   * The text for the 'on' and 'off' states (The 'on' value is also used for the value of the input when checked if no value is provided)
   * @default {
   * on: 'On',
   * off: 'Off'
   * }
   */
  stateText?: {
    on: string;
    off: string;
  };
  /**
   * The text for the 'inactive' state
   * @default 'Off'
   */
  inactiveText?: string;
  /**
   * The type of input
   * @default checkbox
   */
  type?: string;
  /**
   * Accessible label for the toggle switch
   */
  'aria-label'?: string;
  /**
   * ID of element that labels the toggle switch
   */
  'aria-labelledby'?: string;
}

/* Render component */
export const ToggleSwitch = ({
  name,
  id,
  stateText = {
    on: 'On',
    off: 'Off'
  },
  checked,
  disabled,
  readOnly,
  className,
  onFocus,
  onBlur,
  onChange,
  type = 'checkbox',
  'aria-label': ariaLabel,
  'aria-labelledby': ariaLabelledBy,
  ...props
}: Props) => {
  const [focused, setFocused] = useState(false);
  const [visualChecked, setVisualChecked] = useState(checked || false);

  const inputRef = useRef<HTMLInputElement>(null);

  // Update visual state when props change or input is interacted with
  useEffect(() => {
    if (checked !== undefined) {
      setVisualChecked(checked);
    }
  }, [checked]);

  const handleOnFocus = useCallback(
    (e: FocusEvent<HTMLInputElement>) => {
      setFocused(true);
      onFocus?.(e);
    },
    [onFocus]
  );

  const handleOnBlur = useCallback(
    (e: FocusEvent<HTMLInputElement>) => {
      setFocused(false);
      onBlur?.(e);
    },
    [onBlur]
  );

  const handleInputChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setVisualChecked(e.target.checked);
      onChange?.(e);
    },
    [onChange]
  );

  const reactID = useId();
  const ID = id || reactID;

  return (
    <div
      data-testid={`${ID}-label`}
      onClick={() => inputRef.current?.focus()}
      className={[
        styles['toggle-switch'],
        focused ? styles['focused'] : '',
        disabled ? styles['disabled'] : '',
        readOnly ? styles['readonly'] : '',
        className || ''
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <>
        <input
          className={styles['real-input']}
          ref={inputRef}
          {...props}
          name={name}
          id={ID}
          type={type}
          role="switch"
          aria-checked={visualChecked}
          aria-label={ariaLabel}
          aria-labelledby={ariaLabelledBy}
          data-testid={`${ID}-input`}
          defaultChecked={checked}
          disabled={disabled}
          readOnly={readOnly}
          onFocus={handleOnFocus}
          onBlur={handleOnBlur}
          onChange={handleInputChange}
        />
        <div className={styles['switch']}>
          <span className={styles['inner']} />
        </div>
        <span className={styles['text']}>
          {stateText[visualChecked ? 'on' : 'off']}
        </span>
      </>
    </div>
  );
};

ToggleSwitch.displayName = 'ToggleSwitch';

export default ToggleSwitch;
