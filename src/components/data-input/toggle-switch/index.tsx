import {
  useState,
  useRef,
  useId,
  useEffect,
  useCallback,
  FocusEvent,
  KeyboardEvent,
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
  ...props
}: Props) => {
  const [focused, setFocused] = useState(false);
  const [isChecked, setIsChecked] = useState(checked || false);

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setIsChecked(checked || false);
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

  const simulateClick = useCallback(() => {
    if (disabled || readOnly) return;
    inputRef?.current?.click();
  }, [disabled, readOnly]);

  const handleInputKeyDown = useCallback(
    (e: KeyboardEvent<HTMLDivElement>) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        simulateClick();
      }
    },
    [simulateClick]
  );

  const handleInputChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setIsChecked(e.target.checked);
      onChange?.(e);
    },
    [onChange]
  );

  const reactID = useId();
  const ID = id || reactID;

  return (
    <div
      data-testid={`${ID}-label`}
      tabIndex={0}
      onKeyDown={handleInputKeyDown}
      onClick={simulateClick}
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
          data-testid={`${ID}-input`}
          checked={isChecked}
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
          {stateText[isChecked ? 'on' : 'off'] || stateText.on}
        </span>
      </>
    </div>
  );
};

ToggleSwitch.displayName = 'ToggleSwitch';

export default ToggleSwitch;
