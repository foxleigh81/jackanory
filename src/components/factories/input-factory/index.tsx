import React, { forwardRef, useId } from 'react';

/* Import helpers */
import renderInput from './helpers/render-input';

/* Import Stylesheet */
import styles from './styles.module.scss';

/** Import custom types */
import { ComponentStatuses } from '@/libs/types/component-statuses';
import { InputTypes } from './types/input-types';
import InputOption from '@/libs/types/input-option';

/** Import components */
import { Label } from '../../data-input/label';
import { Icon } from '../../data-display/icon';

/** Types */

type HelperTextObject = {
  text: string;
  placement: 'top' | 'bottom';
};
export interface Props extends React.ComponentProps<'input'> {
  /**
   * The name of the input
   */
  name: string;
  /**
   * The type of input to render
   * @default text
   */
  variant?: InputTypes;
  /**
   * Test ID for the input (used by tests to target the input) default is the id.
   * @default id
   */
  testID?: string;
  /**
   * The content of the label to display above the input.
   **/
  label: string;
  /**
   * Should the label be hidden or visible?
   * @default false
   */
  hideLabel?: boolean;
  /**
   * The helper text to display next to the input
   * If not provided, the helper text will will not be displayed
   * If you want to change the placement of the helper text, you can provide a helperText object with the following properties:
   * text: The text to display
   * placement: The placement of the helper text (top or bottom)
   * */
  helperText?: HelperTextObject | string;
  /**
   * The status of the input (not providing a value or setting the value to '' or 'default' will all return a default status)
   **/
  status?: ComponentStatuses;
  /**
   * If the status requires a message, this is the message to display
   */
  statusMessage?: string;
  /**
   * The input options (for inputs that support it)
   * If no value is provided, the label will be the value
   * @default []
   */
  options?: unknown[];
  /**
   * Can the input accept multiple values?
   */
  multiple?: boolean;
  /**
   * min-width of the container
   * @default 'auto'
   */
  minWidth?: string;
  /**
   * max-width of the container
   * @default 'auto'
   * */
  maxWidth?: string;
  /**
   * If it's a textarea, this is the number of rows
   */
  rows?: number;
}

/**
 * The InputFactory is a generator for all of the various input components.
 */
export const InputFactory = forwardRef<HTMLInputElement, Props>(
  (
    {
      name = '',
      id,
      variant = 'text',
      testID,
      label,
      hideLabel,
      helperText,
      status,
      statusMessage,
      options = [],
      required,
      disabled,
      readOnly,
      className,
      width = '100%',
      minWidth = 'max-content',
      maxWidth = '100%',
      ...props
    },
    ref
  ) => {
    const reactId = useId();
    const generateID = id || testID || reactId;

    hideLabel =
      hideLabel ||
      variant === 'checkbox' ||
      variant === 'radio' ||
      variant === 'radiogroup' ||
      variant === 'checkboxgroup';

    let describedby = undefined;

    if (helperText) {
      describedby = `${generateID}-help`;
    }

    if (status === 'error') {
      describedby = `${generateID}-error`;
    }

    if (helperText && status === 'error') {
      describedby = `${generateID}-help ${generateID}-error`;
    }

    const inputProps = {
      name,
      id: generateID,
      status: status || 'default',
      width,
      'aria-invalid': status === 'error' ? true : undefined,
      'aria-describedby': describedby,
      'aria-required': required ? true : undefined,
      readOnly,
      disabled,
      required,
      ...props
    };

    let normalizedOptions = options;

    if (options[0] && typeof options[0] === 'object') {
      const opts = options as InputOption[];
      normalizedOptions = opts.map((option) => {
        if (option.value) {
          return option;
        }
        return {
          ...option,
          value: option.label
        };
      });
    }

    const helpText =
      typeof helperText === 'string' ? helperText : helperText?.text;

    const helpTextPosition =
      typeof helperText === 'string' ? 'top' : helperText?.placement;

    return (
      <div
        ref={ref}
        data-testid={`${generateID}-container`}
        className={[
          styles['input-container'],
          status ? styles[`status-${status}`] : '',
          required ? styles['required'] : '',
          disabled ? styles['disabled'] : '',
          className || ''
        ]
          .filter(Boolean)
          .join(' ')}
        style={{
          width,
          minWidth,
          maxWidth
        }}
      >
        {!hideLabel && (
          <Label
            text={label}
            required={required}
            id={generateID}
            simulated={variant === 'radiogroup' || variant === 'checkboxgroup'}
          />
        )}
        {helperText && helpTextPosition === 'top' && (
          <div id={`${generateID}-help`} className={styles['helper-text-top']}>
            {helpText}
          </div>
        )}
        <>{renderInput(name, variant, inputProps, label, normalizedOptions)}</>
        {helperText && helpTextPosition === 'bottom' && (
          <div
            id={`${generateID}-help`}
            className={styles['helper-text-bottom']}
          >
            {helpText}
          </div>
        )}
        {statusMessage && (
          <div id={`${generateID}-error`} className={styles['status-message']}>
            <Icon use="error" className={styles['icon']} />
            <span>{statusMessage}</span>
          </div>
        )}
      </div>
    );
  }
);

InputFactory.displayName = 'InputFactory';

export default InputFactory;
